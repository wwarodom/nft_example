"use client"

import Image from "next/image";
import Link from "next/link";
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Soucrecode5_4ABI from '../contract/abi/SourceCode5_4.json';

// Your NFT contract address 
const contractList = [
  '0xf7425b2B461DAd74aaD48B7954f0363580170a87',
  '0x2d657a2a4ff5dfb611e445a1447b86dc4439845e',
]

// Example code to get NFTs
const getNFTs = async (contractAddress: string) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const contract = new ethers.Contract(contractAddress, Soucrecode5_4ABI, provider);

  // Example code to retrieve NFTs
  const tokenId = 0;
  const owner = await contract.ownerOf(tokenId);
  console.log("Owner of NFT:", owner);

  // Get token URI
  const tokenURI = await contract.tokenURI(tokenId);
  console.log("Token URI:", tokenURI);

  // Get Image URI
  let jsonURL;
  if (tokenURI.includes('ipfs://'))
    jsonURL = `https://gateway.pinata.cloud/ipfs/${tokenURI.slice(7)}`;
  else
    jsonURL = tokenURI; // URI is already 'https://', no need to slice

  const res = await fetch(jsonURL);
  const { name, image, description } = await res.json();
  console.log(`${name} ${image} ${description} `);

  let imageURL;
  if (image.includes('ipfs://'))
    imageURL = `https://gateway.pinata.cloud/ipfs/${image.slice(7)}`;
  else
    imageURL = image

  // const imageURL = `https://gateway.pinata.cloud/ipfs/${image.slice(7)}`;
  console.log("Image URL", imageURL);
  return { tokenId, owner, name, description, image: imageURL };
};


const NFTComponent = ({ nftData, setNFTData }: any) => {
  const [contract, setContract] = useState(contractList[0]);
  console.log("Contract: ", contract)

  return (
    <div className="m-4">

      NFT contract:
      <select
        className="border-black border-2 ml-2 mb-4"
        value={contract}
        onChange={(e) => {
          setContract(e.target.value);
          getNFTs(e.target.value).then((data: any) => setNFTData(data));
        }}
      >
        {
          contractList.map((item: string, index: number) => (
            <option value={item} key={index}>{item}</option>
          ))
        }
      </select>

      <p>Token ID: {nftData.tokenId}</p>
      <p>Owner: {nftData.owner}</p>
      <p>Name: {nftData.name}</p>
      <p>Description: {nftData.description}</p>
      <div>
        Sepolia: <Link
          className="text-blue-800"
          href={`https://testnets.opensea.io/${nftData.owner}`}>
          https://testnets.opensea.io/{nftData.owner}
       </Link>
      </div>
      <br />
      <hr />
      <p>Image:
        <Image src={nftData.image}
          width={220}
          height={220}
          alt="NFT asset"
          priority={true} />
      </p>
    </div>
  );
};

export default function Home() {
  const [nftData, setNFTData] = useState();

  useEffect(() => {
    // Call getNFTs function to retrieve NFT data
    getNFTs(contractList[0]).then((data: any) => setNFTData(data));
  }, []);

  return (
    <div className="w-[60%] m-auto mt-16">
      <h1 className="text-xl font-bold m-4">My NFT dApp</h1>
      {nftData && <NFTComponent nftData={nftData} setNFTData={setNFTData} />}
    </div>
  );
}