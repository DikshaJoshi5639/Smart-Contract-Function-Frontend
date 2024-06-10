// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

contract SmartContract{

    address payable public WalletAddress;
    uint public Balance;

    event showAddress(address walAdress);
    event deposite(uint deposit_val,uint balance);
    event withdraw(uint withdraw_val,uint balance); 

    constructor(uint initval) {
        Balance = initval;
        WalletAddress = payable(msg.sender);
    }

    function getBalance() public view returns(uint){
        return Balance;
    }

    function DisplayAddress() public payable {
        emit showAddress(WalletAddress);
    }
    
    function Deposite(uint deopsite_val) public payable {
        Balance += deopsite_val;
        emit deposite(deopsite_val, Balance);
    }
    
    function Withdraw(uint withdraw_val) public payable {
    require(Balance >= withdraw_val, "Insufficient balance");
    
    Balance -= withdraw_val;
    emit withdraw(withdraw_val, Balance);
}
}
