import { useState,useEffect } from 'react'
import './App.css'
import { Connect } from 'vite';

function App() {
  const [walletAddress,setWalletAddress] = useState("");


  // const chainConfigs = {
  //   mainnet: {
  //     chainId: "0x1", // 1
  //   },
  //   goerli: {
  //     chainId: "0x5", // 5
  //   },
  //   anvil: {
  //     chainId: "0x7A69", // 31337
  //     rpcUrls: ["http://127.0.0.1:8545"],
  //     chainName: "Anvil",
  //     nativeCurrency: {
  //       name: "ETH",
  //       symbol: "ETH",
  //       decimals: 18
  //     },
  //   }
  // };
  
  // async function switchToSelectedChain(chainKey) {
  //   const config = chainConfigs[chainKey];
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: config.chainId }],
  //     });
  //   } catch (err) {
  //     // If the chain isn't added yet
  //     if (err.code === 4902 && config.rpcUrls) {
  //       await window.ethereum.request({
  //         method: "wallet_addEthereumChain",
  //         params: [config],
  //       });
  //     } else {
  //       console.error("Error switching chain:", err);
  //     }
  //   }
  // }
  
  // async function connectWallet() {
  //   const selectedChain = document.getElementById("chainSelector").value;
  //   await switchToSelectedChain(selectedChain);
  
  //   const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  //   console.log("Connected:", accounts[0]);
  
  //   const hexId = window.ethereum.chainId;
  //   const chainId = parseInt(hexId, 16);
  //   console.log("Chain id:", chainId);
  //   document.getElementById("chainId").innerHTML = "Chain id = " + chainId;
  // }
  
  const connectWallet = async() => {
    if(typeof window.ethereum !== "undefined"){
      try{
        /* Metamask is installed */
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log("Connected", accounts[0]);
        // Now after getting the wallet connected we have to save the address for further use
        setWalletAddress(accounts[0]);
        // console.log("Chain id: ", window.ethereum.chainId);  // by default the chainId is in hexadecimal form
        const hexId = window.ethereum.chainId;
        const chainId = parseInt(hexId, 16);
        console.log("Chain id: ", chainId);
        const walletBtn = document.getElementById("connection");
        walletBtn.style.color = "white";
        walletBtn.style.backgroundColor = "green";
        document.getElementById("chainId").innerHTML = "Chain id = " + chainId;
      }catch(err){
        /*Metamask not installed*/
        console.log(err.message);
      }
    }
    else{
      alert("Please install Metamask");
    }
  }
  useEffect
  (() => {
    getIfAccountConnected();
    addWalletListener();
  },[]);

  // everytime the page loads we will check if the wallet is already connected or not
  const getIfAccountConnected = async() => {
    if(typeof window.ethereum !== "undefined"){
      try{
        const accounts = await window.ethereum.request({
          method: "eth_accounts"
        });
        if(accounts.length > 0){
          setWalletAddress(accounts[0]);
          console.log("Connected", accounts[0]);
          const walletBtn = document.getElementById("connection");
          walletBtn.style.color = "white";
          walletBtn.style.backgroundColor = "green";
          const hexId = window.ethereum.chainId;
          const chainId = parseInt(hexId, 16)
          document.getElementById("chainId").innerHTML = "Chain id = " + chainId;
        }else{
          console.log("Connect to Metamask using the Connect button");
        }
      }catch(err){
        /*Metamask not installed*/
        console.log(err.message);
      }
    }
    else{
      alert("Please install Metamask");
    }
  }
  const addWalletListener = async() => {
    if(typeof window.ethereum !== "undefined"){
      window.ethereum.on("accountsChanged",(accounts) => {
        setWalletAddress(accounts[0]);
        console.log("Connected",accounts[0]);
      });
    }
    else{
      setWalletAddress("");
      alert("Please install Metamask");
    }
  }
  

  return (
    <>
      {/* <select id="chainSelector">
        <option value="null">Select a chain</option>
        <option value="mainnet">Ethereum Mainnet</option>
        <option value="goerli">Goerli Testnet</option>
        <option value="anvil">Anvil (Localhost)</option>
      </select>
      <button onClick={connectWallet}>Connect Wallet</button>

      <p id="chainId"></p> */}

      
      <button onClick={connectWallet} id="connection">
        {(walletAddress&&walletAddress.length > 0) ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
        }
        {/* {walletAddress.length > 0 ? `Connected: ${walletAddress}` : "Connect Wallet"
        } */}
      </button>
        <p id="chainId"></p>
      
  
    </>
  )
}

export default Connect;