'use client'

import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Service } from './types'
import { PlatformAccordion } from './platform-accordion'
import { ApiAccordion } from './api-accordion'

interface ServiceAccordionProps {
  service: Service
}

export function ServiceAccordion({ service }: ServiceAccordionProps) {
  return (
    <AccordionItem value={`service-${service.id}`}>
      <AccordionTrigger>{service.name}</AccordionTrigger>
      <AccordionContent>
        {service.isPlatformSpecific ? (
          service.platforms?.map((platform) => (
            <PlatformAccordion
              key={platform.name}
              serviceId={service.id}
              platform={platform}
            />
          ))
        ) : (
          service.commonApis?.map((api) => (
            <ApiAccordion
              key={api.id}
              serviceId={service.id}
              api={api}
            />
          ))
        )}
      </AccordionContent>
    </AccordionItem>
  )
}