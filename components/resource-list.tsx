"use client";

import * as React from "react";
import { Search, Filter, Plus, LayoutGrid, List, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResourceCard } from "./resource-card";
import { useResources, type Resource, type ResourceStatus, type ResourceType } from "@/lib/resource-context";

interface ResourceListProps {
  initialTypeFilter?: ResourceType;
  onAddResource: () => void;
  onEditResource: (resource: Resource) => void;
  onDeleteResource: (resource: Resource) => void;
}

export function ResourceList({
  initialTypeFilter,
  onAddResource,
  onEditResource,
  onDeleteResource,
}: ResourceListProps) {
  const { resources } = useResources();
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<ResourceType | "all">(
    initialTypeFilter || "all"
  );
  const [statusFilters, setStatusFilters] = React.useState<ResourceStatus[]>([]);
  const [providerFilters, setProviderFilters] = React.useState<string[]>([]);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const filteredResources = React.useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(search.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );
      const matchesType = typeFilter === "all" || resource.type === typeFilter;
      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(resource.status);
      const matchesProvider =
        providerFilters.length === 0 ||
        providerFilters.includes(resource.provider);

      return matchesSearch && matchesType && matchesStatus && matchesProvider;
    });
  }, [resources, search, typeFilter, statusFilters, providerFilters]);

  const activeFilterCount =
    (typeFilter !== "all" ? 1 : 0) +
    statusFilters.length +
    providerFilters.length;

  const clearFilters = () => {
    setTypeFilter("all");
    setStatusFilters([]);
    setProviderFilters([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as ResourceType | "all")}
          >
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="compute">Compute</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="container">Container</SelectItem>
              <SelectItem value="serverless">Serverless</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative bg-background">
                <Filter className="size-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              {(["active", "inactive", "pending", "error"] as ResourceStatus[]).map(
                (status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilters.includes(status)}
                    onCheckedChange={(checked) =>
                      setStatusFilters(
                        checked
                          ? [...statusFilters, status]
                          : statusFilters.filter((s) => s !== status)
                      )
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuCheckboxItem>
                )
              )}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Provider</DropdownMenuLabel>
              {["aws", "gcp", "azure"].map((provider) => (
                <DropdownMenuCheckboxItem
                  key={provider}
                  checked={providerFilters.includes(provider)}
                  onCheckedChange={(checked) =>
                    setProviderFilters(
                      checked
                        ? [...providerFilters, provider]
                        : providerFilters.filter((p) => p !== provider)
                    )
                  }
                >
                  {provider.toUpperCase()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border bg-background p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="size-7"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="size-7"
              onClick={() => setViewMode("list")}
            >
              <List className="size-4" />
            </Button>
          </div>

          <Button onClick={onAddResource} className="gap-2">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add Resource</span>
          </Button>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {typeFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {typeFilter}
              <X
                className="size-3 cursor-pointer"
                onClick={() => setTypeFilter("all")}
              />
            </Badge>
          )}
          {statusFilters.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status}
              <X
                className="size-3 cursor-pointer"
                onClick={() =>
                  setStatusFilters(statusFilters.filter((s) => s !== status))
                }
              />
            </Badge>
          ))}
          {providerFilters.map((provider) => (
            <Badge key={provider} variant="secondary" className="gap-1">
              {provider.toUpperCase()}
              <X
                className="size-3 cursor-pointer"
                onClick={() =>
                  setProviderFilters(providerFilters.filter((p) => p !== provider))
                }
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        Showing {filteredResources.length} of {resources.length} resources
      </div>

      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
          <p className="text-muted-foreground">No resources found</p>
          <p className="text-sm text-muted-foreground/70">
            Try adjusting your search or filters
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={onEditResource}
              onDelete={onDeleteResource}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={onEditResource}
              onDelete={onDeleteResource}
            />
          ))}
        </div>
      )}
    </div>
  );
}
