import React from 'react';
import { Brain } from 'lucide-react';

const ParkinsonsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-600" />
          Parkinson's Disease Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Motor Symptoms */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-3">Motor Symptoms</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tremor</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rigidity</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Minimal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bradykinesia</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Postural Instability</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
              </div>
            </div>
          </div>

          {/* Non-Motor Symptoms */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Non-Motor Symptoms</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sleep Disturbances</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cognitive Changes</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Depression/Anxiety</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Autonomic Issues</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
              </div>
            </div>
          </div>

          {/* Assessment Scores */}
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <h4 className="font-semibold text-indigo-800 mb-3">Assessment Scores</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>UPDRS III</span>
                  <span className="font-semibold">18/108</span>
                </div>
                <div className="bg-green-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '16.7%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Hoehn & Yahr</span>
                  <span className="font-semibold">Stage 1</span>
                </div>
                <div className="bg-green-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>PDQ-39</span>
                  <span className="font-semibold">25/156</span>
                </div>
                <div className="bg-green-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '16%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Current Treatment Plan</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Medications</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Carbidopa/Levodopa 25-100mg TID</li>
                <li>• Ropinirole 2mg BID</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Therapies</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Physical Therapy - Weekly</li>
                <li>• Speech Therapy - Bi-weekly</li>
                <li>• Exercise Program - Daily</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkinsonsTab;