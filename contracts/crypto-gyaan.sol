pragma solidity ^0.5.0;

import "./erc721.sol";

contract CryptoGyaan{
    using SafeMath for uint256;
    MyERC721 public erc721;
    mapping(address => uint256[]) balances;

    constructor (address _gyann_contract) public{
        erc721 = MyERC721(_gyann_contract);
    }

    struct Order{
        string _token_id;
        address seller;
    }

    function deposit(uint256 _token_id) public returns (bool) {
        erc721.transferFrom(msg.sender, address(this), _token_id);
        require(erc721.ownerOf(_token_id)==address(this), "Token not deposited");
        balances[msg.sender].push(_token_id);
        return true;
    }

}