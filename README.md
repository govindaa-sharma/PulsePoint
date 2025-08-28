# NeuroLink: Decentralized & Collaborative Health Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Project-blue)](https://github.com/govindaa-sharma/PulsePoint)

NeuroLink is a revolutionary web-based platform designed to bridge gaps in global healthcare. It connects patients, healthcare providers, NGOs, and volunteers in a collaborative ecosystem. Our platform integrates advanced AI for predictive health insights and blockchain technology for secure, patient-owned data governance, with a special focus on neurological disorders and advanced medical imaging.

## 🌟 Key Features

### Core Platform
- **Centralized Health Hub**: A unified portal for health resources, educational content, and campaign information.
- **Real-Time Outbreak Reporting**: Interactive map for tracking and reporting illness outbreaks in underserved regions.
- **Telemedicine & Mental Health**: Secure video consultations to connect patients with professionals anywhere.
- **Campaign & Feedback System**: Tools for NGOs to organize health drives and gather community feedback.

### Advanced Modules

#### 1. Neurological Disorder Monitoring (Digital Biomarkers)
- **At-Home Patient Tests**: Simple daily tasks (spiral drawing, voice recording, finger tapping) performed via web app.
- **AI-Powered Analysis**: Machine learning models analyze test results to generate digital biomarkers and track progression of conditions like Parkinson's and Multiple Sclerosis.
- **Blockchain-Backed Data Ownership**: Patient data is stored securely on a blockchain (e.g., IPFS + Ethereum/Solana). Patients own their data and control access.
- **Decentralized Data Marketplace**: Patients can voluntarily share anonymized data with researchers, creating a new paradigm for medical research.

#### 2. AI Medical Imaging Beyond Diagnosis
- **Multi-Modality Support**: Processes MRI, CT scans, and X-rays for comprehensive analysis.
- **Predictive Analytics**: AI models not only detect diseases but predict progression, estimate treatment response, and forecast potential complications.
- **Explainable AI (XAI)**: Generates visual heatmaps and easy-to-understand text reports, highlighting the "why" behind the AI's conclusions for clinician trust.

## 🛠️ Tech Stack

*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Node.js, Express.js, Python (Flask/Django for AI services)
*   **AI/ML:** TensorFlow / PyTorch, Scikit-learn, OpenCV, Librosa (for audio analysis)
*   **Blockchain:** Solidity (Smart Contracts), wagmi, IPFS (for decentralized storage)
*   **Database:**  MongoDB 
*   **Authentication:**  JWT
*   **Deployment:** Docker, AWS / Google Cloud / Vercel
*   **Other:**  Open Route API (for maps)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   Python (v3.8 or higher)
*   MongoDB compass
*   nodemon
*   npm, yarn, or pip
*   Connection to  testnet Sepolia (for full functionality)
*   Git
*   wsl(windows subsystem for Linux)  (If want to run blockchain)
*   foundry installed(If want to run blockchain)
*   Makefile extension(If want to run blockchain)
*    A modern web browser with a wallet extension (like MetaMask) connected to the **Sepolia testnet**.

### Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/govindaa-sharma/PulsePoint
    cd PulsePoint
    ```

2.  **Install backend dependencies**
    ```bash
    cd backend
    - npm install
    - npm i express
    - npm i mongoose
    - npm i cors
    ```

3.  **Install frontend dependencies**
    ```bash
    cd ../frontend
    - npm install
    - npm i axios
    - npm install tailwindcss @tailwindcss/vite
        Configure the Vite plugin - see steps from tailwind docs
    ```

4.  **Environment Setup**
    Create a `.env` file in the `backend` directory and add your keys:
    ```env
    DBURL=your_database_connection_string
    PORT=8000
    CONTRACT_ADDRESS=0xcD6f2B30B8017fC364ED88B5319cAcb4BA30fdC6
    PINATA_API_KEY= Your_Pinata_Api_Key
    PINATA_JWT=Your_Pinata_JWT
    WEB3_PROVIDER=your_ethereum_rpc_url
    SENDER_PRIVATE_KEY=Private_key_of_senders_Wallet
    GOOGLE_API_KEY=your_gemini_api_key
    ```
    Create a `.env` file in the `Blockchain` directory and add your keys:
    ```env
    SEPOLIA_RPC_URL=your_ethereum_rpc_url
    PRIVATE_KEY=Private_key_of_senders_Wallet
    ```

5.  **Run the development servers**
    *Backend (from `/backend`)*:
    ```bash
    cd Backend
    npm start
    # and
    cd drawingTest
    python app.py
    ```
    *Frontend (from `/Main PulsePoint directory`)*:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

### Running Smart Contracts(if you want, it's not necessary because it's already deployed, no need to deploy again)

```bash
cd blockchain
wsl
forge compile
make deploy ARGS="--network sepolia"
```


## 👥 Team

| Team Member       | Role                            | GitHub Profile |
|-------------------|---------------------------------|----------------|
| Sutirtha Paul     | Full-Stack & Blockchain Developer | [@Sutirtha-paul](https://github.com/sutirthapaul17) |
| Govinda Sharma    | AI/ML Engineer                  | [@Govindaa-sharma](https://github.com/govindaa-sharma) |
| Arijit Adhikary   | AI/ML Engineer                  | [@Arijit-adhikary](https://github.com/Arijit963) |
| Sanchari Dey      | Frontend & Blockchain Developer | [@Sanchari-dey](https://github.com/Sancharidey2) |

Built with ❤️ by Team PulsePoint during the Hack-Heritage 3.0 .
