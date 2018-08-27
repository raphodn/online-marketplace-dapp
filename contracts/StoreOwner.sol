pragma solidity ^0.4.23;

import "./Owned.sol";
import "./Store.sol";

contract StoreOwner is Owned {

  //============================================================================
  // VARIABLES

  address owner;

  mapping(address => bool) public stores;


  //============================================================================
  // EVENTS

  event AddedStore(address _storeOwnerAddress, address _storeContractAddress);
  event RemovedStore(address _storeOwnerAddress, address _storeContractAddress);


  //============================================================================
  // FUNCTIONS

  /**
   * TODO
   */
  function addStore()
  public
  isOwner
  returns(address)
  {
    Store store = new Store();
    stores[store] = true;
    emit AddedStore(msg.sender, store);
    return store;
  }

  /**
   * TODO
   */
  function removeStore(address _storeAddress)
  public
  isOwner
  returns(bool)
  {
    stores[_storeAddress] = false;
    emit RemovedStore(msg.sender, _storeAddress);
    return true;
  }

}
