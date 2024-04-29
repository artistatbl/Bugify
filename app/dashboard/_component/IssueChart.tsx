'use client';

import { Card } from '@radix-ui/themes';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import React from 'react';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card className=" p-2 shadow-md rounded-lg bg-white border border-gray-200">
      <h2 className="text-2xl text-gray-900 mb-4 dark:text-white">Recent Overview</h2>
	 <p className="text-sm text-gray-500 mb-4">Get a quick overview of your issues</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            barSize={30}
            fill="var(--accent-9)" // Ensure you have this color defined in your Tailwind config
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;