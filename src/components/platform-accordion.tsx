'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Platform, MockFile } from './types'
import { MockFileItem } from './mock-file-item';

interface PlatformAccordionProps {
  platforms: Platform[];
  onViewFile: (file: MockFile) => void;
  onEditFile: (file: MockFile) => void;
  onDeleteFile: (fileId: string) => void;
}

export function PlatformAccordion({ platforms, onViewFile, onEditFile, onDeleteFile }: PlatformAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {platforms.map((platform) => (
        <AccordionItem value={`platform-${platform.id}`} key={platform.id}>
          <AccordionTrigger>{platform.name}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {platform.mockFiles.map((file) => (
                <MockFileItem
                  key={file.id}
                  file={file}
                  onView={onViewFile}
                  onEdit={onEditFile}
                  onDelete={onDeleteFile}
                />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}