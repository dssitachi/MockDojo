'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash } from "lucide-react"
import { MockJson } from './types'

interface MockJsonItemProps {
  mockJson: MockJson
  onView: () => void
  onDelete: () => void
}

export function MockJsonItem({ mockJson, onView, onDelete }: MockJsonItemProps) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm">
        {mockJson.variantName}
        <span className="text-xs text-gray-500 ml-2">
          (Updated: {new Date(mockJson.updatedAt).toLocaleDateString()})
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
          <DropdownMenuItem onSelect={onView}>
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}