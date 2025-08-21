import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const VitalsTab = () => {
  const vitalSignsData = {
    bloodPressure: [
      { date: '2024-01-15', systolic: 125, diastolic: 82 },
      { date: '2024-02-01', systolic: 130, diastolic: 85 },
      { date: '2024-02-15', systolic: 128, diastolic: 80 },
      { date: '2024-03-01', systolic: 135, diastolic: 88 },
      { date: '2024-03-15', systolic: 132, diastolic: 84 }
    ],
    heartRate: [
      { date: '2024-01-15', rate: 72 },
      { date: '2024-02-01', rate: 75 },
      { date: '2024-02-15', rate: 70 },
      { date: '2024-03-01', rate: 78 },
      { date: '2024-03-15', rate: 74 }
    ],
    glucose: [
      { date: '2024-01-15', level: 110 },
      { date: '2024-02-01', level: 125 },
      { date: '2024-02-15', level: 108 },
      { date: '2024-03-01', level: 132 },
      { date: '2024-03-15', level: 118 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Pressure Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={vitalSignsData.bloodPressure}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Heart Rate Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Heart Rate Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={vitalSignsData.heartRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#bfdbfe" name="Heart Rate (bpm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Glucose Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Glucose Levels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vitalSignsData.glucose}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip />
              <Bar dataKey="level" fill="#f97316" name="Glucose (mg/dL)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Vitals Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Readings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Blood Pressure</span>
              <span className="text-green-600 font-semibold">132/84 mmHg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Heart Rate</span>
              <span className="text-blue-600 font-semibold">74 bpm</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Blood Glucose</span>
              <span className="text-orange-600 font-semibold">118 mg/dL</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">BMI</span>
              <span className="text-purple-600 font-semibold">24.7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsTab;