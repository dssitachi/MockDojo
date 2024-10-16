'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

interface Service {
  serviceName: string
  isPlatformSpecific: boolean
}

interface Endpoint {
  id: string
  name: string
}

const fetchServices = async (): Promise<Service[]> => {
  const response = await axios.get('/api/services')
  return response.data
}

const fetchEndpoints = async (serviceName: string): Promise<Endpoint[]> => {
  const response = await axios.get(`/api/services/${serviceName}/endpoints`)
  return response.data
}

const uploadMockJson = async ({ serviceName, platform, endpoint, file }: { serviceName: string, platform?: string, endpoint: string, file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post(`/api/services/${serviceName}/platforms/${platform}/endpoints/${endpoint}/mockjson`, formData)
  return response.data
}

export function AddMockJsonButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const queryClient = useQueryClient()

  const { data: services = [] } = useQuery<Service[]>(['services'], fetchServices)

  const { data: endpoints = [] } = useQuery<Endpoint[]>(
    ['endpoints', selectedService?.serviceName],
    () => fetchEndpoints(selectedService?.serviceName || ''),
    { enabled: !!selectedService && !selectedService.isPlatformSpecific }
  )

  const uploadMutation = useMutation(uploadMockJson, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services'])
      setIsOpen(false)
      resetForm()
    },
  })

  const resetForm = () => {
    setSelectedService(null)
    setSelectedPlatform(null)
    setSelectedEndpoint(null)
    setFile(null)
  }

  const handleServiceSelect = (serviceName: string) => {
    const service = services.find(s => s.serviceName === serviceName)
    setSelectedService(service || null)
    setSelectedPlatform(null)
    setSelectedEndpoint(null)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedService && selectedEndpoint && file) {
      uploadMutation.mutate({
        serviceName: selectedService.serviceName,
        platform: selectedPlatform || undefined,
        endpoint: selectedEndpoint,
        file
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Mock JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Mock JSON</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
            <Select onValueChange={handleServiceSelect} value={selectedService?.serviceName}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.serviceName} value={service.serviceName}>
                    {service.serviceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedService?.isPlatformSpecific && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select onValueChange={setSelectedPlatform} value={selectedPlatform || undefined}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {selectedService && !selectedService.isPlatformSpecific && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endpoint" className="text-right">
                Endpoint
              </Label>
              <Select onValueChange={setSelectedEndpoint} value={selectedEndpoint || undefined}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an endpoint" />
                </SelectTrigger>
                <SelectContent>
                  {endpoints.map((endpoint) => (
                    <SelectItem key={endpoint.id} value={endpoint.id}>
                      {endpoint.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input id="file" type="file" onChange={handleFileChange} className="col-span-3" />
          </div>
        </div>
        <Button onClick={handleUpload} disabled={!selectedService || !selectedEndpoint || !file}>
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  )
}