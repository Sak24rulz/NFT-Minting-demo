import React, { useState } from "react";
import { ethers } from "ethers";
import NFTCollection from "./artifacts/contracts/NFTCollection.sol/NFTCollection.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [tokenURI, setTokenURI] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not installed!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(accounts[0]);
  };

  const mintNFT = async () => {
    if (!tokenURI) return alert("Enter token URI!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NFTCollection.abi, signer);
    const tx = await contract.mintNFT(currentAccount, tokenURI);
    await tx.wait();
    alert("NFT minted successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Demo NFT Minting App</h1>
      {!currentAccount && <button onClick={connectWallet}>Connect Wallet</button>}
      {currentAccount && (
        <>
          <input
            type="text"
            placeholder="Enter NFT URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
          <button onClick={mintNFT}>Mint NFT</button>
        </>
      )}
    </div>
  );
}

export default App;
