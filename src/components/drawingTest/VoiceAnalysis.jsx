// import { useState, useRef } from 'react';
// import { FaMicrophone, FaStopCircle } from 'react-icons/fa';

// const VoiceAnalysis = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [score, setScore] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const mediaRecorderRef = useRef(null);
//   const audioContextRef = useRef(null);

//   // Audio analysis functions
//   const calculateRMS = (audioData) => {
//     let sum = 0;
//     for (let i = 0; i < audioData.length; i++) {
//       sum += audioData[i] * audioData[i];
//     }
//     const rms = Math.sqrt(sum / audioData.length);
//     return rms;
//   };

//   const calculateZCR = (audioData) => {
//     let zeroCrossings = 0;
//     for (let i = 1; i < audioData.length; i++) {
//       if ((audioData[i-1] >= 0 && audioData[i] < 0) || 
//           (audioData[i-1] < 0 && audioData[i] >= 0)) {
//         zeroCrossings++;
//       }
//     }
//     return zeroCrossings / audioData.length;
//   };

//   const analyzeAudio = async (blob) => {
//     try {
//       // Create audio context
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//       audioContextRef.current = audioContext;
      
//       // Convert blob to array buffer
//       const arrayBuffer = await blob.arrayBuffer();
      
//       // Decode audio data
//       const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
//       // Get audio data (mono)
//       const audioData = audioBuffer.getChannelData(0);
      
//       // Split into chunks for analysis
//       const sampleRate = audioBuffer.sampleRate;
//       const chunkSize = Math.floor(sampleRate * 0.1); // 100ms chunks
//       const chunks = [];
      
//       for (let i = 0; i < audioData.length; i += chunkSize) {
//         chunks.push(audioData.slice(i, i + chunkSize));
//       }
      
//       // Analyze each chunk
//       const rmsValues = chunks.map(chunk => calculateRMS(chunk));
//       const zcrValues = chunks.map(chunk => calculateZCR(chunk));
      
//       // Calculate stability (lower variation = more stable)
//       const rmsStability = 100 - (calculateStandardDeviation(rmsValues) * 100);
//       const zcrStability = 100 - (calculateStandardDeviation(zcrValues) * 500);
      
//       // Combine scores
//       const finalScore = Math.max(0, Math.min(100, (rmsStability + zcrStability) / 2));
      
//       return finalScore;
//     } catch (error) {
//       console.error('Audio analysis error:', error);
//       throw new Error('Failed to analyze audio');
//     }
//   };

//   const calculateStandardDeviation = (values) => {
//     const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
//     const squareDiffs = values.map(value => Math.pow(value - mean, 2));
//     const variance = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
//     return Math.sqrt(variance);
//   };

