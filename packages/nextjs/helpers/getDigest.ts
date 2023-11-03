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

  const encoded = encodeAbiParameters(
    //parseAbiParameters("uint256 amount, address to, address proposedBy, string reason"),
    [
      { name: "amount", type: "uint256" },
      { name: "to", type: "address" },
      { name: "proposedBy", type: "address" },
      { name: "reason", type: "string" },
    ],
    [amount, to, proposedBy, reason],
  );

  const encodedWithNonce = encodePacked(["bytes", "uint256"], [encoded, nonce]);

  const digest = keccak256(encodedWithNonce);
  console.log("digest", digest);
  return digest;
};

export default getDigest;
