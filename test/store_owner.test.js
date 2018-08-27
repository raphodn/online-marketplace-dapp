var OnlineMarketplace = artifacts.require('OnlineMarketplace');
var StoreOwner = artifacts.require('StoreOwner');

contract('StoreOwner', function(accounts) {

  let storeOwnerContractAddress;
  let storeOneContractAddress, storeTwoContractAddress;

  it('should allow a store owner to add a new store', async() => {
    // add store owner
    const onlineMarketplace = await OnlineMarketplace.deployed();
    const addStoreOwnerTransaction = await onlineMarketplace.addStoreOwner(accounts[2], { from: accounts[0] });
    // store owner contract address -> store owner contract -> create a store
    storeOwnerContractAddress = addStoreOwnerTransaction.logs[0].args['_storeOwnerContractAddress'];
    const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
    const addStoreTransaction = await storeOwnerContract.addStore({ from: accounts[2] });
    // get the store contract address
    storeOneContractAddress = addStoreTransaction.logs[0].args['_storeContractAddress'];
    const result = await storeOwnerContract.stores.call(storeOneContractAddress);
    // assert
    assert.equal(result, true, 'should allow a store owner to add a new store');
  });

  it('should allow a store owner to add a second store', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    // store owner contract address -> store owner contract -> create a store
    const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
    const addStoreTransaction = await storeOwnerContract.addStore({ from: accounts[2] });
    // get the store contract address
    storeTwoContractAddress = addStoreTransaction.logs[0].args['_storeContractAddress'];
    const result = await storeOwnerContract.stores.call(storeTwoContractAddress);
    // assert
    assert.equal(result, true, 'should allow a store owner to add a second store');
  });

  it('should allow a store owner to remove a store', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    // store owner contract address -> store owner contract -> remove store
    const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
    const removeStoreTransaction = await storeOwnerContract.removeStore(storeTwoContractAddress, { from: accounts[2] });
    // try to get the removed store
    const result = await storeOwnerContract.stores.call(storeTwoContractAddress);
    // assert
    assert.equal(result, false, 'should allow a store owner to remove a store');
  });

  it('should not allow a normal user to add a new store', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    // store owner contract address -> store owner contract -> create a store *from accounts[3]*
    try {
      const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
      const addStoreTransaction = await storeOwnerContract.addStore({ from: accounts[3] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

  it('should not allow a normal user to remove an existing store', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    // store owner contract address -> store owner contract -> remove a store *from accounts[3]*
    try {
      const storeOwnerContract = await StoreOwner.at(storeOwnerContractAddress);
      const addStoreTransaction = await storeOwnerContract.removeStore(storeOneContractAddress, { from: accounts[3] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

});
