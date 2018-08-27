pragma solidity ^0.4.23;

contract Owned {

  //============================================================================
  // VARIABLES

  address public owner;


  //============================================================================
  // MODIFIERS

  modifier isOwner() { assert(msg.sender == owner); _; }


  //============================================================================
  // CONSTRUCTOR

  constructor() public {
    owner = msg.sender;
  }


  //============================================================================
  // FUNCTIONS

  function transferOwnership(address newOwner)
  external
  isOwner
  {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }

}
