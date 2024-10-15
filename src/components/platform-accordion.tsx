'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Platform } from './types'
import { ApiAccordion } from './api-accordion'

interface PlatformAccordionProps {
  serviceId: string
  platform: Platform
}

export function PlatformAccordion({ serviceId, platform }: PlatformAccordionProps) {
  return (
    <AccordionItem value={`platform-${platform.name}`}>
      <AccordionTrigger>{platform.name}</AccordionTrigger>
      <AccordionContent>
        <Accordion type="multiple" className="w-full">
          {platform.apis.map((api) => (
            <ApiAccordion
              key={api.id}
              serviceId={serviceId}
              platformId={platform.name}
              api={api}
            />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}