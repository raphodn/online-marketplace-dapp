App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if(typeof web3 !== 'undefined'){
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http:// localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('OnlineMarketplace.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var OnlineMarketplaceArtifact = data
      App.contracts.OnlineMarketplace = TruffleContract(OnlineMarketplaceArtifact);
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider)
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted()
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance){
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters){
      for(i = 0; i < adopters.length; i++) {
        if(adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message)
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptInstance;

    web3.eth.getAccounts(function(error, accounts){
      if(error){
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance){
        adoptInstance = instance;

        // Executes adopt as a transaction by sending accounts
        return adoptInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});