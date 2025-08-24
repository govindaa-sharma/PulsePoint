import React, { useEffect, useState } from 'react';

const MRITumorAnalyzerRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const externalUrl = "http://10.135.147.229:5000/";

  // Automatic redirect after countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = externalUrl;
    }
  }, [countdown]);

  const handleRedirect = () => {
    window.location.href = externalUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">MRI Tumor Analyzer</h1>
          <p className="text-lg text-gray-600">Advanced AI-powered tumor detection and analysis</p>
        </div>
        
        <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Network Access Enabled</h2>
          <p className="text-gray-700 mb-2">Access from any device on your network:</p>
          <div className="bg-gray-800 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
            {externalUrl}
          </div>
          <p className="text-gray-700 mt-3">Share this URL with other devices on your network</p>
        </div>
        
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload MRI Scan</h3>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 cursor-pointer hover:bg-gray-50 transition-colors">
            <p className="text-gray-600">Drop your MRI scan here</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Redirecting in {countdown} seconds...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${(5 - countdown) * 20}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={handleRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Go to MRI Tumor Analyzer Now
          </button>
          
          <p className="text-gray-600 mt-4">
            If you are not redirected automatically,{' '}
            <a 
              href={externalUrl} 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MRITumorAnalyzerRedirect;