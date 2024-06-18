const hre = require("hardhat");

async function main() {
    const initBalance = 1;
    const Assessment = await hre.ethers.getContractFactory("Mytoken");
    const assessment = await Assessment.deploy(ethers.utils.parseEther("1.0"));
    await assessment.deployed();

    assessment.DisplayAddress();

    console.log(`A contract with balance of ${initBalance} eth deployed to ${assessment.address}`);

    assessment.on("showAddress", (owner) => {
        console.log(`msg.sender is : ${owner}`);
    });

    assessment.on("deposite", (deposit_val, Balance) => {
        console.log(`New deposit: ${deposit_val} new Balance is : ${Balance} ETH`);
    });

    assessment.on("withdraw", (withdraw_val, Balance) => {
        console.log(`New withdraw: ${withdraw_val} new Balance is : ${Balance} ETH`);
    });

    assessment.on("redeem", (amount) => {
        console.log(`Redeemed amount: ${amount} ETH`);
    });

    assessment.on("transfer", (from, to, amount) => {
        console.log(`Transferred ${amount} ETH from ${from} to ${to}`);
    });

    // Call the "redeem" function
    await assessment.Redeem();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
