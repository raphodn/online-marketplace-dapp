pragma solidity ^0.4.23;

contract OnlineMarketplace {

  //============================================================================
  // VARIABLES

  // the online marketplace administrators
  mapping(address => bool) public administrators;

  // the online marketplace's storeowners
  mapping(address => bool) public storeOwners;


  //============================================================================
  // EVENTS

  // events when adding or removing an administrator
  event AddedAdministrator(address _address);
  event RemovedAdministrator(address _address);

  // events when adding or removing a store owner
  event AddedStoreOwner(address _address);
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
  returns (address)
  {
    administrators[_address] = true;
    emit AddedAdministrator(_address);
    return _address;
  }

  /**
   * TODO
   */
  function removeAdministrator(address _address)
  public
  isAdministrator
  returns (address)
  {
    administrators[_address] = false;
    emit RemovedAdministrator(_address);
    return _address;
  }

  /**
   * TODO
   */
  function addStoreOwner(address _address)
  public
  isAdministrator
  returns (address)
  {
    storeOwners[_address] = true;
    emit AddedStoreOwner(_address);
    return _address;
  }

  /**
   * TODO
   */
  function removeStoreOwner(address _address)
  public
  isAdministrator
  returns (address)
  {
    storeOwners[_address] = false;
    // extra stuff ?
    emit RemovedStoreOwner(_address);
    return _address;
  }

}
