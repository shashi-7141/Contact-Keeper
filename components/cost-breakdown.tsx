"use client";

import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useResources } from "@/lib/resource-context";

const chartConfig = {
  cost: {
    label: "Cost",
  },
  compute: {
    label: "Compute",
    color: "var(--chart-1)",
  },
  database: {
    label: "Database",
    color: "var(--chart-2)",
  },
  storage: {
    label: "Storage",
    color: "var(--chart-3)",
  },
  network: {
    label: "Network",
    color: "var(--chart-4)",
  },
  container: {
    label: "Container",
    color: "var(--chart-5)",
  },
  serverless: {
    label: "Serverless",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function CostBreakdown() {
  const { resources } = useResources();

  const costByType = resources.reduce(
    (acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + resource.cost;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(costByType)
    .map(([type, cost]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      cost,
      fill: `var(--color-${type})`,
    }))
    .sort((a, b) => b.cost - a.cost);

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">
          Cost by Resource Type
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly cost distribution
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 20, bottom: 20, left: 70 }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              type="category"
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={65}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              content={<ChartTooltipContent />}
              formatter={(value) => [`$${value}`, "Cost"]}
            />
            <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`var(--chart-${(index % 5) + 1})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
