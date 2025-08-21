import React from 'react';
import { Pill } from 'lucide-react';

const MedicationsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Pill className="mr-2 h-5 w-5 text-green-600" />
          Current Medications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-green-800">Carbidopa/Levodopa</h4>
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 25-100mg</p>
              <p><strong>Frequency:</strong> Three times daily</p>
              <p><strong>Purpose:</strong> Parkinson's symptoms</p>
              <p><strong>Started:</strong> Jan 15, 2024</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-blue-800">Ropinirole</h4>
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 2mg</p>
              <p><strong>Frequency:</strong> Twice daily</p>
              <p><strong>Purpose:</strong> Dopamine agonist</p>
              <p><strong>Started:</strong> Feb 1, 2024</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-800">Metformin</h4>
              <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 1000mg</p>
              <p><strong>Frequency:</strong> Twice daily</p>
              <p><strong>Purpose:</strong> Type 2 Diabetes</p>
              <p><strong>Started:</strong> Nov 10, 2023</p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-orange-800">Lisinopril</h4>
              <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 10mg</p>
              <p><strong>Frequency:</strong> Once daily</p>
              <p><strong>Purpose:</strong> Hypertension</p>
              <p><strong>Started:</strong> Oct 5, 2023</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-red-800">Atorvastatin</h4>
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 20mg</p>
              <p><strong>Frequency:</strong> Once daily</p>
              <p><strong>Purpose:</strong> Cholesterol</p>
              <p><strong>Started:</strong> Sep 20, 2023</p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-yellow-800">Vitamin D3</h4>
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Dosage:</strong> 2000 IU</p>
              <p><strong>Frequency:</strong> Once daily</p>
              <p><strong>Purpose:</strong> Supplement</p>
              <p><strong>Started:</strong> Aug 15, 2023</p>
            </div>
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Daily Medication Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3">
              <h5 className="font-medium text-gray-700 mb-2">Morning (8:00 AM)</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Carbidopa/Levodopa 25-100mg</li>
                <li>• Ropinirole 2mg</li>
                <li>• Metformin 1000mg</li>
                <li>• Lisinopril 10mg</li>
                <li>• Vitamin D3 2000 IU</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h5 className="font-medium text-gray-700 mb-2">Afternoon (2:00 PM)</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Carbidopa/Levodopa 25-100mg</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h5 className="font-medium text-gray-700 mb-2">Evening (8:00 PM)</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Carbidopa/Levodopa 25-100mg</li>
                <li>• Ropinirole 2mg</li>
                <li>• Metformin 1000mg</li>
                <li>• Atorvastatin 20mg</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationsTab;