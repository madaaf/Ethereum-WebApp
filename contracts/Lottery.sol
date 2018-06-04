pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;

    function Lottery() public {
       manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
       players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }


    function pickWinner() public isManager{
        uint index = random() % players.length;
        address winnerAdd = players[index];
        winnerAdd.transfer(this.balance); // send all the money to winnerAdd
        players = new address[](0);
    }

    modifier isManager() {
        require(msg.sender == manager);
        _;
    }

    function getPlayer() public view returns(address[]){
        return players;
    }

}
