// DrawLineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default function DrawLineChart({ data }) {
  const groupedData = data.reduce((acc, curr) => {
    const date = moment(curr.createdAt).format('YYYY-MM-DD');
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((key) => ({
    name: key,
    count: groupedData[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
