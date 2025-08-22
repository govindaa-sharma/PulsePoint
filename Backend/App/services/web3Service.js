// // const Web3 = require('web3');
// const { Web3 } = require('web3');

// const HealthRecordsV2ABI = require('../../contracts/HealthRecordsV2.json');

// class Web3Service {
//   constructor() {
//     this.web3 = new Web3(process.env.WEB3_PROVIDER || 'http://localhost:8545');
//     this.contract = new this.web3.eth.Contract(
//       HealthRecordsV2ABI.abi,
//       process.env.CONTRACT_ADDRESS
//     );
//   }

//   async addRecord(cid, account) {
//     try {
//       const gasEstimate = await this.contract.methods.addRecord(cid).estimateGas({ from: account });
      
//       const result = await this.contract.methods.addRecord(cid).send({
//         from: account,
//         gas: gasEstimate
//       });
      
//       return result;
//     } catch (error) {
//       throw new Error(`Blockchain transaction failed: ${error.message}`);
//     }
//   }

//   async getPatientRecords(patientAddress) {
//     try {
//       const recordHashes = await this.contract.methods.getPatientRecords(patientAddress).call();
//       return recordHashes;
//     } catch (error) {
//       throw new Error(`Failed to fetch patient records: ${error.message}`);
//     }
//   }

//   async getRecordDetails(recordHash) {
//     try {
//       const record = await this.contract.methods.records(recordHash).call();
//       return record;
//     } catch (error) {
//       throw new Error(`Failed to fetch record details: ${error.message}`);
//     }
//   }
// }

// module.exports = new Web3Service();




const { Web3 } = require('web3');
const HealthRecordsV2ABI = require('../../contracts/HealthRecordsV2.json');
require('dotenv').config();

class Web3Service {
  constructor() {
    this.web3 = new Web3(process.env.WEB3_PROVIDER);
    this.contract = new this.web3.eth.Contract(
      HealthRecordsV2ABI.abi,
      process.env.CONTRACT_ADDRESS
    );
    // Load the sender account from the private key
    this.senderAccount = this.web3.eth.accounts.privateKeyToAccount(
      '0x' + process.env.SENDER_PRIVATE_KEY
    );
  }

  // async addRecord(cid) { // The 'account' parameter is no longer needed
  //   try {
  //     console.log(`Sending transaction from account: ${this.senderAccount.address}`);

  //     // 1. Create the transaction data (what function to call and with what parameters)
  //     const txData = this.contract.methods.addRecord(cid).encodeABI();

  //     // 2. Build the full transaction object
  //     const txObject = {
  //       from: this.senderAccount.address,
  //       to: process.env.CONTRACT_ADDRESS,
  //       data: txData,
  //       gas: await this.contract.methods.addRecord(cid).estimateGas({ from: this.senderAccount.address }),
  //       nonce: await this.web3.eth.getTransactionCount(this.senderAccount.address),
  //       // Add other necessary fields like gasPrice or maxFeePerGas depending on network type
  //     };

  //     // 3. Sign the transaction with the private key
  //     const signedTx = await this.senderAccount.signTransaction(txObject);

  //     // 4. Send the signed transaction
  //     const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  //     return receipt;
  //   } catch (error) {
  //     console.error('Blockchain transaction error:', error);
  //     throw new Error(`Blockchain transaction failed: ${error.message}`);
  //   }
  // }

  // In web3service.js

async addRecord(cid) {
  try {
    console.log(`Sending transaction from account: ${this.senderAccount.address}`);

    // 1. Create the transaction data
    const txData = this.contract.methods.addRecord(cid).encodeABI();

    // 2. Estimate gas limit
    const gasLimit = await this.contract.methods.addRecord(cid).estimateGas({ from: this.senderAccount.address });

    // 3. Get latest EIP-1559 fee data
    const latestBlock = await this.web3.eth.getBlock('latest');
    const baseFeePerGas = BigInt(latestBlock.baseFeePerGas);
    const maxPriorityFeePerGas = BigInt(this.web3.utils.toWei('1.5', 'gwei')); // Tip for the validator
    const maxFeePerGas = baseFeePerGas * 2n + maxPriorityFeePerGas;

    // 4. Build the full transaction object with EIP-1559 parameters
    const txObject = {
      from: this.senderAccount.address,
      to: process.env.CONTRACT_ADDRESS,
      data: txData,
      gas: gasLimit,
      nonce: await this.web3.eth.getTransactionCount(this.senderAccount.address, 'latest'),
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: maxFeePerGas,
      chainId: 11155111 // Sepolia's chain ID
    };

    // 5. Sign the transaction with the private key
    const signedTx = await this.senderAccount.signTransaction(txObject);

    // 6. Send the signed transaction
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt;
  } catch (error) {
    console.error('Blockchain transaction error:', error);
    throw new Error(`Blockchain transaction failed: ${error.message}`);
  }
}

  async getPatientRecords(patientAddress) {
    try {
      const recordHashes = await this.contract.methods.getPatientRecords(patientAddress).call();
      return recordHashes;
    } catch (error) {
      throw new Error(`Failed to fetch patient records: ${error.message}`);
    }
  }

  async getRecordDetails(recordHash) {
    try {
      const record = await this.contract.methods.records(recordHash).call();
      return record;
    } catch (error) {
      throw new Error(`Failed to fetch record details: ${error.message}`);
    }
  }
}

module.exports = new Web3Service();