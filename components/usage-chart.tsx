"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { date: "Jan 1", requests: 1200, bandwidth: 450 },
  { date: "Jan 5", requests: 1800, bandwidth: 620 },
  { date: "Jan 10", requests: 2200, bandwidth: 780 },
  { date: "Jan 15", requests: 1900, bandwidth: 710 },
  { date: "Jan 20", requests: 2400, bandwidth: 890 },
  { date: "Jan 25", requests: 2100, bandwidth: 820 },
  { date: "Jan 28", requests: 2600, bandwidth: 950 },
];

const chartConfig = {
  requests: {
    label: "Requests (K)",
    color: "var(--chart-1)",
  },
  bandwidth: {
    label: "Bandwidth (GB)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function UsageChart() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">
          Resource Usage
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Requests and bandwidth over the last 30 days
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <defs>
              <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillBandwidth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)" }}
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#fillRequests)"
            />
            <Area
              type="monotone"
              dataKey="bandwidth"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fill="url(#fillBandwidth)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
