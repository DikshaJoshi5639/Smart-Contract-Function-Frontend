import { useState, useEffect } from "react";
import { ethers } from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/Mytoken.sol/Mytoken.json";

export default function Homepage() {
    const [meMessage, setMeMessage] = useState("EtherHail!");
    const [defaultAccount, setDefaultAccount] = useState(undefined);
    const [balance, setBalance] = useState(ethers.utils.parseEther("1.0")); // Initialize balance with 1 ETH
    const [ethWallet, setEthWallet] = useState(undefined);
    const [mysmartcontract, setMysmartcontract] = useState(undefined);
    const [redeemedAmount, setRedeemedAmount] = useState(0);
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState(0);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const smcABI = crypto_making_tree_abi.abi;

    const getBalance = async () => {
        try {
            if (mysmartcontract) {
                const currentBalance = await mysmartcontract.getBalance();
                setBalance(currentBalance);
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const deposit = async () => {
        try {
            if (mysmartcontract) {
                let tx = await mysmartcontract.Deposite(ethers.utils.parseEther("1.0")); // Depositing 1 ETH
                await tx.wait();
                getBalance();
            }
        } catch (error) {
            console.error("Error depositing:", error);
        }
    };

    const withdraw = async () => {
        try {
            if (mysmartcontract) {
                let tx = await mysmartcontract.Withdraw(ethers.utils.parseEther("1.0")); // Withdrawing 1 ETH
                await tx.wait();
                getBalance();
            }
        } catch (error) {
            console.error("Error withdrawing:", error);
        }
    };

    const connectWallettHandler = async () => {
        try {
            if (!ethWallet) {
                alert("MetaMask Wallet is required to Connect");
                return;
            }

            const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
            accountHandler(accounts);
            getMyContract();
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const getMyContract = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethWallet);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, smcABI, signer);
            setMysmartcontract(contract);
        } catch (error) {
            console.error("Error getting contract:", error);
        }
    };

    const redeem = async () => {
        try {
            if (mysmartcontract) {
                let tx = await mysmartcontract.Redeem();
                await tx.wait();
                setRedeemedAmount(balance); // Set the redeemed amount to the current balance
                getBalance(); // Refresh the balance after redemption
            }
        } catch (error) {
            console.error("Error while redeeming:", error.message);
        }
    };

    const transfer = async () => {
      try {
          if (ethWallet && recipientAddress && amount > 0) {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              
              // Convert amount to wei (smallest unit of Ether)
              const weiAmount = ethers.utils.parseEther(amount.toString());
  
              // Send transaction to transfer Ether
              const tx = await signer.sendTransaction({
                  to: recipientAddress,
                  value: weiAmount
              });
  
              await tx.wait(); // Wait for transaction to be mined
              console.log(`Transferred ${amount} ETH to ${recipientAddress}`);
              getBalance(); // Refresh balance
          } else {
              console.error("Recipient address or amount invalid.");
          }
      } catch (error) {
          console.error("Error while transferring:", error.message);
      }
  };
  

    const accountHandler = async (accounts) => {
        if (accounts.length > 0) {
            setDefaultAccount(accounts[0]);
        } else {
            setDefaultAccount(undefined);
        }
    };

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }
    };

    useEffect(() => {
        const init = async () => {
            getWallet();
        };
        init();
    }, []);

    useEffect(() => {
        const initContract = async () => {
            if (ethWallet) {
                getMyContract();
            }
        };
        initContract();
    }, [ethWallet]);

    useEffect(() => {
        const initBalance = async () => {
            if (mysmartcontract) {
                getBalance();
            }
        };
        initBalance();
    }, [mysmartcontract]);

    return (
        <main className="container">
            <header><h1>Welcome to Metacrafters ATM- Unleashing Crypto Possibilities</h1></header>
            <h2>{meMessage}</h2>
            {ethWallet && !defaultAccount && (
                <button onClick={connectWallettHandler}>Enable wallet for Ethereum contracts</button>
            )}
            {ethWallet && defaultAccount && (
                <div>
                    <h3>Your Account : {defaultAccount}</h3>
                    <p>Your Balance : {ethers.utils.formatEther(balance)} ETH</p>
                    <h3><button onClick={deposit}>Commit 1 ETH</button></h3>
                    <h3><button onClick={withdraw}>Retrieve 1 ETH</button></h3>
                    <h3><button onClick={redeem}>Redeem</button></h3>
                    <h3><button onClick={transfer}>Transfer ETH</button></h3>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        transfer();
                    }}>
                        <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Recipient Address" />
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                        
                    </form>
                    <p>Redeemed Amount : {ethers.utils.formatEther(redeemedAmount)} ETH</p>
                </div>
            )}
            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100vw;
                    height: 100vh;
                    text-align: center;
                    color: white;
                    background-image: url("https://thumbs.dreamstime.com/b/smart-contract-concept-person-using-smartphone-white-166298479.jpg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </main>
    );
}
