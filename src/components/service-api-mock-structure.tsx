'use client'

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Service } from './types'
import { ServiceAccordion } from './service-accordion'
import axios from 'axios'

const fetchServices = async (): Promise<Service[]> => {
  const response = await axios.get('/api/services')
  return response.data
}

export function ServiceApiMockStructureComponent() {
  const queryClient = useQueryClient()

  const { data: services = [], isLoading, error } = useQuery<Service[]>(['services'], fetchServices)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {(error as Error).message}</div>

  return (
    <div className="w-full p-4">
      <Button className="mb-4">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Service
      </Button>

      <Accordion type="multiple" className="w-full">
        {services.map((service) => (
          <ServiceAccordion
            key={service.id}
            service={service}
          />
        ))}
      </Accordion>
    </div>
  )
}