// get digest for a multisig proposal (CreateProposal.tsx and SupportProposal.tsx)
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

  //sounds great, doesn't work.
  // const encoded = encodeAbiParameters(
  //   //parseAbiParameters("uint256 amount, address to, address proposedBy, string reason"),
  //   [
  //     { name: "amount", type: "uint256" },
  //     { name: "to", type: "address" },
  //     { name: "proposedBy", type: "address" },
  //     { name: "reason", type: "string" },
  //   ],
  //   //[amount, to, proposedBy, reason],
  //   [
  //     100000000000000000n,
  //     "0xcE62856Bc18E3d0f202e0f13C0B178026B94626F",
  //     "0x24C54f3255C7904e9cE835C055618b0C02650b89",
  //     "test proposal",
  //   ],
  // );
  //NOTE: DIDN'T WORK THIS WAY^^^^


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
      amount: 100000000000000000n,
      to: "0xcE62856Bc18E3d0f202e0f13C0B178026B94626F",
      proposedBy: "0x24C54f3255C7904e9cE835C055618b0C02650b89",
      reason: "test proposal",
    },
  ]);

  const encodedWithNonce = encodePacked(["bytes", "uint256"], [encoded, nonce]);

  const digest = keccak256(encodedWithNonce);
  console.log("digest", digest);
  return digest;
};

export default getDigest;
