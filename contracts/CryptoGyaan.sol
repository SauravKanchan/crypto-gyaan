pragma solidity ^0.5.0;

import "./erc721.sol";

contract CryptoGyaan {
    using SafeMath for uint256;
    struct Order {
        uint256 token_id;
        address seller;
        address buyer;
        uint256 price;
        uint8 status;  // 1 is open; 2 is placed and 3 is canceled
    }


    MyERC721 public erc721;
    Order[] public total_order;

    mapping(address => Order[]) public balances;


    constructor (address _gyann_contract) public{
        erc721 = MyERC721(_gyann_contract);
    }


    event PlaceOrder(
        uint256 indexed _token_id,
        address indexed seller,
        uint256 price
    );

    event Buy(
        address buyer,
        uint256 order_id
    );

    function place_order(uint256 _token_id, uint256 _price) public returns (bool) {
        erc721.transferFrom(msg.sender, address(this), _token_id);
        require(erc721.ownerOf(_token_id) == address(this), "Token not deposited");
        Order memory order = Order(_token_id, msg.sender, address(0), _price, 1);
        total_order.push(order);
        balances[msg.sender].push(order);
        emit PlaceOrder(_token_id, msg.sender, _price);
        return true;
    }

    function buy_order(uint256 _order_id) public payable returns (bool){
        Order storage order = total_order[_order_id];
        require(order.status == 1, "Order already sold");
        require(msg.value == order.price, "Ether price does not match");
        erc721.transferFrom(address(this), msg.sender, order.token_id);
        require(erc721.ownerOf(order.token_id) == msg.sender, "Token transfered to buyer failed");
        order.status = 2;
        order.buyer = msg.sender;
        emit Buy(msg.sender, _order_id);
        return true;
    }

    function cancel_order(uint256 _order_id) public returns (bool){
        Order storage order = total_order[_order_id];
        require(msg.sender == order.seller, "Check for owner");
        require(order.status == 1, "It should be unsold");
        order.status = 3;
        erc721.transferFrom(address(this), msg.sender, order.token_id);
        require(erc721.ownerOf(order.token_id) == msg.sender, "Token transfered to buyer failed");
        emit Buy(msg.sender, _order_id);
        return true;
    }
}