"use client";

import * as React from "react";

export type ResourceType =
  | "compute"
  | "storage"
  | "database"
  | "network"
  | "container"
  | "serverless";
export type ResourceStatus = "active" | "inactive" | "pending" | "error";
export type ResourceProvider = "aws" | "azure" | "gcp";

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  provider: ResourceProvider;
  region: string;
  cpu?: number;
  memory?: number;
  storage?: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface ResourceContextType {
  resources: Resource[];
  addResource: (
    resource: Omit<Resource, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  getResourceById: (id: string) => Resource | undefined;
}

const ResourceContext = React.createContext<ResourceContextType | null>(null);

const initialResources: Resource[] = [
  {
    id: "1",
    name: "Production Web Server",
    type: "compute",
    status: "active",
    provider: "aws",
    region: "us-east-1",
    cpu: 4,
    memory: 16,
    storage: 100,
    cost: 150.0,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-28"),
    tags: ["production", "web", "critical"],
  },
  {
    id: "2",
    name: "User Data Store",
    type: "database",
    status: "active",
    provider: "aws",
    region: "us-east-1",
    storage: 500,
    cost: 280.0,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-26"),
    tags: ["production", "database", "critical"],
  },
  {
    id: "3",
    name: "Staging Environment",
    type: "container",
    status: "active",
    provider: "gcp",
    region: "us-central1",
    cpu: 2,
    memory: 8,
    cost: 75.0,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-25"),
    tags: ["staging", "kubernetes"],
  },
  {
    id: "4",
    name: "Backup Storage",
    type: "storage",
    status: "active",
    provider: "azure",
    region: "eastus",
    storage: 2000,
    cost: 45.0,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-20"),
    tags: ["backup", "archive"],
  },
  {
    id: "5",
    name: "API Gateway",
    type: "serverless",
    status: "active",
    provider: "aws",
    region: "us-east-1",
    cost: 35.0,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-27"),
    tags: ["production", "api"],
  },
  {
    id: "6",
    name: "CDN Network",
    type: "network",
    status: "active",
    provider: "aws",
    region: "global",
    cost: 120.0,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-22"),
    tags: ["production", "cdn", "global"],
  },
  {
    id: "7",
    name: "Dev Database",
    type: "database",
    status: "inactive",
    provider: "gcp",
    region: "us-west1",
    storage: 50,
    cost: 0.0,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-15"),
    tags: ["development", "database"],
  },
  {
    id: "8",
    name: "ML Training Cluster",
    type: "compute",
    status: "pending",
    provider: "aws",
    region: "us-west-2",
    cpu: 64,
    memory: 256,
    storage: 1000,
    cost: 0.0,
    createdAt: new Date("2025-01-27"),
    updatedAt: new Date("2025-01-28"),
    tags: ["ml", "training", "gpu"],
  },
  {
    id: "9",
    name: "Legacy App Server",
    type: "compute",
    status: "error",
    provider: "azure",
    region: "westus",
    cpu: 2,
    memory: 4,
    storage: 50,
    cost: 45.0,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2025-01-28"),
    tags: ["legacy", "maintenance"],
  },
];

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = React.useState<Resource[]>(initialResources);

  const addResource = React.useCallback(
    (resource: Omit<Resource, "id" | "createdAt" | "updatedAt">) => {
      const newResource: Resource = {
        ...resource,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setResources((prev) => [...prev, newResource]);
    },
    []
  );

  const updateResource = React.useCallback(
    (id: string, updates: Partial<Resource>) => {
      setResources((prev) =>
        prev.map((resource) =>
          resource.id === id
            ? { ...resource, ...updates, updatedAt: new Date() }
            : resource
        )
      );
    },
    []
  );

  const deleteResource = React.useCallback((id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id));
  }, []);

  const getResourceById = React.useCallback(
    (id: string) => resources.find((resource) => resource.id === id),
    [resources]
  );

  const value = React.useMemo(
    () => ({
      resources,
      addResource,
      updateResource,
      deleteResource,
      getResourceById,
    }),
    [resources, addResource, updateResource, deleteResource, getResourceById]
  );

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const context = React.useContext(ResourceContext);
  if (!context) {
    throw new Error("useResources must be used within a ResourceProvider");
  }
  return context;
}
