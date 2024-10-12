'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { MockFile } from './types'

interface MockFileItemProps {
  file: MockFile;
  onView: (file: MockFile) => void;
  onEdit: (file: MockFile) => void;
  onDelete: (fileId: string) => void;
}

export function MockFileItem({ file, onView, onEdit, onDelete }: MockFileItemProps) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm">
        {file.name}
        <span className="text-xs text-gray-500 ml-2">
          (Updated: {new Date(file.updatedAt).toLocaleDateString()})
        </span>
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onView(file)}>
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onEdit(file)}>
            <Edit className="mr-2 h-4 w-4" />
            
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onDelete(file.id)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}