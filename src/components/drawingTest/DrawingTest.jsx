// import { useWriteContract } from 'wagmi';
// import contractABI from '../../contract/HealthRecordsABI.json';
// const CONTRACT_ADDRESS = "0xcD6f2B30B8017fC364ED88B5319cAcb4BA30fdC6";
// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import VoiceAnalysis from './VoiceAnalysis'; // Import the separate component

// // The full address of your Python AI server
// const API_BASE_URL = 'http://127.0.0.1:5000';

// // Custom SVG Icon Component
// const ImagePlusIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
//     <line x1="16" x2="22" y1="5" y2="5" />
//     <line x1="19" x2="19" y1="2" y2="8" />
//     <circle cx="9" cy="9" r="2" />
//     <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//   </svg>
// );

// // The main App component
// function DrawingTest() {
//   const [activeFeature, setActiveFeature] = useState('drawing');
//   const { writeContractAsync } = useWriteContract();

//   const sendToBlockchain = async (cid, testType) => {
//     try {
//       const txHash = await writeContractAsync({
//         address: CONTRACT_ADDRESS,
//         abi: contractABI,
//         functionName: 'storeTestResult', // your solidity function
//         args: [cid, testType],
//       });
//       console.log("Tx hash:", txHash);
//       return txHash;
//     } catch (err) {
//       console.error("Blockchain tx failed:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-md rounded-lg m-4">
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-gray-800">PulsePoint Tests</h2>
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <button
//                 onClick={() => setActiveFeature('drawing')}
//                 className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
//                   activeFeature === 'drawing'
//                     ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Drawing Analysis
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveFeature('voice')}
//                 className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
//                   activeFeature === 'voice'
//                     ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Voice Analysis
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <div className="bg-white p-10 rounded-xl shadow-md h-full">
//           {activeFeature === 'drawing' ? <DrawingAnalysis /> : <VoiceAnalysis />}
//         </div>
//       </main>
//     </div>
//   );
// }

// // Drawing Analysis Component
// function DrawingAnalysis() {
//   const [userImage, setUserImage] = useState(null);
//   const [templateImage, setTemplateImage] = useState(null);
//   const [score, setScore] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const { getRootProps: getUserImageRootProps, getInputProps: getUserImageInputProps } = useDropzone({
//     accept: { 'image/jpeg': [], 'image/png': [] },
//     onDrop: (acceptedFiles) => setUserImage(acceptedFiles[0]),
//   });

//   const { getRootProps: getTemplateImageRootProps, getInputProps: getTemplateImageInputProps } = useDropzone({
//     accept: { 'image/jpeg': [], 'image/png': [] },
//     onDrop: (acceptedFiles) => setTemplateImage(acceptedFiles[0]),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userImage || !templateImage) {
//       setMessage('Please upload both a user drawing and a template image.');
//       return;
//     }
//     setIsLoading(true);
//     setMessage('');
//     setScore(null);

//     const formData = new FormData();
//     formData.append('user_image', userImage);
//     formData.append('template_image', templateImage);

//     try {
//       const response = await fetch(`${API_BASE_URL}/analyze_drawing`, {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setScore(result.stability_score);
//       } else {
//         setMessage(`Error: ${result.error || 'Something went wrong.'}`);
//       }
//     } catch (error) {
//       setMessage(`Network error: ${error.message}. Please make sure the backend server is running.`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Drawing Analysis</h1>
//       <p className="text-gray-600 mb-8">Upload your drawing and a template image to get a stability score.</p>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div {...getUserImageRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
//           <input {...getUserImageInputProps()} />
//           <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
//           <p className="text-gray-500">
//             {userImage ? `File selected: ${userImage.name}` : 'Drag & drop your drawing here, or click to select file'}
//           </p>
//         </div>
//         <div {...getTemplateImageRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
//           <input {...getTemplateImageInputProps()} />
//           <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
//           <p className="text-gray-500">
//             {templateImage ? `File selected: ${templateImage.name}` : 'Drag & drop the template image here, or click to select file'}
//           </p>
//         </div>
//         <button type="submit" disabled={isLoading} className="w-full py-4 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
//           {isLoading ? 'Analyzing...' : 'Analyze Drawing'}
//         </button>
//       </form>
//       {message && <div className="mt-6 p-4 rounded-xl text-center text-gray-800 bg-gray-50 shadow">{message}</div>}
//       {score !== null && (
//         <div className="mt-6 p-6 rounded-xl text-center bg-gray-50 shadow-lg">
//           <p className="text-2xl font-bold text-gray-800">Stability Score:</p>
//           <p className="text-5xl font-extrabold text-blue-600 mt-2">{score}%</p>
//           <p className="text-gray-600 mt-2">A higher score indicates a closer match to the template.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DrawingTest;



