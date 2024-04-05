// Steps
// 1. Upload images at https://nft.storage/, and Prepare json files
    // Examples: 
    // art.json
    // {
    //     "name": "NFT Art",
    //     "description": "This image shows the true nature of NFT.",
    //     "image": "https://qn-shared.quicknode-ipfs.com/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg"
    // }

    // block.json
    // {
    //     "name": "Block Research Team",
    //     "description": "Block Logo NFT.",
    //     "image": "ipfs://bafybeias2csd3xokoyuknemxbpgj3qkpvfjijzgnxq3743rnkufs4ghnky"
    // }

    // Note that image url can be https or ipfs 
    // Freely create: https://stablediffusionweb.com/

// 2. Upload .json assets (e.g., art.json, block.json), and deployed the contract

// 3. Minted nft, The uri of json can be https or ipfs 
    // Examples:
    // nft art: 
	// https://bafkreifhcj3tfca3idb64gsmiftdxuszhwochhgcv25o6tk7g7vk7jgv5e.ipfs.nftstorage.link

    // block logo: 
    // ipfs://bafkreicdur3p5pm2teztzfubd6qfbthtbuwpf6twzvn44iqjkuykyrwcte

// 4. Copy deploy contract and nft id, import to MetaMask mobile app version
//  The NFT image does not show on MetaMask web version, but work on OpenSea and MetaMask mobile app,

// 5. Check at openSea testnet 
// NFT Art: https://testnets.opensea.io/collection/nft-4337

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("NFT", "NFT Token") Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}