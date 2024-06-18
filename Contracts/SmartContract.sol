// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Mytoken {
    address payable public WalletAddress;
    uint256 public Balance;

    event showAddress(address walAdress);
    event deposite(uint256 deposit_val, uint256 balance);
    event withdraw(uint256 withdraw_val, uint256 balance);
    event redeem(uint256 amount);
    event transfer(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 initval) {
        Balance = initval;
        WalletAddress = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return Balance;
    }

    function DisplayAddress() public payable {
        emit showAddress(WalletAddress);
    }

    function Deposite(uint256 deposit_val) public payable {
        Balance += deposit_val;
        emit deposite(deposit_val, Balance);
    }

    error insufficientBalance(uint256 balance, uint withdrawAmount);

    function Withdraw(uint256 withdraw_val) public payable {
        if (Balance < withdraw_val) {
            revert insufficientBalance(Balance, withdraw_val);
        }
        Balance -= withdraw_val;
        emit withdraw(withdraw_val, Balance);
    }

    function Redeem() public {
        if (Balance == 0) {
            revert insufficientBalance(0, 0); // Redeem is not allowed when the balance is zero
        } else {
            uint256 redeemAmount = Balance;
            Balance = 0;
            emit redeem(redeemAmount);
        }
    }

    function Transfer(address payable to, uint256 amount) public {
        require(amount > 0 && amount <= Balance, "Invalid amount to transfer");
        to.transfer(amount);
        Balance -= amount;
        emit transfer(msg.sender, to, amount);
    }
}
