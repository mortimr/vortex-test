pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract MyToken is MintableToken {
  string public name = "MyToken";
  string public symbol = "MYT";
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 0;

  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}