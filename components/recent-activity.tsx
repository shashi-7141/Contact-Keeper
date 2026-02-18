"use client";

import {
  Server,
  Database,
  HardDrive,
  Network,
  Container,
  Zap,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const typeIcons = {
  compute: Server,
  database: Database,
  storage: HardDrive,
  network: Network,
  container: Container,
  serverless: Zap,
};

const actionIcons = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
};

const activities = [
  {
    id: "1",
    action: "created" as const,
    resourceName: "ML Training Cluster",
    resourceType: "compute" as const,
    user: "John D.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    action: "updated" as const,
    resourceName: "Production Web Server",
    resourceType: "compute" as const,
    user: "Sarah M.",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    action: "updated" as const,
    resourceName: "User Data Store",
    resourceType: "database" as const,
    user: "Mike R.",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    action: "created" as const,
    resourceName: "Backup Storage",
    resourceType: "storage" as const,
    user: "John D.",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    action: "deleted" as const,
    resourceName: "Test Environment",
    resourceType: "container" as const,
    user: "Sarah M.",
    timestamp: "3 days ago",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">
          Recent Activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest changes to your resources
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {activities.map((activity) => {
            const TypeIcon = typeIcons[activity.resourceType];
            const ActionIcon = actionIcons[activity.action];

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="relative">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <TypeIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-card border border-border">
                    <ActionIcon className="size-2.5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-card-foreground">
                      {activity.resourceName}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    by {activity.user} • {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
