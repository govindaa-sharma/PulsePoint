import React from 'react';
import { Layout, Space } from 'antd';
import DashboardHeader from './DashboardHeader.jsx';
import TestComplianceChart from './TestComplianceChart.jsx';
import DiseaseProgressionChart from './DiseaseProgressionChart.jsx';

const { Content } = Layout;

const DashboardPage = () => {
  // Sample data to pass to components
  const patientData = { name: 'John Doe', age: 65, condition: 'Parkinson\'s Disease' };
  const healthStatus = { status: 'Stable' };
  const nextTest = { name: 'Tapping Test', time: '6:00 PM' };
  const alerts = { count: 2 };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <DashboardHeader
          patientInfo={patientData}
          healthStatus={healthStatus}
          nextTest={nextTest}
          alerts={alerts}
        />
        <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '24px' }}>
          <TestComplianceChart />
          <DiseaseProgressionChart />
          {/* Add Imaging Insights Component Here later */}
        </Space>
      </Content>
    </Layout>
  );
};

export default DashboardPage;