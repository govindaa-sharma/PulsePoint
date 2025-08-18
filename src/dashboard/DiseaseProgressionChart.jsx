import React, { useState } from 'react';
import { Card, Radio, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// Sample data for a weekly view (replace with actual data)
const progressionDataWeekly = [
  { week: 'Week 1', tremor: 30, voice: 80, tapping: 75 },
  { week: 'Week 2', tremor: 32, voice: 78, tapping: 73 },
  { week: 'Week 3', tremor: 31, voice: 79, tapping: 74 },
  { week: 'Week 4', tremor: 35, voice: 75, tapping: 70 },
  { week: 'Week 5', tremor: 36, voice: 74, tapping: 68 },
];

const DiseaseProgressionChart = () => {
  const [view, setView] = useState('weekly');
  
  // You would fetch different data based on the 'view' state
  const data = progressionDataWeekly; 

  return (
    <Card title="Disease Progression Trends">
      <Radio.Group onChange={(e) => setView(e.target.value)} value={view} style={{ marginBottom: '10px' }}>
        <Radio.Button value="daily">Daily</Radio.Button>
        <Radio.Button value="weekly">Weekly</Radio.Button>
        <Radio.Button value="monthly">Monthly</Radio.Button>
      </Radio.Group>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tremor" stroke="#8884d8" name="Tremor Severity" />
          <Line type="monotone" dataKey="voice" stroke="#82ca9d" name="Voice Clarity" />
          <Line type="monotone" dataKey="tapping" stroke="#ffc658" name="Tapping Speed" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DiseaseProgressionChart;