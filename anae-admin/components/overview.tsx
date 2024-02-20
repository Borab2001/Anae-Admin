"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
    data: any[];
}

export const Overview: React.FC<OverviewProps> = ({
    data
}) => {
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} >
            <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
        </BarChart>
    </ResponsiveContainer>
}