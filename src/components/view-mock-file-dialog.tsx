'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MockFile } from './types'

interface ViewMockFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFile: MockFile | null;
}

export function ViewMockFileDialog({ isOpen, onOpenChange, selectedFile }: ViewMockFileDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Mock File</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{selectedFile?.name}</h3>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-96">
            {selectedFile?.content}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}