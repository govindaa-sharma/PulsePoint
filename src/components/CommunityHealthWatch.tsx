import React, { useState } from 'react';
import { Shield, Bell, Plus, Activity, FileText, BarChart3, Settings } from 'lucide-react';

// Mock data
const mockReports = [
  {
    id: 1,
    type: 'disease_outbreak',
    title: 'Suspected Dengue Cases',
    description: 'Multiple fever cases reported in residential area',
    severity: 'high',
    status: 'verified',
    location: { lat: 22.5726, lng: 88.3639, address: 'Salt Lake, Kolkata' },
    reportedBy: 'Dr. Priya Sharma',
    timestamp: new Date(Date.now() - 3600000),
    casesCount: 8,
    mediaAttached: true,
    priority: 9
  },
  {
    id: 2,
    type: 'environmental_hazard',
    title: 'Stagnant Water Accumulation',
    description: 'Large pools of stagnant water after monsoon',
    severity: 'medium',
    status: 'pending',
    location: { lat: 22.5958, lng: 88.2636, address: 'Howrah, West Bengal' },
    reportedBy: 'Anonymous',
    timestamp: new Date(Date.now() - 7200000),
    casesCount: 0,
    mediaAttached: true,
    priority: 6
  }
];

const mockAlerts = [
  {
    id: 1,
    type: 'outbreak_detected',
    message: 'Dengue outbreak pattern detected in Salt Lake area',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1800000),
    area: 'Salt Lake, Kolkata'
  }
];

const CommunityHealthWatch = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState(mockReports);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [userRole] = useState('health_worker');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView reports={reports} alerts={alerts} />;
      case 'reports':
        return <ReportsView reports={reports} setReports={setReports} userRole={userRole} />;
      case 'analytics':
        return <AnalyticsView reports={reports} />;
      case 'settings':
        return <SettingsView userRole={userRole} />;
      default:
        return <DashboardView reports={reports} alerts={alerts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Community Health Watch</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationButton 
                alerts={alerts} 
                showPanel={showNotificationPanel}
                setShowPanel={setShowNotificationPanel}
              />
              
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Report</span>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-6 border-t border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal 
          reports={reports}
          setReports={setReports}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};

