var OnlineMarketplace = artifacts.require('OnlineMarketplace');
var StoreOwner = artifacts.require('StoreOwner');
var Store = artifacts.require('Store');

contract('Store', function(accounts) {

  let storeOwnerContractAddress;
  let storeContractAddress;

  it('should allow a store owner to add a new product', async() => {
    // add store owner
    const onlineMarketplace = await OnlineMarketplace.deployed();
    const addStoreOwnerTransaction = await onlineMarketplace.addStoreOwner(accounts[2], { from: accounts[0] });
    // store owner contract address -> store owner contract -> create a store
    storeOwnerContractAddress = addStoreOwnerTransaction.logs[0].args['_storeOwnerContractAddress'];
    const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
    const addStoreTransaction = await storeOwnerContract.addStore({ from: accounts[2] });
    // get the store contract address -> store contract -> add product
    storeContractAddress = addStoreTransaction.logs[0].args['_storeContractAddress'];
    const storeContract = await Store.at(storeContractAddress);
    const addProductTransaction = await storeContract.addProduct('Shampoo', 10, 500, { from: accounts[2] });
    // get the product id
    const productId = addProductTransaction.logs[0].args['_productid'];
    // assert
    assert.equal(productId, 1, 'should allow a store owner to add a new product');
  });

  it('should allow a store owner to a second product and retrieve it', async() => {
    // get the store contract address -> store contract -> add product
    const storeContract = await Store.at(storeContractAddress);
    const addProductTransaction = await storeContract.addProduct('Toothpaste', 20, 200, { from: accounts[2] });
    // get the product id
    const productId = addProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[0], '2', 'should allow a store owner to a second product and retrieve it');
  });

  it('should allow a store owner to add a third product and retrieve it', async() => {
    // get the store contract address -> store contract -> add product
    const storeContract = await Store.at(storeContractAddress);
    const addProductTransaction = await storeContract.addProduct('Sponge', 5, 1000, { from: accounts[2] });
    // get the product id
    const productId = addProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[0], '3', 'should allow a store owner to add a third product and retrieve it');
  });

  it('should allow a store owner to remove a product', async() => {
    // get the store contract address -> store contract -> remove product
    const storeContract = await Store.at(storeContractAddress);
    const removeProductTransaction = await storeContract.removeProduct(3, { from: accounts[2] });
    // get the product id
    const productId = removeProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[0], false, 'should allow a store owner to remove a product');
  });

  it('should allow a store owner to change the price of a product', async() => {
    // get the store contract address -> store contract -> add product
    const storeContract = await Store.at(storeContractAddress);
    const changeProductTransaction = await storeContract.changeProductPrice(2, 15, { from: accounts[2] }); // oldPrice was 20
    // get the product id
    const productId = changeProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[2], '15', 'should allow a store owner to change the price of a product');
  });

  it('should allow a store owner to change the quantity of a product', async() => {
    // get the store contract address -> store contract -> add product
    const storeContract = await Store.at(storeContractAddress);
    const changeProductTransaction = await storeContract.changeProductQuantity(2, 250, { from: accounts[2] }); // oldQuantity was 200
    // get the product id
    const productId = changeProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[3], '250', 'should allow a store owner to change the quantity of a product');
  });

  it('should allow any user to buy a product', async() => {
    // get the store contract address -> store contract -> buy product *from accounts[5]*
    const storeContract = await Store.at(storeContractAddress);
    const buyProductTransaction = await storeContract.buyProduct(1, { from: accounts[5], value: web3.toWei('12', 'ether') });
    // get the product id
    const productId = buyProductTransaction.logs[0].args['_productid'];
    const result = await storeContract.products.call(productId);
    // assert
    assert.equal(result[3], '499', 'should allow any user to buy a product');
  });

  it('should not allow user to buy a product with quantity null', async() => {
    // TODO
  });

  it('should not allow user to buy a removed product', async() => {
    // TODO
  });

  it('should allow show owner to withdraw funds', async() => {
    // TODO
  });

});
