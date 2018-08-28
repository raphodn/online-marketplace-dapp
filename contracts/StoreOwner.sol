pragma solidity ^0.4.23;

import "./Owned.sol";
import "./Store.sol";

/**
 * @title Store Owner
 * Business logic to help a store owner manage his or her stores
*/
contract StoreOwner is Owned {

  //============================================================================
  // VARIABLES

  mapping(address => bool) public stores;


  //============================================================================
  // EVENTS

  event AddedStore(address _storeOwnerAddress, address _storeContractAddress);
  event RemovedStore(address _storeOwnerAddress, address _storeContractAddress);


  //============================================================================
  // FUNCTIONS

  /**
   * @dev Add a store
   * @return the store's contract address
   */
  function addStore()
  public
  isOwner
  returns(address)
  {
    Store storeContractAddress = new Store();
    storeContractAddress.transferOwnership(owner);
    stores[storeContractAddress] = true;
    emit AddedStore(msg.sender, storeContractAddress);
    return storeContractAddress;
  }

  /**
   * @dev Remove a store
   * @param _storeAddress the contract address of the store to be removed
   * @return true if successful
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
