'use client'

export interface MockJson {
  id: string;
  variantName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Api {
  id: string;
  name: string;
  mockJsons: MockJson[];
}

export interface Platform {
  name: 'Web' | 'Android' | 'iOS';
  apis: Api[];
}

export interface Service {
  id: string;
  name: string;
  isPlatformSpecific: boolean;
  platforms?: Platform[];
  commonApis?: Api[];
}