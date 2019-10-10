pragma solidity ^0.5.0;

import "./openzepplin/token/ERC721/ERC721Full.sol";

contract MyERC721 is ERC721Full {

    constructor (string memory _name, string memory _symbol) public
    ERC721Full(_name, _symbol)
    {
    }

    function mintUniqueTokenTo(
        address _to,
        string  memory _tokenURI
    ) public
    {
        uint256 _tokenId = super.totalSupply();
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _tokenURI);
    }
}