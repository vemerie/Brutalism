"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", acquisition: 186, cost: 80 },
  { month: "February", acquisition: 305, cost: 200 },
  { month: "March", acquisition: 237, cost: 120 },
  { month: "April", acquisition: 73, cost: 190 },
  { month: "May", acquisition: 209, cost: 130 },
  { month: "June", acquisition: 214, cost: 140 },
];

const chartConfig = {
  acquisition: {
    label: "Acquisition",
    color: "var(--chart-1)",
  },
  cost: {
    label: "Cost",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AcquisitionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acquisition and Cost</CardTitle>
    
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillacquisition" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-acquisition)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-acquisition)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillcost" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cost)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cost)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="cost"
              type="natural"
              fill="url(#fillcost)"
              fillOpacity={0.4}
              stroke="var(--color-cost)"
              stackId="a"
            />
            <Area
              dataKey="acquisition"
              type="natural"
              fill="url(#fillacquisition)"
              fillOpacity={0.4}
              stroke="var(--color-acquisition)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

    </Card>
  );
}
