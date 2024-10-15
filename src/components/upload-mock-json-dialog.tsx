'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UploadMockJsonDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (file: File) => void
}

export function UploadMockJsonDialog({ isOpen, onOpenChange, onUpload }: UploadMockJsonDialogProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
      setFile(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Mock JSON</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input type="file" onChange={handleFileChange} accept=".json" />
          <Button onClick={handleUpload} disabled={!file}>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}