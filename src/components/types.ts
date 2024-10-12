'use client'

export interface MockFile {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Platform {
  id: string;
  name: 'Web' | 'Android' | 'iOS';
  mockFiles: MockFile[];
}

export interface Endpoint {
  id: string;
  name: string;
  description: string;
  isPlatformSpecific: boolean;
  platforms?: Platform[];
  commonMockFiles?: MockFile[];
  createdAt: string;
  updatedAt: string;
}