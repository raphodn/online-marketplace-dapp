pragma solidity ^0.4.23;

import "./Owned.sol";

contract Store is Owned {

  //============================================================================
  // VARIABLES

  uint index;

  address public storeOwner;

  uint private funds;

  mapping(uint => Product) public products;

  struct Product {
    uint productid;
    bytes32 name;
    uint price;
    uint quantity;
    // string imageLink; // IPFS
    // string descriptionLink; // IPFS
  }


  //============================================================================
  // EVENTS

  event AddedProduct(address _storeOwnerAddress, uint _productid, uint _price, uint _quantity);
  event RemovedProduct(address _storeOwnerAddress, uint _productid, uint _price, uint _quantity);
  event UpdatedProductPrice(address _storeOwnerAddress, uint _productid, uint _oldPrice, uint _newPrice);
  event UpdatedProductQuantity(address _storeOwnerAddress, uint _productid, uint _oldQuantity, uint _newQuantity);
  event WithdrewFunds(address _storeOwnerAddress, uint _withdrawAmount, uint _newBalance); // keep private ??
  event BoughtProduct(address _storeOwnerAddress, uint _productid, uint _price, uint _quantity);


  //============================================================================
  // MODIFIERS

  modifier checkProductExists(uint _productid) { require(products[_productid].productid > 0); _; }
  modifier checkProductAvailable(uint _productid) { require(products[_productid].quantity > 0); _; }
  modifier checkProductQuantityAvailable(uint _productid, uint _quantity) { require(products[_productid].quantity >= _quantity); _; }
  modifier paidEnough(uint _price) { require(msg.value >= _price); _; }
  modifier checkAmountPositive(uint _amount) { require(_amount >= 0); _; }


  //============================================================================
  // CONSTRUCTOR

  constructor() public {
    index = 1;
  }


  //============================================================================
  // FUNCTIONS

  /**
   * TODO
   */
  function addProduct(bytes32 _name, uint _price, uint _quantity)
  public
  isOwner
  returns (bool)
  {
    products[index] = Product({ productid: index, name: _name, price: _price, quantity: _quantity });
    emit AddedProduct(owner, index, _price, _quantity);
    index += 1;
    return true;
  }

  /**
   * TODO
   */
  function removeProduct(uint _productid)
  public
  isOwner
  checkProductExists(_productid)
  returns (bool)
  {
    Product storage currentProduct = products[_productid];
    delete products[_productid];
    emit RemovedProduct(owner, _productid, currentProduct.price, currentProduct.quantity);
    return true;
  }

  /**
   * TODO
   */
  function changeProductPrice(uint _productid, uint _newPrice)
  public
  isOwner
  checkProductExists(_productid)
  checkAmountPositive(_newPrice)
  returns (bool)
  {
    /* Product storage currentProduct = products[_productid]; */
    uint _oldPrice = products[_productid].price;
    products[_productid].price = _newPrice;
    emit UpdatedProductPrice(owner, _productid, _oldPrice, _newPrice);
    return true;
  }

  /**
   * TODO
   */
  function changeProductQuantity(uint _productid, uint _newQuantity)
  public
  isOwner
  checkProductExists(_productid)
  checkAmountPositive(_newQuantity)
  returns (bool)
  {
    /* Product storage currentProduct = products[_productid]; */
    uint _oldQuantity = products[_productid].quantity;
    products[_productid].quantity = _newQuantity;
    emit UpdatedProductQuantity(owner, _productid, _oldQuantity, _newQuantity);
    return true;
  }

  /**
   * TODO
   */
  function buyProduct(uint _productid)
  public
  payable
  checkProductExists(_productid)
  paidEnough(products[_productid].price)
  returns (bool)
  {
    products[_productid].quantity -= 1;
    funds += products[_productid].price;
    emit BoughtProduct(owner, _productid, products[_productid].price, 1);
    return true;
  }

  /**
   * TODO
   */
  function withdrawFunds()
  public
  isOwner
  returns (bool)
  {
    uint _oldFunds = funds;
    owner.transfer(funds);
    funds = 0;
    emit WithdrewFunds(owner, _oldFunds, funds);
    return true;
  }

}
