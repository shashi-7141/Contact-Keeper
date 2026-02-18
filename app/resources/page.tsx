"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ResourceProvider, type Resource, type ResourceType } from "@/lib/resource-context";
import { ResourceList } from "@/components/resource-list";
import { ResourceForm } from "@/components/resource-form";
import { DeleteDialog } from "@/components/delete-dialog";
import { Separator } from "@/components/ui/separator";

function ResourcesContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type") as ResourceType | null;

  const [formOpen, setFormOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editingResource, setEditingResource] = React.useState<Resource | null>(null);
  const [deletingResource, setDeletingResource] = React.useState<Resource | null>(null);

  const handleAddResource = () => {
    setEditingResource(null);
    setFormOpen(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setFormOpen(true);
  };

  const handleDeleteResource = (resource: Resource) => {
    setDeletingResource(resource);
    setDeleteOpen(true);
  };

  const getTitle = () => {
    if (typeFilter) {
      return `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} Resources`;
    }
    return "All Resources";
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">{getTitle()}</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your cloud infrastructure
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          <ResourceList
            initialTypeFilter={typeFilter || undefined}
            onAddResource={handleAddResource}
            onEditResource={handleEditResource}
            onDeleteResource={handleDeleteResource}
          />
        </div>
      </main>

      <ResourceForm
        open={formOpen}
        onOpenChange={setFormOpen}
        resource={editingResource}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        resource={deletingResource}
      />
    </>
  );
}

export default function ResourcesPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ResourceProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <React.Suspense fallback={<div className="p-6">Loading...</div>}>
              <ResourcesContent />
            </React.Suspense>
          </SidebarInset>
        </SidebarProvider>
      </ResourceProvider>
    </ThemeProvider>
  );
}
