'use client'

import { Endpoint } from './types';

export const initialServiceEndpoints: Endpoint[] = [
  {
    id: "ep1",
    name: "Get User Profile",
    description: "Retrieves user profile information",
    isPlatformSpecific: true,
    platforms: [
      {
        id: "p1",
        name: "Web",
        mockFiles: [
          { id: "mf1", name: "web_user_profile_1.json", content: '{"name": "John Doe", "email": "john@example.com"}', createdAt: "2023-05-01T10:00:00Z", updatedAt: "2023-05-01T10:00:00Z" },
          { id: "mf2", name: "web_user_profile_2.json", content: '{"name": "Jane Doe", "email": "jane@example.com"}', createdAt: "2023-05-02T11:00:00Z", updatedAt: "2023-05-02T11:00:00Z" }
        ]
      },
      {
        id: "p2",
        name: "Android",
        mockFiles: [
          { id: "mf3", name: "android_user_profile.json", content: '{"name": "Bob Smith", "email": "bob@example.com"}', createdAt: "2023-05-03T12:00:00Z", updatedAt: "2023-05-03T12:00:00Z" }
        ]
      },
      {
        id: "p3",
        name: "iOS",
        mockFiles: [
          { id: "mf4", name: "ios_user_profile.json", content: '{"name": "Alice Johnson", "email": "alice@example.com"}', createdAt: "2023-05-04T13:00:00Z", updatedAt: "2023-05-04T13:00:00Z" }
        ]
      }
    ],
    createdAt: "2023-05-01T09:00:00Z",
    updatedAt: "2023-05-04T13:00:00Z"
  },
  {
    id: "ep2",
    name: "List Products",
    description: "Retrieves a list of available products",
    isPlatformSpecific: false,
    commonMockFiles: [
      { id: "mf5", name: "products_list_1.json", content: '[{"id": 1, "name": "Product A"}, {"id": 2, "name": "Product B"}]', createdAt: "2023-05-05T14:00:00Z", updatedAt: "2023-05-05T14:00:00Z" },
      { id: "mf6", name: "products_list_2.json", content: '[{"id": 3, "name": "Product C"}, {"id": 4, "name": "Product D"}]', createdAt: "2023-05-06T15:00:00Z", updatedAt: "2023-05-06T15:00:00Z" }
    ],
    createdAt: "2023-05-05T14:00:00Z",
    updatedAt: "2023-05-06T15:00:00Z"
  },
];