'use client'

import  { useState } from 'react'
import { Accordion } from "@/components/ui/accordion"
import { Endpoint, MockFile } from './types'
import { AddMockFileDialog } from './add-mock-file-dialog';
import { ViewMockFileDialog } from './view-mock-file-dialog';
import { EditMockFileDialog } from './edit-mock-file-dialog';
import { EndpointAccordion } from './endpoint-accordion';
import { initialServiceEndpoints } from './initial-data';

export function FullWidthStructuredServiceAccordionComponent() {
  const [serviceEndpoints, setServiceEndpoints] = useState<Endpoint[]>(initialServiceEndpoints);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MockFile | null>(null);

  const handleAddMockFile = (endpointId: string, platformId: string | null, fileName: string, fileContent: string) => {
    const newMockFile: MockFile = {
      id: `mf${Date.now()}`,
      name: fileName,
      content: fileContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setServiceEndpoints(prevEndpoints => {
      return prevEndpoints.map(endpoint => {
        if (endpoint.id === endpointId) {
          if (endpoint.isPlatformSpecific && platformId) {
            return {
              ...endpoint,
              platforms: endpoint.platforms!.map(platform => 
                platform.id === platformId
                  ? { ...platform, mockFiles: [...platform.mockFiles, newMockFile] }
                  : platform
              ),
              updatedAt: new Date().toISOString(),
            };
          } else {
            return {
              ...endpoint,
              commonMockFiles: [...(endpoint.commonMockFiles || []), newMockFile],
              updatedAt: new Date().toISOString(),
            };
          }
        }
        return endpoint;
      });
    });
  };

  const handleEditMockFile = (editedFile: MockFile) => {
    setServiceEndpoints(prevEndpoints => {
      return prevEndpoints.map(endpoint => {
        if (endpoint.isPlatformSpecific) {
          return {
            ...endpoint,
            platforms: endpoint.platforms!.map(platform => ({
              ...platform,
              mockFiles: platform.mockFiles.map(file => 
                file.id === editedFile.id ? editedFile : file
              )
            }))
          };
        } else {
          return {
            ...endpoint,
            commonMockFiles: endpoint.commonMockFiles!.map(file => 
              file.id === editedFile.id ? editedFile : file
            )
          };
        }
      });
    });
  };

  const handleDeleteMockFile = (fileId: string) => {
    setServiceEndpoints(prevEndpoints => {
      return prevEndpoints.map(endpoint => {
        if (endpoint.isPlatformSpecific) {
          return {
            ...endpoint,
            platforms: endpoint.platforms!.map(platform => ({
              ...platform,
              mockFiles: platform.mockFiles.filter(file => file.id !== fileId)
            }))
          };
        } else {
          return {
            ...endpoint,
            commonMockFiles: endpoint.commonMockFiles!.filter(file => file.id !== fileId)
          };
        }
      });
    });
  };

  return (
    <div className="w-full p-4">
      <AddMockFileDialog
        serviceEndpoints={serviceEndpoints}
        onAddMockFile={handleAddMockFile}
      />

      <ViewMockFileDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedFile={selectedFile}
      />

      <EditMockFileDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedFile={selectedFile}
        onEditMockFile={handleEditMockFile}
      />

      <Accordion type="multiple" className="w-full">
        {serviceEndpoints.map((endpoint) => (
          <EndpointAccordion
            key={endpoint.id}
            endpoint={endpoint}
            onViewFile={(file) => {
              setSelectedFile(file);
              setIsViewDialogOpen(true);
            }}
            onEditFile={(file) => {
              setSelectedFile(file);
              setIsEditDialogOpen(true);
            }}
            onDeleteFile={handleDeleteMockFile}
          />
        ))}
      </Accordion>
    </div>
  );
}