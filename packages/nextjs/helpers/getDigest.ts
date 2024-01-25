// gets digest for a multisig proposal (CreateProposal.tsx and SupportProposal.tsx)
import { encodeAbiParameters, encodePacked, keccak256 } from "viem";

const getDigest = async (nonce: bigint, amount: bigint, to: string, proposedBy: string, reason: string) => {
  console.log("getDigest amount: ", amount.toString());
  console.log("getDigest to: ", to);
  console.log("getDigest proposedBy: ", proposedBy);

  //TODO: get from
  //     nextjs\generated\deployedcontracts.ts
  // ... not sure where this abi snippet should come from?
  // ... the only way this worked was this way (wasn't needed when using Ethers)
  const abi_struct = [
    {
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
          internalType: "struct CrowdFund.MultiSigRequest", //TODO: update
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
  return digest;
};

export default getDigest;
