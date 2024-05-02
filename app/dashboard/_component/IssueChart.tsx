'use client';

import { Card } from '@/components/components/ui/card';
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
  overdue: number;
  completed: number;
  cancelled: number;
  reopened: number;
  notStarted: number;
}

const IssueChart = ({ open, inProgress, closed, overdue, completed, cancelled, reopened, notStarted }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
    { label: 'Overdue', value: overdue },
    { label: 'Completed', value: completed },
    { label: 'Cancelled', value: cancelled },
    { label: 'Reopened', value: reopened },
    { label: 'Not Started', value: notStarted },
  ];

  return (
    <Card className="hover:ring-[0.5px] pl-5 p-2 ring-foreground duration-500  transition-all border-b-8 border-gray-900 dark:border-white rounded-lg">
      <h2 className="text-2xl text-gray-900 mb-4 dark:text-white">Recent Overview</h2>
      <p className="text-sm text-gray-500 mb-4">Get a quick overview of your issues</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} style={{ color: 'var(--accent-9)' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            barSize={20}
            fill="var(--accent-9)" // Ensure you have this color defined in your Tailwind config
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;