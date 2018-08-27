var Owned = artifacts.require("./Owned.sol");
var OnlineMarketplace = artifacts.require("./OnlineMarketplace.sol");
var StoreOwner = artifacts.require("./StoreOwner.sol");
var Store = artifacts.require("./Store.sol");

module.exports = function(deployer) {
  deployer.deploy(Owned);
  deployer.deploy(OnlineMarketplace);
  deployer.deploy(StoreOwner);
  deployer.deploy(Store);
};
