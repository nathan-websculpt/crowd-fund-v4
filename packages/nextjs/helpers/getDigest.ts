/* eslint-disable prettier/prettier */
// gets digest for a multisig proposal (CreateProposal.tsx and SupportProposal.tsx)
import { encodeAbiParameters, encodePacked, keccak256 } from "viem";

// ethers _> viem
// arrayify becomes: toBytes
// abiCoder.encode becomes: encodeAbiParameters
// solidityPack becomes: encodePacked

const getDigest = async (nonce: bigint, amount: bigint, to: string, proposedBy: string, reason: string) => {
  console.log("getDigest amount: ", amount.toString());
  console.log("getDigest to: ", to);
  console.log("getDigest proposedBy: ", proposedBy);
  console.log("getDigest reason: ", reason);

  //TODO: get from 
  //     nextjs\generated\deployedcontracts.ts
  const abi_struct = [
    {
      //name: "staticStruct",
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "address",
              name: "proposedBy",
              type: "address",
            },
            {
              internalType: "string",
              name: "reason",
              type: "string",
            },
          ],
          internalType: "struct CrowdFund.MultiSigRequest",
          name: "_tx",
          type: "tuple",
        },
      ],
    },
  ];

  const encoded = encodeAbiParameters(abi_struct[0].inputs, [
    {
      amount: amount,
      to: to,
      proposedBy: proposedBy,
      reason: reason,
    },
  ]);

  const encodedWithNonce = encodePacked(["bytes", "uint256"], [encoded, nonce]);

  const digest = keccak256(encodedWithNonce);
  console.log("digest", digest);
  return digest;
};

export default getDigest;
