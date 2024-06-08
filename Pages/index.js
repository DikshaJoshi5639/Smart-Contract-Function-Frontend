import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/SmartContract.sol/SmartContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [smartContract, setSmartContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const ATMABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  };

  const initializeSmartContract = () => {
    if (ethWallet && contractAddress && ATMABI) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ATMABI, signer);
      setSmartContract(contract);
    }
  };

  const getBalance = async () => {
    if (smartContract) {
      const balance = await smartContract.getBalance();
      setBalance(balance);
    }
  };

  const deposit = async () => {
    if (smartContract) {
      const tx = await smartContract.Deposite(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (smartContract) {
      const tx = await smartContract.Withdraw(1);
      await tx.wait();
      getBalance();
    }
  };


  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (!smartContract) {
      initializeSmartContract();
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={redeem}>Redeem Funds</button>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100vw;
          height: 100vh;
          background-image: url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fsmart-contract.html&psig=AOvVaw3umwePIgcleAiqNIEKKfJC&ust=1717937041335000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDOj7SEzIYDFQAAAAAdAAAAABAE");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          text-align: center;
          color: white;
        }
        header {
          padding: 20px 0;
        }
        h1, h2 {
          color: Green;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
        }
      `}</style>
    </main>
  );
}