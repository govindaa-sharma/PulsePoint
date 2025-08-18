import React from 'react';
import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// Sample data (replace with actual data from your backend)
const complianceData = [
  { name: 'Mon', drawing: 1, voice: 1, tapping: 1 },
  { name: 'Tue', drawing: 1, voice: 1, tapping: 0 },
  { name: 'Wed', drawing: 1, voice: 1, tapping: 1 },
  { name: 'Thu', drawing: 0, voice: 1, tapping: 1 },
  { name: 'Fri', drawing: 1, voice: 1, tapping: 1 },
  { name: 'Sat', drawing: 1, voice: 0, tapping: 1 },
  { name: 'Sun', drawing: 1, voice: 1, tapping: 1 },
];

const TestComplianceChart = () => (
  <Card title="Daily Test Compliance">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={complianceData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="drawing" fill="#8884d8" name="Drawing Test" />
        <Bar dataKey="voice" fill="#82ca9d" name="Voice Test" />
        <Bar dataKey="tapping" fill="#ffc658" name="Tapping Test" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default TestComplianceChart;