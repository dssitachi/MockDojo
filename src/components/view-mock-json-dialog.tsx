'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MockJson } from './types'

interface ViewMockJsonDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mockJson: MockJson | null
}

export function ViewMockJsonDialog({ isOpen, onOpenChange, mockJson }: ViewMockJsonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Mock JSON</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{mockJson?.variantName}</h3>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-96">
            {mockJson?.content}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}