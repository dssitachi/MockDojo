'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { Endpoint } from './types'

interface AddMockFileDialogProps {
  serviceEndpoints: Endpoint[];
  onAddMockFile: (endpointId: string, platformId: string | null, fileName: string, fileContent: string) => void;
}

export function AddMockFileDialog({ serviceEndpoints, onAddMockFile }: AddMockFileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');

  const handleAddMockFile = () => {
    if (selectedEndpoint && newFileName && newFileContent) {
      onAddMockFile(selectedEndpoint, selectedPlatform, newFileName, newFileContent);
      setIsOpen(false);
      setSelectedEndpoint(null);
      setSelectedPlatform(null);
      setNewFileName('');
      setNewFileContent('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Mock File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Mock File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="endpoint" className="text-right">
              Endpoint
            </label>
            <Select onValueChange={setSelectedEndpoint}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select endpoint" />
              </SelectTrigger>
              <SelectContent>
                {serviceEndpoints.map((endpoint) => (
                  <SelectItem key={endpoint.id} value={endpoint.id}>
                    {endpoint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedEndpoint && serviceEndpoints.find(e => e.id === selectedEndpoint)?.isPlatformSpecific && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="platform" className="text-right">
                Platform
              </label>
              <Select onValueChange={setSelectedPlatform}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {serviceEndpoints.find(e => e.id === selectedEndpoint)?.platforms?.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="filename" className="text-right">
              File Name
            </label>
            <Input
              id="filename"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="content" className="text-right">
              Content
            </label>
            <textarea
              id="content"
              value={newFileContent}
              onChange={(e) => setNewFileContent(e.target.value)}
              className="col-span-3 h-32 p-2 border rounded"
            />
          </div>
        </div>
        <Button onClick={handleAddMockFile}>Add Mock File</Button>
      </DialogContent>
    </Dialog>
  );
}