// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import App from './App';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Health DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // from walletconnect cloud
  chains: [ 
    // Choose your chain
    {
      id: 11155111, // Sepolia example
      name: 'Sepolia',
      rpcUrls: {
        default: { http: ['https://rpc.sepolia.org'] },
      },
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    }
  ],
  transports: {
    11155111: http('https://rpc.sepolia.org')
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