// import { useWriteContract } from 'wagmi';
// import contractABI from '../../contract/HealthRecordsABI.json';
// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import VoiceAnalysis from './VoiceAnalysis'; // your existing voice component

// // Contract setup
// const CONTRACT_ADDRESS = "0xcD6f2B30B8017fC364ED88B5319cAcb4BA30fdC6";
// const API_BASE_URL = 'http://127.0.0.1:5000';

// // Custom SVG Icon
// const ImagePlusIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
//     viewBox="0 0 24 24" fill="none" stroke="currentColor"
//     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
//     <line x1="16" x2="22" y1="5" y2="5" />
//     <line x1="19" x2="19" y1="2" y2="8" />
//     <circle cx="9" cy="9" r="2" />
//     <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//   </svg>
// );

// function DrawingTest() {
//   const [activeFeature, setActiveFeature] = useState('drawing');
//   const { writeContractAsync } = useWriteContract();

//   // Blockchain save helper
//   const sendToBlockchain = async (cid, testType) => {
//     try {
//       const txHash = await writeContractAsync({
//         address: CONTRACT_ADDRESS,
//         abi: contractABI,
//         functionName: 'storeTestResult', // must exist in your solidity contract
//         args: [cid, testType],
//       });
//       console.log("✅ Stored on blockchain, tx hash:", txHash);
//       return txHash;
//     } catch (err) {
//       console.error("❌ Blockchain tx failed:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-md rounded-lg m-4">
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-gray-800">PulsePoint Tests</h2>
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <button
//                 onClick={() => setActiveFeature('drawing')}
//                 className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
//                   activeFeature === 'drawing'
//                     ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Drawing Analysis
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveFeature('voice')}
//                 className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
//                   activeFeature === 'voice'
//                     ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Voice Analysis
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <div className="bg-white p-10 rounded-xl shadow-md h-full">
//           {activeFeature === 'drawing'
//             ? <DrawingAnalysis sendToBlockchain={sendToBlockchain} />
//             : <VoiceAnalysis />}
//         </div>
//       </main>
//     </div>
//   );
// }

// // Drawing Analysis Component
// function DrawingAnalysis({ sendToBlockchain }) {
//   const [userImage, setUserImage] = useState(null);
//   const [templateImage, setTemplateImage] = useState(null);
//   const [score, setScore] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [cid, setCid] = useState(null);

//   // Dropzones
//   const { getRootProps: getUserImageRootProps, getInputProps: getUserImageInputProps } = useDropzone({
//     accept: { 'image/jpeg': [], 'image/png': [] },
//     onDrop: (acceptedFiles) => setUserImage(acceptedFiles[0]),
//   });

//   const { getRootProps: getTemplateImageRootProps, getInputProps: getTemplateImageInputProps } = useDropzone({
//     accept: { 'image/jpeg': [], 'image/png': [] },
//     onDrop: (acceptedFiles) => setTemplateImage(acceptedFiles[0]),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userImage || !templateImage) {
//       setMessage('⚠️ Please upload both a user drawing and a template image.');
//       return;
//     }
//     setIsLoading(true);
//     setMessage('');
//     setScore(null);

//     const formData = new FormData();
//     formData.append('user_image', userImage);
//     formData.append('template_image', templateImage);

