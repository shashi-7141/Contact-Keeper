"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResources } from "@/lib/resource-context";

const providerConfig = {
  aws: {
    name: "Amazon Web Services",
    short: "AWS",
    color: "bg-chart-1",
    textColor: "text-chart-1",
  },
  gcp: {
    name: "Google Cloud Platform",
    short: "GCP",
    color: "bg-chart-2",
    textColor: "text-chart-2",
  },
  azure: {
    name: "Microsoft Azure",
    short: "Azure",
    color: "bg-chart-3",
    textColor: "text-chart-3",
  },
};

export function ProviderBreakdown() {
  const { resources } = useResources();

  const providerStats = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.provider]) {
        acc[resource.provider] = { count: 0, cost: 0 };
      }
      acc[resource.provider].count += 1;
      acc[resource.provider].cost += resource.cost;
      return acc;
    },
    {} as Record<string, { count: number; cost: number }>
  );

  const totalResources = resources.length;

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">
          Cloud Providers
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Resource distribution by provider
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {Object.entries(providerStats).map(([provider, stats]) => {
          const config = providerConfig[provider as keyof typeof providerConfig];
          const percentage = Math.round((stats.count / totalResources) * 100);

          return (
            <div key={provider} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${config.color}`} />
                  <span className="text-sm font-medium text-card-foreground">
                    {config.short}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {stats.count} resources
                  </span>
                  <span className="font-medium text-card-foreground">
                    ${stats.cost.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${config.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
