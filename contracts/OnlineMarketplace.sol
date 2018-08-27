pragma solidity ^0.4.23;

import "./StoreOwner.sol";

contract OnlineMarketplace {

  //============================================================================
  // VARIABLES

  // the online marketplace administrators
  mapping(address => bool) public administrators;

  // the online marketplace's store owners & their corresponding contract address // blend into 1 mapping ?
  mapping(address => bool) public storeOwners;
  mapping(address => address) public storeOwnersContracts;


  //============================================================================
  // EVENTS

  // events when adding or removing an administrator
  event AddedAdministrator(address _address);
  event RemovedAdministrator(address _address);

  // events when adding or removing a store owner
  event AddedStoreOwner(address _address, address _storeOwnerContractAddress);
  event RemovedStoreOwner(address _address);


  //============================================================================
  // MODIFIERS

  // modifier to check if the sender is an administrator
  modifier isAdministrator() { require(administrators[msg.sender]); _; }
  // modifier to check if the address is an administrator address
  modifier isAdministratorAddress(address _address) { require(administrators[_address]); _; }

  // modifier to check if the sender is a store owner
  modifier isStoreOwner() { require(storeOwners[msg.sender]); _; }
  // modifier to check if the address is a store owner address
  modifier isStoreOwnerAddress(address _address) { require(storeOwners[_address]); _; }


  //============================================================================
  // CONSTRUCTOR

  constructor() public {
    // owner is an admin
    administrators[msg.sender] = true;
  }


  //============================================================================
  // FUNCTIONS

  /**
   * TODO
   */
  function addAdministrator(address _address)
  public
  isAdministrator
  returns (bool)
  {
    administrators[_address] = true;
    emit AddedAdministrator(_address);
    return true;
  }

  /**
   * TODO
   */
  function removeAdministrator(address _address)
  public
  isAdministrator
  returns (bool)
  {
    administrators[_address] = false;
    emit RemovedAdministrator(_address);
    return true;
  }

  /**
   * TODO
   */
  function addStoreOwner(address _address)
  public
  isAdministrator
  returns (bool)
  {
    storeOwners[_address] = true;
    StoreOwner storeOwnerContractAddress = new StoreOwner();
    storeOwnerContractAddress.transferOwnership(_address);
    emit AddedStoreOwner(_address, storeOwnerContractAddress);
    return true;
  }

  /**
   * TODO
   */
  function removeStoreOwner(address _address)
  public
  isAdministrator
  returns (bool)
  {
    storeOwners[_address] = false;
    // extra stuff ?
    emit RemovedStoreOwner(_address);
    return true;
  }

}
