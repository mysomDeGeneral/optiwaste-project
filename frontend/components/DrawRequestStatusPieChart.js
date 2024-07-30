// DrawRequestStatusPieChart.js
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export default function DrawRequestStatusPieChart({ data }) {
  const pieData = data.reduce((acc, curr) => {
    const status = curr.requestStatus;
    acc[status] = acc[status] ? acc[status] + 1 : 1;
    return acc;
  }, {});

  const chartData = Object.keys(pieData).map((key) => ({
    name: key,
    value: pieData[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={chartData} fill="#ff7300" label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
