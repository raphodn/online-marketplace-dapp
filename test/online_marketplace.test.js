var OnlineMarketplace = artifacts.require('OnlineMarketplace');

contract('OnlineMarketplace', function(accounts) {

  it('should set the owner as administrator', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    const result = await onlineMarketplace.administrators.call(accounts[0]);
    assert.equal(result, true, 'should set the owner as administrator');
  });

  it('should allow an administrator to add a new administrator', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    await onlineMarketplace.addAdministrator(accounts[1], { from: accounts[0] });
    const result = await onlineMarketplace.administrators.call(accounts[1]);
    assert.equal(result, true, 'should allow an administrator to add a new administrator');
  });

  it('should allow an administrator to add a new store owner', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    await onlineMarketplace.addStoreOwner(accounts[2], { from: accounts[0] });
    const result = await onlineMarketplace.storeOwners.call(accounts[2]);
    assert.equal(result, true, 'should allow an administrator to add a new store owner');
  });

  it('should not allow a store owner to add an administrator', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    try {
      await onlineMarketplace.addAdministrator(accounts[3], { from: accounts[2] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

  it('should not allow a store owner to add a new store owner', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    try {
      await onlineMarketplace.addStoreOwner(accounts[3], { from: accounts[2] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

  it('should not allow a normal user to add an administrator', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    try {
      await onlineMarketplace.addAdministrator(accounts[5], { from: accounts[2] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

  it('should not allow a normal user to add a new store owner', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    try {
      const result = await onlineMarketplace.addStoreOwner(accounts[5], { from: accounts[2] });
    }
    catch(error) {
      assert(error, 'Expected an error but did not get one');
    }
  });

  it('should allow an administrator to remove an existing store owner', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    await onlineMarketplace.removeStoreOwner(accounts[2], { from: accounts[0] });
    const result = await onlineMarketplace.storeOwners.call(accounts[2]);
    assert.equal(result, false, 'should allow an administrator to remove an existing store owner');
  });

  it('should allow an administrator to remove an existing administrator', async() => {
    const onlineMarketplace = await OnlineMarketplace.deployed();
    await onlineMarketplace.removeAdministrator(accounts[1], { from: accounts[0] });
    const result = await onlineMarketplace.administrators.call(accounts[1]);
    assert.equal(result, false, 'should allow an administrator to remove an existing administrator');
  });

});
