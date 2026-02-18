"use client";

import {
  Server,
  Activity,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useResources } from "@/lib/resource-context";

export function StatsCards() {
  const { resources } = useResources();

  const totalResources = resources.length;
  const activeResources = resources.filter((r) => r.status === "active").length;
  const errorResources = resources.filter((r) => r.status === "error").length;
  const totalCost = resources.reduce((sum, r) => sum + r.cost, 0);

  const stats = [
    {
      title: "Total Resources",
      value: totalResources,
      icon: Server,
      trend: "+2 this week",
      trendUp: true,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active",
      value: activeResources,
      icon: Activity,
      trend: `${Math.round((activeResources / totalResources) * 100)}% healthy`,
      trendUp: true,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Errors",
      value: errorResources,
      icon: AlertTriangle,
      trend: errorResources > 0 ? "Needs attention" : "All clear",
      trendUp: errorResources === 0,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Monthly Cost",
      value: `$${totalCost.toLocaleString()}`,
      icon: DollarSign,
      trend: "-5% from last month",
      trendUp: true,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-border/50 bg-card hover:border-border transition-colors"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold tracking-tight text-card-foreground">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              {stat.trendUp ? (
                <TrendingUp className="size-3 text-success" />
              ) : (
                <TrendingDown className="size-3 text-destructive" />
              )}
              <span className="text-muted-foreground">{stat.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
