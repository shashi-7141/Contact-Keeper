"use client";

import {
  Server,
  Database,
  HardDrive,
  Network,
  Container,
  Zap,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Resource } from "@/lib/resource-context";

const typeConfig = {
  compute: {
    icon: Server,
    label: "Compute",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  database: {
    icon: Database,
    label: "Database",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  storage: {
    icon: HardDrive,
    label: "Storage",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  network: {
    icon: Network,
    label: "Network",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  container: {
    icon: Container,
    label: "Container",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  serverless: {
    icon: Zap,
    label: "Serverless",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
};

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  },
  inactive: {
    label: "Inactive",
    variant: "secondary" as const,
    className: "bg-muted text-muted-foreground",
  },
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    className: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  },
  error: {
    label: "Error",
    variant: "destructive" as const,
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  },
};

const providerLabels = {
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
};

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

export function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  const type = typeConfig[resource.type];
  const status = statusConfig[resource.status];
  const TypeIcon = type.icon;

  return (
    <Card className="group border-border/50 bg-card transition-all hover:border-border hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`rounded-lg p-2.5 ${type.bgColor}`}>
              <TypeIcon className={`size-5 ${type.color}`} />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-card-foreground leading-tight">
                {resource.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {type.label}
                </Badge>
                <Badge className={`text-xs px-2 py-0.5 ${status.className}`}>
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onEdit(resource)}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 size-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(resource)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Provider</p>
            <p className="font-medium text-card-foreground">
              {providerLabels[resource.provider]}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Region</p>
            <p className="font-medium text-card-foreground">{resource.region}</p>
          </div>
          {resource.cpu && (
            <div>
              <p className="text-xs text-muted-foreground">CPU</p>
              <p className="font-medium text-card-foreground">
                {resource.cpu} vCPU
              </p>
            </div>
          )}
          {resource.memory && (
            <div>
              <p className="text-xs text-muted-foreground">Memory</p>
              <p className="font-medium text-card-foreground">
                {resource.memory} GB
              </p>
            </div>
          )}
          {resource.storage && (
            <div>
              <p className="text-xs text-muted-foreground">Storage</p>
              <p className="font-medium text-card-foreground">
                {resource.storage} GB
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">Monthly Cost</p>
            <p className="font-medium text-card-foreground">
              ${resource.cost.toLocaleString()}
            </p>
          </div>
        </div>

        {resource.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
