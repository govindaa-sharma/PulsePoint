import React from 'react';
import { Camera } from 'lucide-react';

const ImagingTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Camera className="mr-2 h-5 w-5 text-cyan-600" />
          AI Medical Imaging Analysis
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Recent Scans</h4>
            
            <div className="bg-gray-50 rounded-xl p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Brain MRI</span>
                <span className="text-xs text-gray-500">March 10, 2024</span>
              </div>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                <span className="text-gray-500 text-sm">MRI Image Preview</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Analysis Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Complete</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">DaTscan</span>
                <span className="text-xs text-gray-500">February 28, 2024</span>
              </div>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                <span className="text-gray-500 text-sm">DaTscan Image Preview</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Analysis Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Complete</span>
              </div>
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">AI Analysis Results</h4>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">Brain MRI Analysis</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Brain Atrophy</span>
                  <span className="text-green-600 font-medium">Normal</span>
                </div>
                <div className="flex justify-between">
                  <span>White Matter Changes</span>
                  <span className="text-yellow-600 font-medium">Mild</span>
                </div>
                <div className="flex justify-between">
                  <span>Structural Abnormalities</span>
                  <span className="text-green-600 font-medium">None</span>
                </div>
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-xs text-blue-800">
                    <strong>AI Confidence:</strong> 94% - Age-appropriate changes with minimal white matter hyperintensities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-2">DaTscan Analysis</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dopamine Transporter Density</span>
                  <span className="text-yellow-600 font-medium">Reduced</span>
                </div>
                <div className="flex justify-between">
                  <span>Striatal Uptake Pattern</span>
                  <span className="text-orange-600 font-medium">Asymmetric</span>
                </div>
                <div className="flex justify-between">
                  <span>Putamen/Caudate Ratio</span>
                  <span className="text-yellow-600 font-medium">1.2</span>
                </div>
                <div className="mt-3 p-2 bg-purple-100 rounded">
                  <p className="text-xs text-purple-800">
                    <strong>AI Confidence:</strong> 91% - Pattern consistent with early-stage Parkinson's disease.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">Recommendations</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Continue current treatment protocol</li>
                <li>• Follow-up DaTscan in 12 months</li>
                <li>• Consider MRI in 18 months</li>
                <li>• Monitor symptom progression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagingTab;