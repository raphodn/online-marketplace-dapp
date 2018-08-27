/**
 * Prerequisites: `npm install -E zeppelin-solidity`
 */

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract BasicToken is Ownable {
  function() public payable {
  }

  function withdraw(uint amount) public {
    if (amount <= this.balance) {
      msg.sender.transfer(amount);
    }
  }

  function destroy()
  onlyOwner {
    selfdestruct(owner);
  }

  function destroyAndSend(address _recipient)
  onlyOwner {
    selfdestruct(_recipient);
  }
}
