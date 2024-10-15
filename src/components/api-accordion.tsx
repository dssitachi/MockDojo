'use client'

import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Api, MockJson } from './types'
import { MockJsonItem } from './mock-json-item'
import { ViewMockJsonDialog } from './view-mock-json-dialog'
import { UploadMockJsonDialog } from './upload-mock-json-dialog'
import axios from 'axios'

interface ApiAccordionProps {
  serviceId: string
  platformId?: string
  api: Api
}

const uploadMockFile = async ({ serviceId, platformId, apiId, file }: { serviceId: string, platformId?: string, apiId: string, file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post(`/api/services/${serviceId}/platforms/${platformId}/apis/${apiId}/mockjson`, formData)
  return response.data
}

const deleteMockJson = async ({ serviceId, platformId, apiId, mockJsonId }: { serviceId: string, platformId?: string, apiId: string, mockJsonId: string }) => {
  await axios.delete(`/api/services/${serviceId}/platforms/${platformId}/apis/${apiId}/mockjson/${mockJsonId}`)
}

export function ApiAccordion({ serviceId, platformId, api }: ApiAccordionProps) {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedMockJson, setSelectedMockJson] = useState<MockJson | null>(null)

  const queryClient = useQueryClient()

  const uploadMutation = useMutation(uploadMockFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services'])
      setIsUploadDialogOpen(false)
    },
  })

  const deleteMutation = useMutation(deleteMockJson, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services'])
    },
  })

  const handleViewMockJson = (mockJson: MockJson) => {
    setSelectedMockJson(mockJson)
    setIsViewDialogOpen(true)
  }

  const handleUploadMockJson = () => {
    setIsUploadDialogOpen(true)
  }

  const handleDeleteMockJson = (mockJsonId: string) => {
    deleteMutation.mutate({ serviceId, platformId, apiId: api.id, mockJsonId })
  }

  return (
    <AccordionItem value={`api-${api.id}`}>
      <AccordionTrigger>{api.name}</AccordionTrigger>
      <AccordionContent>
        <Button onClick={handleUploadMockJson} className="mb-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Upload Mock File
        </Button>
        <ul className="space-y-2">
          {api.mockJsons.map((mockJson) => (
            <MockJsonItem
              key={mockJson.id}
              mockJson={mockJson}
              onView={() => handleViewMockJson(mockJson)}
              onDelete={() => handleDeleteMockJson(mockJson.id)}
            />
          ))}
        </ul>

        <ViewMockJsonDialog
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          mockJson={selectedMockJson}
        />

        <UploadMockJsonDialog
          isOpen={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          onUpload={(file) => uploadMutation.mutate({ serviceId, platformId, apiId: api.id, file })}
        />
      </AccordionContent>
    </AccordionItem>
  )
}