//   const startRecording = async () => {
//     try {
//       setMessage('Requesting microphone access...');
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         audio: {
//           channelCount: 1,
//           sampleRate: 44100,
//           sampleSize: 16,
//           echoCancellation: true,
//           noiseSuppression: true
//         } 
//       });
      
//       const options = { mimeType: 'audio/webm; codecs=opus' };
//       mediaRecorderRef.current = new MediaRecorder(stream, options);
//       const chunks = [];
      
//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunks.push(e.data);
//         }
//       };
      
//       mediaRecorderRef.current.onstop = async () => {
//         const blob = new Blob(chunks, { type: 'audio/webm' });
//         setAudioBlob(blob);
//         stream.getTracks().forEach(track => track.stop());
//         setMessage('Recording complete. Ready to analyze.');
//       };
      
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       setMessage('Recording... Speak now.');
//       setScore(null);
      
//     } catch (err) {
//       setMessage(`Error: ${err.message}`);
//       console.error('Recording error:', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       setMessage('Please record audio first.');
//       return;
//     }
    
//     // Check file size
//     if (audioBlob.size > 10 * 1024 * 1024) {
//       setMessage('Recording is too large. Please record a shorter clip (max 10MB).');
//       return;
//     }
    
//     setIsLoading(true);
//     setMessage('Analyzing audio...');
//     setScore(null);

//     try {
//       const vocalHealthScore = await analyzeAudio(audioBlob);
//       setScore(vocalHealthScore);
//       setMessage('Analysis completed successfully!');
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setMessage(`Analysis failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Voice Analysis</h1>
//       <p className="text-gray-600 mb-8 text-center">
//         Record a short voice clip (5-10 seconds) to analyze vocal health stability.
//       </p>
      
//       <div className="flex flex-col space-y-4 mb-6">
//         <div className="flex justify-center space-x-4">
//           <button 
//             onClick={startRecording} 
//             disabled={isRecording || isLoading}
//             className="flex items-center space-x-2 py-3 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <FaMicrophone /> <span>{isRecording ? 'Recording...' : 'Start'}</span>
//           </button>
//           <button 
//             onClick={stopRecording} 
//             disabled={!isRecording}
//             className="flex items-center space-x-2 py-3 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <FaStopCircle /> <span>Stop</span>
//           </button>
//         </div>
        
//         <button 
//           onClick={handleSubmit} 
//           disabled={isLoading || !audioBlob}
//           className="w-full py-4 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Analyzing...' : 'Analyze Voice'}
//         </button>
//       </div>
      
//       {message && (
//         <div className={`mt-4 p-4 rounded-xl text-center ${
//           message.includes('Error') || message.includes('failed') 
//             ? 'bg-red-100 text-red-800' 
//             : 'bg-blue-100 text-blue-800'
//         }`}>
//           {message}
//         </div>
//       )}
      
//       {score !== null && (
//         <div className="mt-6 p-6 rounded-xl text-center bg-gray-50 border border-gray-200">
//           <p className="text-2xl font-bold text-gray-800">Vocal Health Score</p>
//           <div className="text-5xl font-extrabold text-blue-600 my-4">{Math.round(score)}/100</div>
//           <p className="text-gray-600">
//             {score >= 80 ? 'Excellent vocal stability!' : 
//              score >= 60 ? 'Good vocal health.' : 
//              'Consider practicing vocal exercises.'}
//           </p>
//         </div>
//       )}
      
//       {audioBlob && !isLoading && (
//         <div className="mt-4 text-sm text-gray-500 text-center">
//           Audio recorded: {(audioBlob.size / 1024).toFixed(1)} KB
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceAnalysis;



import { useState, useRef } from 'react';
import { FaMicrophone, FaStopCircle } from 'react-icons/fa';

const VoiceAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const mediaRecorderRef = useRef(null);

  // Audio analysis functions that replicate the Flask Librosa logic
  const calculateRMS = (audioData) => {
    // Calculate Root Mean Square (energy/volume)
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += audioData[i] * audioData[i];
    }
    return Math.sqrt(sum / audioData.length);
  };

  const calculateZCR = (audioData) => {
    // Calculate Zero Crossing Rate (noisiness)
    let zeroCrossings = 0;
    for (let i = 1; i < audioData.length; i++) {
      if ((audioData[i-1] >= 0 && audioData[i] < 0) || 
          (audioData[i-1] < 0 && audioData[i] >= 0)) {
        zeroCrossings++;
      }
    }
    return zeroCrossings / audioData.length;
  };

  const calculateStandardDeviation = (values) => {
    // Calculate standard deviation
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - mean, 2));
    const variance = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    return Math.sqrt(variance);
  };

  const analyzeAudio = async (blob) => {
    try {
      // Create audio context (like Librosa loading)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Convert blob to array buffer (like reading file in Flask)
      const arrayBuffer = await blob.arrayBuffer();
      
      // Decode audio data (like librosa.load)
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Get audio data as mono (channel 0)
      const audioData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      
      // Split into frames for analysis (like Librosa feature extraction)
      const frameSize = Math.floor(sampleRate * 0.02); // 20ms frames
      const hopLength = Math.floor(frameSize / 2); // 50% overlap
      
      const rmsValues = [];
      const zcrValues = [];
      
      // Process audio in frames (similar to Librosa's frame processing)
      for (let i = 0; i < audioData.length - frameSize; i += hopLength) {
        const frame = audioData.slice(i, i + frameSize);
        
        // Calculate features for this frame
        rmsValues.push(calculateRMS(frame));
        zcrValues.push(calculateZCR(frame));
      }
      
      // Calculate stability scores (replicating Flask logic)
      const rmsStabilityVariation = calculateStandardDeviation(rmsValues);
      const rmsScore = Math.max(0, 100 - rmsStabilityVariation * 500);
      
      const zcrStabilityVariation = calculateStandardDeviation(zcrValues);
      const zcrScore = Math.max(0, 100 - zcrStabilityVariation * 1000);
      
      // Combine scores (same as Flask)
      const vocalHealthScore = (rmsScore + zcrScore) / 2;
      
      return Math.max(0, Math.min(100, vocalHealthScore));
      
    } catch (error) {
      console.error('Audio analysis error:', error);
      throw new Error('Failed to analyze audio: ' + error.message);
    }
  };

  const startRecording = async () => {
    try {
      setMessage('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1, // Mono like Librosa
          sampleRate: 44100, // Standard sample rate
          sampleSize: 16,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      const options = { mimeType: 'audio/webm; codecs=opus' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
        setMessage('Recording complete. Ready to analyze.');
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMessage('Recording... Speak for 5-10 seconds.');
      setScore(null);
      
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      setMessage('Please record audio first.');
      return;
    }
    
    // Check file size (like Flask validation)
    if (audioBlob.size > 10 * 1024 * 1024) {
      setMessage('Recording is too large. Please record a shorter clip (max 10MB).');
      return;
    }
    
    setIsLoading(true);
    setMessage('Analyzing audio...');
    setScore(null);

    try {
      // Use our frontend analysis instead of calling Flask
      const vocalHealthScore = await analyzeAudio(audioBlob);
      setScore(vocalHealthScore);
      setMessage('Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      setMessage(`Analysis failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Voice Analysis</h1>
      <p className="text-gray-600 mb-8 text-center">
        Record a short voice clip (5-10 seconds) to analyze vocal health stability.
      </p>
      
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-center space-x-4">
          <button 
            onClick={startRecording} 
            disabled={isRecording || isLoading}
            className="flex items-center space-x-2 py-3 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaMicrophone /> <span>{isRecording ? 'Recording...' : 'Start'}</span>
          </button>
          <button 
            onClick={stopRecording} 
            disabled={!isRecording}
            className="flex items-center space-x-2 py-3 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaStopCircle /> <span>Stop</span>
          </button>
        </div>
        
        <button 
          onClick={handleSubmit} 
          disabled={isLoading || !audioBlob}
          className="w-full py-4 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Voice'}
        </button>
      </div>
      
      {message && (
        <div className={`mt-4 p-4 rounded-xl text-center ${
          message.includes('Error') || message.includes('failed') 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}
      
      {score !== null && (
        <div className="mt-6 p-6 rounded-xl text-center bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-gray-800">Vocal Health Score</p>
          <div className="text-5xl font-extrabold text-blue-600 my-4">{Math.round(score)}/100</div>
          <p className="text-gray-600">
            {score >= 80 ? 'Excellent vocal stability!' : 
             score >= 60 ? 'Good vocal health.' : 
             'Consider practicing vocal exercises.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on volume stability (RMS) and frequency stability (ZCR)
          </p>
        </div>
      )}
      
      {audioBlob && !isLoading && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Audio recorded: {(audioBlob.size / 1024).toFixed(1)} KB
        </div>
      )}
    </div>
  );
};

export default VoiceAnalysis;