//     try {
//       const response = await fetch(`${API_BASE_URL}/analyze_drawing`, {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setScore(result.stability_score);
//         setCid(result.cid || null); // expect backend to return CID
//         // Save to blockchain if CID exists
//         if (result.cid) {
//           await sendToBlockchain(result.cid, "drawing");
//         }
//       } else {
//         setMessage(`❌ Error: ${result.error || 'Something went wrong.'}`);
//       }
//     } catch (error) {
//       setMessage(`🌐 Network error: ${error.message}. Is backend running?`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Drawing Analysis</h1>
//       <p className="text-gray-600 mb-8">
//         Upload your drawing and a template image to get a stability score.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div {...getUserImageRootProps()}
//           className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
//           <input {...getUserImageInputProps()} />
//           <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
//           <p className="text-gray-500">
//             {userImage ? `File selected: ${userImage.name}` : 'Drag & drop your drawing here, or click to select file'}
//           </p>
//         </div>

//         <div {...getTemplateImageRootProps()}
//           className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
//           <input {...getTemplateImageInputProps()} />
//           <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
//           <p className="text-gray-500">
//             {templateImage ? `File selected: ${templateImage.name}` : 'Drag & drop the template image here, or click to select file'}
//           </p>
//         </div>

//         <button type="submit" disabled={isLoading}
//           className="w-full py-4 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
//           {isLoading ? 'Analyzing...' : 'Analyze Drawing'}
//         </button>
//       </form>

//       {message && <div className="mt-6 p-4 rounded-xl text-center text-gray-800 bg-gray-50 shadow">{message}</div>}

//       {score !== null && (
//         <div className="mt-6 p-6 rounded-xl text-center bg-gray-50 shadow-lg">
//           <p className="text-2xl font-bold text-gray-800">Stability Score:</p>
//           <p className="text-5xl font-extrabold text-blue-600 mt-2">{score}%</p>
//           <p className="text-gray-600 mt-2">A higher score indicates a closer match to the template.</p>
//           {cid && <p className="mt-3 text-xs text-gray-500">Stored on IPFS: {cid}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DrawingTest;
import { useWriteContract } from 'wagmi';
import contractABI from '../../contract/HealthRecordsABI.json';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useDropzone } from 'react-dropzone';
import VoiceAnalysis from './VoiceAnalysis';

// Contract setup
const CONTRACT_ADDRESS = "0xcD6f2B30B8017fC364ED88B5319cAcb4BA30fdC6";
const API_BASE_URL = 'http://127.0.0.1:5000';
const BACKEND_API = 'http://localhost:8000/web/api/health-records/store-data';

// Custom SVG Icon
const ImagePlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
    <line x1="16" x2="22" y1="5" y2="5" />
    <line x1="19" x2="19" y1="2" y2="8" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

function DrawingTest() {
  const [activeFeature, setActiveFeature] = useState('drawing');
  const { writeContractAsync } = useWriteContract();

  // Blockchain save helper
  const sendToBlockchain = async (cid, testType) => {
    try {
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'storeTestResult',
        args: [cid, testType],
      });
      console.log("✅ Stored on blockchain, tx hash:", txHash);
      return txHash;
    } catch (err) {
      console.error("❌ Blockchain tx failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md rounded-lg m-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">PulsePoint Tests</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveFeature('drawing')}
                className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
                  activeFeature === 'drawing'
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Drawing Analysis
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveFeature('voice')}
                className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ease-in-out ${
                  activeFeature === 'voice'
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Voice Analysis
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-10 rounded-xl shadow-md h-full">
          {activeFeature === 'drawing'
            ? <DrawingAnalysis sendToBlockchain={sendToBlockchain} />
            : <VoiceAnalysis />}
        </div>
      </main>
    </div>
  );
}