// Notification Button Component
const NotificationButton = ({ alerts, showPanel, setShowPanel }) => (
  <div className="relative">
    <button
      onClick={() => setShowPanel(!showPanel)}
      className="relative p-2 text-gray-600 hover:text-gray-900"
    >
      <Bell className="w-6 h-6" />
      {alerts.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {alerts.length}
        </span>
      )}
    </button>
    
    {showPanel && (
      <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Recent Alerts</h3>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-3 border-b border-gray-100 last:border-b-0 ${
              alert.severity === 'critical' ? 'bg-red-50 border-l-4 border-l-red-500' : 'bg-yellow-50 border-l-4 border-l-yellow-500'
            }`}>
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs text-gray-600 mt-1">
                {alert.area} • {alert.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Dashboard View Component
const DashboardView = ({ reports, alerts }) => (
  <div className="space-y-6">
    <StatsCards reports={reports} alerts={alerts} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MapView reports={reports} />
      </div>
      <div>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
    <RecentReports reports={reports.slice(0, 3)} />
  </div>
);

// Stats Cards Component
const StatsCards = ({ reports, alerts }) => {
  const stats = [
    { label: 'Active Reports', value: reports.filter(r => r.status !== 'resolved').length, icon: Activity, color: 'blue' },
    { label: 'Verified Cases', value: reports.filter(r => r.status === 'verified').length, icon: CheckCircle, color: 'green' },
    { label: 'Critical Alerts', value: alerts.filter(a => a.severity === 'critical').length, icon: AlertTriangle, color: 'red' },
    { label: 'Response Teams', value: 12, icon: Users, color: 'purple' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Map View Component
const MapView = ({ reports }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium mb-4">Real-time Health Map</h3>
    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-blue-300"></div>
      
      {reports.map((report, index) => (
        <div
          key={report.id}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${30 + index * 20}%`,
            top: `${40 + index * 15}%`
          }}
        >
          <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
            report.severity === 'high' ? 'bg-red-500' : 
            report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            <Activity className="w-4 h-4 text-white" />
          </div>
          {report.casesCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {report.casesCount}
            </div>
          )}
        </div>
      ))}
      
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        <div className="text-xs font-medium mb-1">Legend</div>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs">Low</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Alerts Panel Component
const AlertsPanel = ({ alerts }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium mb-3 flex items-center">
      <Bell className="w-4 h-4 mr-2" />
      Active Alerts ({alerts.length})
    </h3>
    
    <div className="space-y-2">
      {alerts.map(alert => (
        <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
          alert.severity === 'critical' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
        }`}>
          <p className="font-medium text-sm">{alert.message}</p>
          <p className="text-xs text-gray-600 mt-1">
            {alert.area} • {alert.timestamp.toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// Recent Reports Component
const RecentReports = ({ reports }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium mb-4">Recent Reports</h3>
    <div className="space-y-3">
      {reports.map(report => (
        <div key={report.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
          <div>
            <h4 className="font-medium text-sm">{report.title}</h4>
            <p className="text-xs text-gray-600">{report.location.address}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              report.severity === 'high' ? 'bg-red-100 text-red-800' :
              report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {report.severity}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              report.status === 'verified' ? 'bg-blue-100 text-blue-800' :
              report.status === 'pending' ? 'bg-gray-100 text-gray-800' :
              'bg-green-100 text-green-800'
            }`}>
              {report.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Reports View Component
const ReportsView = ({ reports, setReports, userRole }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    timeRange: '24h',
    severity: 'all'
  });

  const updateReportStatus = (reportId, newStatus) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: newStatus } : r
    ));
  };

  return (
    <div className="space-y-6">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <ReportsList 
        reports={reports} 
        filters={filters} 
        userRole={userRole}
        updateReportStatus={updateReportStatus}
      />
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({ filters, setFilters }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium mb-3">Filters</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <select
        value={filters.type}
        onChange={(e) => setFilters({...filters, type: e.target.value})}
        className="p-2 border border-gray-300 rounded text-sm"
      >
        <option value="all">All Types</option>
        <option value="disease_outbreak">Disease Outbreak</option>
        <option value="environmental_hazard">Environmental Hazard</option>
        <option value="resource_shortage">Resource Shortage</option>
      </select>
      
      <select
        value={filters.status}
        onChange={(e) => setFilters({...filters, status: e.target.value})}
        className="p-2 border border-gray-300 rounded text-sm"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="escalated">Escalated</option>
      </select>
      
      <select
        value={filters.timeRange}
        onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
        className="p-2 border border-gray-300 rounded text-sm"
      >
        <option value="1h">Last Hour</option>
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
      </select>
      
      <select
        value={filters.severity}
        onChange={(e) => setFilters({...filters, severity: e.target.value})}
        className="p-2 border border-gray-300 rounded text-sm"
      >
        <option value="all">All Severity</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  </div>
);

// Reports List Component
const ReportsList = ({ reports, filters, userRole, updateReportStatus }) => {
  const filteredReports = reports.filter(report => {
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    if (filters.status !== 'all' && report.status !== filters.status) return false;
    if (filters.severity !== 'all' && report.severity !== filters.severity) return false;
    return true;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium mb-4">Reports ({filteredReports.length})</h3>
      <div className="space-y-3">
        {filteredReports.map(report => (
          <ReportCard 
            key={report.id} 
            report={report} 
            userRole={userRole}
            updateReportStatus={updateReportStatus}
          />
        ))}
      </div>
    </div>
  );
};

// Report Card Component
const ReportCard = ({ report, userRole, updateReportStatus }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center space-x-2">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium">{report.title}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs ${
          report.severity === 'high' ? 'bg-red-100 text-red-800' :
          report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {report.severity}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          report.status === 'verified' ? 'bg-blue-100 text-blue-800' :
          report.status === 'pending' ? 'bg-gray-100 text-gray-800' :
          report.status === 'escalated' ? 'bg-red-100 text-red-800' :
          'bg-green-100 text-green-800'
        }`}>
          {report.status}
        </span>
      </div>
    </div>
    
    <p className="text-gray-600 text-sm mb-3">{report.description}</p>
    
    <div className="flex justify-between items-center">
      <div className="text-xs text-gray-500">
        <span>{report.location.address} • {report.timestamp.toLocaleTimeString()}</span>
      </div>
      
      {userRole !== 'citizen' && (
        <div className="flex space-x-1">
          {report.status === 'pending' && (
            <button
              onClick={() => updateReportStatus(report.id, 'verified')}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
            >
              Verify
            </button>
          )}
          {report.status === 'verified' && (
            <button
              onClick={() => updateReportStatus(report.id, 'escalated')}
              className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
            >
              Escalate
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

// Analytics View Component
const AnalyticsView = ({ reports }) => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-medium mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        Trend Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Reports by Type</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Disease Outbreaks</span>
              <span className="text-sm font-medium">{reports.filter(r => r.type === 'disease_outbreak').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Environmental Hazards</span>
              <span className="text-sm font-medium">{reports.filter(r => r.type === 'environmental_hazard').length}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Response Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Avg. Response Time</span>
              <span className="text-sm font-medium">4.7 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Resolution Rate</span>
              <span className="text-sm font-medium">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Settings View Component
const SettingsView = ({ userRole }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h3 className="font-medium mb-4">Settings</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">User Role</label>
        <p className="text-sm text-gray-600 capitalize">{userRole.replace('_', ' ')}</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Notification Preferences</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span className="text-sm">Email notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span className="text-sm">SMS alerts</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

// Report Modal Component
const ReportModal = ({ reports, setReports, onClose }) => {
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    severity: 'medium',
    location: '',
    anonymous: false
  });

  const reportTypes = [
    { id: 'disease_outbreak', label: 'Disease Outbreak' },
    { id: 'environmental_hazard', label: 'Environmental Hazard' },
    { id: 'resource_shortage', label: 'Resource Shortage' },
    { id: 'animal_carcass', label: 'Animal Carcass' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: reports.length + 1,
      type: reportForm.type,
      title: reportTypes.find(t => t.id === reportForm.type)?.label || 'Health Report',
      description: reportForm.description,
      severity: reportForm.severity,
      status: 'pending',
      location: { 
        lat: 22.5726, 
        lng: 88.3639, 
        address: reportForm.location || 'Kolkata, West Bengal' 
      },
      reportedBy: reportForm.anonymous ? 'Anonymous' : 'Current User',
      timestamp: new Date(),
      casesCount: 0,
      mediaAttached: false,
      priority: reportForm.severity === 'high' ? 8 : 5
    };
    
    setReports([newReport, ...reports]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Submit Health Report</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <div className="grid grid-cols-2 gap-2">
              {reportTypes.map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setReportForm({...reportForm, type: type.id})}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    reportForm.type === type.id ? 
                      'border-blue-500 bg-blue-50' : 
                      'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Describe the health concern..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select
                value={reportForm.severity}
                onChange={(e) => setReportForm({...reportForm, severity: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={reportForm.location}
                onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Auto-detected location"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={reportForm.anonymous}
              onChange={(e) => setReportForm({...reportForm, anonymous: e.target.checked})}
            />
            <label htmlFor="anonymous" className="text-sm">Submit anonymously</label>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={!reportForm.type || !reportForm.description}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Import missing icons
import { CheckCircle, AlertTriangle, Users, Send, X } from 'lucide-react';

export default CommunityHealthWatch;