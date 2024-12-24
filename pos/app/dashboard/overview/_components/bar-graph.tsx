'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart for restaurant performance metrics';

const chartData = [
  { date: '2024-04-01', sales: 1200, orders: 50 },
  { date: '2024-04-02', sales: 1500, orders: 60 },
  { date: '2024-04-03', sales: 1800, orders: 75 },
  { date: '2024-04-04', sales: 2100, orders: 80 },
  { date: '2024-04-05', sales: 2500, orders: 90 },
  // Add more data for the relevant dates
];

const chartConfig = {
  sales: {
    label: 'Daily Sales',
    color: 'hsl(var(--chart-1))'
  },
  orders: {
    label: 'Orders',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('sales');

  const total = React.useMemo(
    () => ({
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
      orders: chartData.reduce((acc, curr) => acc + curr.orders, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Restaurant Performance</CardTitle>
          <CardDescription>
            Showing total metrics for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['sales', 'orders'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span>{chartConfig[chart].label}</span>
                <span>{total[chart]}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}
          className="aspect-auto h-[280px] w-full">
          <BarChart data={chartData} width={600} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              barSize={20}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
                <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`}             />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