// Drawing Analysis Component
function DrawingAnalysis({ sendToBlockchain }) {
  const [userImage, setUserImage] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [message, setMessage] = useState('');
  const [cid, setCid] = useState(null);
  const [txHash, setTxHash] = useState(null);
  
  // Get the account address using useAccount hook
  const { address } = useAccount();

  // Dropzones
  const { getRootProps: getUserImageRootProps, getInputProps: getUserImageInputProps } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [] },
    onDrop: (acceptedFiles) => setUserImage(acceptedFiles[0]),
  });

  const { getRootProps: getTemplateImageRootProps, getInputProps: getTemplateImageInputProps } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [] },
    onDrop: (acceptedFiles) => setTemplateImage(acceptedFiles[0]),
  });

  // Function to handle the transaction to blockchain
  const handleTransactToBlockchain = async () => {
    if (!cid) {
      setMessage('❌ No CID available for transaction');
      return;
    }
    
    if (!address) {
      setMessage('❌ Please connect your wallet first');
      return;
    }
    
    setIsTransacting(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8000/web/api/health-records/transact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cid: cid,
          account: address
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('✅ Transaction submitted successfully');
        setTxHash(result.txHash || 'Transaction hash not provided');
      } else {
        setMessage(`❌ Transaction failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`🌐 Network error: ${error.message}. Is backend running?`);
    } finally {
      setIsTransacting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userImage || !templateImage) {
      setMessage('⚠️ Please upload both a user drawing and a template image.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    setScore(null);
    setCid(null);
    setTxHash(null);

    const formData = new FormData();
    formData.append('user_image', userImage);
    formData.append('template_image', templateImage);

    try {
      // Step 1: Flask AI
      const response = await fetch(`${API_BASE_URL}/analyze_drawing`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(`❌ Error: ${result.error || 'Something went wrong.'}`);
        return;
      }

      setScore(result.stability_score);

      // Create the JSON object in the required format
      const jsonData = {"healthData":{
        testType: "drawing",
        score: result.stability_score,
        timestamp: new Date().toISOString(),
        userImageName: userImage.name,
        templateImageName: templateImage.name,
        // Add any other required fields based on your backend expectations}
      }};

      // Step 2: Store results in backend
      const backendRes = await fetch(BACKEND_API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': 'Bearer your-token-here'
        },
        body: JSON.stringify(jsonData),
      });

      if (!backendRes.ok) {
        const errorData = await backendRes.json();
        setMessage(`✅ Analysis success but storage failed: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const backendData = await backendRes.json();
      
      // If your backend returns a CID, use it
      if (backendData.cid) {
        setCid(backendData.cid);
        setMessage('✅ Analysis completed successfully. Click "Transact to Blockchain" to store on chain.');
      } else {
        setMessage('✅ Analysis completed successfully but no CID returned from backend');
      }

    } catch (error) {
      setMessage(`🌐 Network error: ${error.message}. Is backend running?`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Drawing Analysis</h1>
      <p className="text-gray-600 mb-8">
        Upload your drawing and a template image to get a stability score.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div {...getUserImageRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
          <input {...getUserImageInputProps()} />
          <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
          <p className="text-gray-500">
            {userImage ? `File selected: ${userImage.name}` : 'Drag & drop your drawing here, or click to select file'}
          </p>
        </div>

        <div {...getTemplateImageRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
          <input {...getTemplateImageInputProps()} />
          <div className="w-12 h-12 mx-auto mb-2 text-gray-400"><ImagePlusIcon /></div>
          <p className="text-gray-500">
            {templateImage ? `File selected: ${templateImage.name}` : 'Drag & drop the template image here, or click to select file'}
          </p>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl text-lg font-medium text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? 'Analyzing...' : 'Analyze Drawing'}
        </button>
      </form>

      {message && <div className="mt-6 p-4 rounded-xl text-center text-gray-800 bg-gray-50 shadow">{message}</div>}

      {score !== null && (
        <div className="mt-6 p-6 rounded-xl text-center bg-gray-50 shadow-lg">
          <p className="text-2xl font-bold text-gray-800">Stability Score:</p>
          <p className="text-5xl font-extrabold text-blue-600 mt-2">{score}%</p>
          <p className="text-gray-600 mt-2">A higher score indicates a closer match to the template.</p>
          {cid && (
            <>
              <p className="mt-3 text-xs text-gray-500">📦 Stored on IPFS: {cid}</p>
              <button
                onClick={handleTransactToBlockchain}
                disabled={isTransacting || !address}
                className="mt-4 py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTransacting ? 'Processing...' : 'Transact to Blockchain'}
              </button>
              {!address && (
                <p className="mt-2 text-xs text-red-500">Please connect your wallet to transact</p>
              )}
            </>
          )}
          {txHash && <p className="mt-3 text-xs text-gray-500">⛓ Tx Hash: {txHash}</p>}
        </div>
      )}
    </div>
  );
}

export default DrawingTest;