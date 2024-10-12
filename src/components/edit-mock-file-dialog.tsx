'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MockFile } from './types'

interface EditMockFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFile: MockFile | null;
  onEditMockFile: (editedFile: MockFile) => void;
}

export function EditMockFileDialog({ isOpen, onOpenChange, selectedFile, onEditMockFile }: EditMockFileDialogProps) {
  const [editedName, setEditedName] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (selectedFile) {
      setEditedName(selectedFile.name);
      setEditedContent(selectedFile.content);
    }
  }, [selectedFile]);

  const handleSaveChanges = () => {
    if (selectedFile) {
      onEditMockFile({
        ...selectedFile,
        name: editedName,
        content: editedContent,
        updatedAt: new Date().toISOString(),
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Mock File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-filename" className="text-right">
              File Name
            </label>
            <Input
              id="edit-filename"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-content" className="text-right">
              Content
            </label>
            <textarea
              id="edit-content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="col-span-3 h-32 p-2 border rounded"
            />
          </div>
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}