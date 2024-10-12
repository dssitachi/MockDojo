'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Endpoint, MockFile } from './types'
import { PlatformAccordion } from './platform-accordion';
import { MockFileItem } from './mock-file-item';

interface EndpointAccordionProps {
  endpoint: Endpoint;
  onViewFile: (file: MockFile) => void;
  onEditFile: (file: MockFile) => void;
  onDeleteFile: (fileId: string) => void;
}

export function EndpointAccordion({ endpoint, onViewFile, onEditFile, onDeleteFile }: EndpointAccordionProps) {
  return (
    <AccordionItem value={`endpoint-${endpoint.id}`}>
      <AccordionTrigger>{endpoint.name}</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-gray-500 mb-2">{endpoint.description}</p>
        {endpoint.isPlatformSpecific ? (
          <PlatformAccordion
            platforms={endpoint.platforms || []}
            onViewFile={onViewFile}
            onEditFile={onEditFile}
            onDeleteFile={onDeleteFile}
          />
        ) : (
          <ul className="space-y-2">
            {endpoint.commonMockFiles?.map((file) => (
              <MockFileItem
                key={file.id}
                file={file}
                onView={onViewFile}
                onEdit={onEditFile}
                onDelete={onDeleteFile}
              />
            ))}
          </ul>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}