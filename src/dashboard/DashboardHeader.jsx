import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { CheckCircleOutlined, AlertOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardHeader = ({ patientInfo, healthStatus, nextTest, alerts }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable':
        return '#52c41a'; // Green
      case 'Improving':
        return '#1890ff'; // Blue
      case 'Needs Attention':
        return '#faad14'; // Yellow
      default:
        return '#000000'; // Black
    }
  };

  return (
    <div className="dashboard-header">
      <Title level={4}>Hello, {patientInfo.name}</Title>
      <Text>Your current status is based on your recent activity.</Text>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: '24px', color: getStatusColor(healthStatus.status) }} />
              <div style={{ marginLeft: '10px' }}>
                <Text type="secondary">Health Status</Text>
                <Title level={5} style={{ color: getStatusColor(healthStatus.status) }}>{healthStatus.status}</Title>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <div style={{ marginLeft: '10px' }}>
                <Text type="secondary">Next Test Due</Text>
                <Title level={5}>{nextTest.name} at {nextTest.time}</Title>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AlertOutlined style={{ fontSize: '24px', color: '#faad14' }} />
              <div style={{ marginLeft: '10px' }}>
                <Text type="secondary">Alerts</Text>
                <Title level={5}>{alerts.count} New Alerts</Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHeader;