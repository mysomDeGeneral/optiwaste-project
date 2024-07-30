// DrawPieChart.js
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export default function DrawPieChart({ data }) {
  const pieData = data.reduce((acc, curr) => {
    const type = curr.wasteType;
    if (type) {
      acc[type] = acc[type] ? acc[type] + 1 : 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(pieData).map((key) => ({
    name: key,
    value: pieData[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={chartData} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
