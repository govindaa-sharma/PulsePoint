
// const axios = require('axios');
// require('dotenv').config();

// class IPFSService {
//   constructor() {
//     this.pinataApiKey = process.env.PINATA_API_KEY;
//     this.pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
//     this.pinataJWT = process.env.PINATA_JWT;
//     this.pinataBaseURL = 'https://api.pinata.cloud';
//     // https://ipfs.io/ipfs/QmexVbALiq7cEiD3kBxhtUzSoUQG6xVq5EztW3TFSPTxBz
//     // https://api.pinata.cloud/QmexVbALiq7cEiD3kBxhtUzSoUQG6xVq5EztW3TFSPTxBz
//   }

//   async uploadData(data) {
//     try {

//       // THIS IS THE MOST IMPORTANT LINE FOR DEBUGGING
//     console.log('--- DEBUG ---');
//     console.log('Type of this.pinataJWT:', typeof this.pinataJWT);
//     console.log('Value of this.pinataJWT:', this.pinataJWT);
//     console.log('--- END DEBUG ---');
//       const response = await axios.post(
//         `${this.pinataBaseURL}/pinning/pinJSONToIPFS`,
//         data,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${this.pinataJWT}`
//           }
//         }
//       );
      
//       return response.data.IpfsHash;
//     } catch (error) {
//       console.error('Pinata upload error:', error.response?.data || error.message);
//       throw new Error(`IPFS upload failed: ${error.message}`);
//     }
//   }

//   async retrieveData(cid) {
//     try {
//       // Using public gateway to retrieve data
//       const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
//       return response.data;
//     } catch (error) {
//       // Fallback to public IPFS gateway if Pinata gateway fails
//       try {
//         const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
//         return response.data;
//       } catch (fallbackError) {
//         throw new Error(`IPFS retrieval failed: ${fallbackError.message}`);
//       }
//     }
//   }

//   // Optional: Check if a file exists on Pinata
//   async checkFileExists(cid) {
//     try {
//       const response = await axios.get(
//         `${this.pinataBaseURL}/data/pinList?hashContains=${cid}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${this.pinataJWT}`
//           }
//         }
//       );
      
//       return response.data.rows.length > 0;
//     } catch (error) {
//       console.error('Error checking file existence:', error);
//       return false;
//     }
//   }
// }

// module.exports = new IPFSService();




const axios = require('axios');
require('dotenv').config();

class IPFSService {
  constructor() {
    this.pinataApiKey = process.env.PINATA_API_KEY;
    this.pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
    this.pinataJWT = process.env.PINATA_JWT;
    this.pinataBaseURL = 'https://api.pinata.cloud';
  }

  async uploadData(data) {
    try {
      // THIS IS THE MOST IMPORTANT LINE FOR DEBUGGING
      console.log('--- DEBUG: uploadData ---');
      console.log('Type of this.pinataJWT:', typeof this.pinataJWT);
      console.log('Value of this.pinataJWT:', this.pinataJWT);
      console.log('--- END DEBUG ---');
      const response = await axios.post(
        `${this.pinataBaseURL}/pinning/pinJSONToIPFS`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.pinataJWT}`
          }
        }
      );
      
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Pinata upload error:', error.response?.data || error.message);
      throw new Error(`IPFS upload failed: ${error.message}`);
    }
  }

  async retrieveData(cid) {
    try {
      // Using public gateway to retrieve data
      const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
      return response.data;
    } catch (error) {
      // Fallback to public IPFS gateway if Pinata gateway fails
      try {
        const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
        return response.data;
      } catch (fallbackError) {
        throw new Error(`IPFS retrieval failed: ${fallbackError.message}`);
      }
    }
  }

  // Optional: Check if a file exists on Pinata
  async checkFileExists(cid) {
    // --- Start of New Debugging ---
    console.log('\n--- DEBUG: checkFileExists ---');
    console.log('Checking for CID:', cid);
    console.log('Type of this.pinataJWT:', typeof this.pinataJWT);
    console.log('Is JWT defined?:', !!this.pinataJWT);
    const requestURL = `${this.pinataBaseURL}/data/pinList?hashContains=${cid}`;
    console.log('Requesting URL:', requestURL);
    // --- End of New Debugging ---

    try {
      const response = await axios.get(
        requestURL, // Use the constructed URL
        {
          headers: {
            'Authorization': `Bearer ${this.pinataJWT}`
          }
        }
      );
      
      console.log('Pinata API Response:', response.data);
      console.log('--- END DEBUG: checkFileExists ---\n');
      return response.data.rows.length > 0;

    } catch (error) {
      // --- Enhanced Error Logging ---
      console.error('--- ERROR in checkFileExists ---');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Status Code:', error.response.status);
        console.error('Response Data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', error.message);
      }
      console.error('--- END ERROR --- \n');
      // --- End of Enhanced Error Logging ---
      return false;
    }
  }
}

module.exports = new IPFSService();