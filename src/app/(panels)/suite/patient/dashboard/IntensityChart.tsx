"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = {
    months: [ "Jan", "Feb", "Mar", "Apr" ],
    data: [ 2, 2, 5, 6, 9, 9],
}

const chartConfig = {
    desktop: {
        label: "paint index",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function IntenseChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Intensity of Symtoms</CardTitle>
                <CardDescription> Last 4 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData.months.map((month, index) => ({
                            month,
                            desktop: chartData.data[index],
                        }))}
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
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
