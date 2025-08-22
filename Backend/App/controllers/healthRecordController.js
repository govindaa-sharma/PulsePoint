// const ipfsService = require('../services/ipfsService');
// const web3Service = require('../services/web3Service');

// class HealthRecordController {
//   async storeData(req, res) {
//     try {
//       const { healthData } = req.body;
      
//       if (!healthData) {
//         return res.status(400).json({ error: 'Health data is required' });
//       }

//       const cid = await ipfsService.uploadData(healthData);
//       res.json({ cid, message: 'Data stored to IPFS successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async transact(req, res) {
//     try {
//       const { cid, account } = req.body;
      
//       if (!cid || !account) {
//         return res.status(400).json({ error: 'CID and account are required' });
//       }

//       const transaction = await web3Service.addRecord(cid, account);
//       res.json({ 
//         transactionHash: transaction.transactionHash,
//         message: 'Transaction successful' 
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async fetchData(req, res) {
//     try {
//       const { account } = req.params;
      
//       if (!account) {
//         return res.status(400).json({ error: 'Account address is required' });
//       }

//       const recordHashes = await web3Service.getPatientRecords(account);
//       const records = [];

//       for (const hash of recordHashes) {
//         const recordDetails = await web3Service.getRecordDetails(hash);
//         if (recordDetails.owner !== '0x0000000000000000000000000000000000000000') {
//           const healthData = await ipfsService.retrieveData(recordDetails.cid);
//           records.push({
//             hash,
//             cid: recordDetails.cid,
//             data: healthData
//           });
//         }
//       }

//       res.json({ records });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = new HealthRecordController();


const ipfsService = require('../services/ipfsService');
const web3Service = require('../services/web3Service');
require('dotenv').config();

class HealthRecordController {
  async storeData(req, res) {
    try {
      const { healthData } = req.body;
      console.log('Storing health data:', healthData);

      if (!healthData) {
        return res.status(400).json({ error: 'Health data is required' });
      }

      // Add timestamp to the data
      const dataWithTimestamp = {
        ...healthData,
        timestamp: new Date().toISOString(),
        encrypted: true // You might want to add encryption status
      };

      const cid = await ipfsService.uploadData(dataWithTimestamp);
      res.json({ cid, message: 'Data stored to IPFS via Pinata successfully' });
      console.log('Uploaded to IPFS with CID:', cid);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async transact(req, res) {
    try {
      const { cid, account } = req.body;
      
      if (!cid || !account) {
        return res.status(400).json({ error: 'CID and account are required' });
      }

      // Verify the data exists on IPFS before storing on blockchain
      const exists = await ipfsService.checkFileExists(cid);
      if (!exists) {
        return res.status(400).json({ error: 'Data not found on IPFS' });
      }

      const transaction = await web3Service.addRecord(cid, account);
      console.log('Blockchain transaction successful:', transaction);
      res.json({ 
        transactionHash: transaction.transactionHash,
        message: 'Transaction successful' 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async fetchData(req, res) {
    try {
      const { account } = req.params;
      
      if (!account) {
        return res.status(400).json({ error: 'Account address is required' });
      }

      const recordHashes = await web3Service.getPatientRecords(account);
      const records = [];

      for (const hash of recordHashes) {
        try {
          const recordDetails = await web3Service.getRecordDetails(hash);
          if (recordDetails.owner !== '0x0000000000000000000000000000000000000000') {
            const healthData = await ipfsService.retrieveData(recordDetails.cid);
            records.push({
              hash,
              cid: recordDetails.cid,
              data: healthData
            });
          }
        } catch (error) {
          console.error(`Error fetching record ${hash}:`, error);
          // Continue with other records even if one fails
        }
      }

      res.json({ records });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // to pass account as object 
//   async fetchData(req, res) {
//   try {
//     // Get the account from the request body
//     const { account } = req.body;

//     if (!account) {
//       return res.status(400).json({ error: 'Account address is required in the request body.' });
//     }

//     // Use the 'account' variable to call your web3Service
//     const records = await web3Service.getPatientRecords(account);
    
//     res.json(records);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


  // New endpoint to get Pinata authentication for direct uploads from frontend
  async getPinataAuth(req, res) {
    try {
      res.json({
        pinataJWT: process.env.PINATA_JWT,
        pinataApiKey: process.env.PINATA_API_KEY,
        gatewayURL: 'https://gateway.pinata.cloud/ipfs'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new HealthRecordController();