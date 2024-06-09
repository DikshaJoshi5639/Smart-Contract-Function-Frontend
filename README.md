# Interact your smart-contract with frontend and connect it to MetaMask Wallet
In this section we will be connecting our smart contract with the frontend and a METAMASK wallet to deposite or withdraw Ethers.

## Description
It contains 3 Files namely deploy.js, index.js and SmartContract.sol in the 3 folders Scripts, Pages and Contracts respectively.

## Getting Started
To run this program, you can use gitpod by clicking the link https://metacrafterc-scmstarter-endrfexphsa.ws-us114.gitpod.io/

### Executing program for frontend and smart contract
1. copy and paste the index.js, SmartContract.sol and deploy.js from the repository into your gitpod website.
2. Remember index.js contains the frontend code.
3. Open two additional terminals in your gitpod
4. In the second terminal type: npx hardhat node
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
6. Back in the first terminal, type npm run dev to launch the front-end.
After this, the project will be running on your localhost. Typically at http://localhost:3000/

### wallet setup
To interact with the smart contract, we need to set up a network with the MetaMask wallet.
1. Click on the MetaMask extension and then click on the top right button -> settings.
2. Click on "Add a Network."
3. Click on "Add a Network Manually."
4. Give the Network name (whatever you want).
5. Set the New RPC URL to http:https://8545-metacrafterc-scmstarter-kodhc8ve1v6.ws-us114.gitpod.io
6. Set the Chain ID to 31337.
7. Set the Currency symbol.
Now, set the MetaMask wallet network to the newly created network.

To set up an account, you have to import the account's private key, which you can find in the second terminal where we executed the command npx hardhat node. After that, you can see there are many account numbers with private keys written in the terminal.Take any account's private key to import it to your Metamask Wallet.And Now your imported account is coonect to our METAMASK wallet and hence we can transfer our ethers.

Now open http://localhost:3000/ again and now you can interact with your frontend and METAMASK wallet and transfer tokens accordingly.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
