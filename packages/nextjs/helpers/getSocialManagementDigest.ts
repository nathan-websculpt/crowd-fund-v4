// gets digest for a social post proposal
import { encodeAbiParameters, encodePacked, keccak256 } from "viem";

const getSocialManagementDigest = async (nonce: bigint, postText: string, proposedBy: string) => {
  const abi_struct = [
    {
      inputs: [
        {
          components: [
            {
              internalType: "string",
              name: "postText",
              type: "string",
            },
            {
              internalType: "address",
              name: "proposedBy",
              type: "address",
            },
          ],
          internalType: "struct CrowdFundLibrary.SocialMediaRequest",
          name: "_tx",
          type: "tuple",
        },
      ],
    },
  ];

  const encoded = encodeAbiParameters(abi_struct[0].inputs, [
    {
      postText: postText,
      proposedBy: proposedBy,
    },
  ]);
  const encodedWithNonce = encodePacked(["bytes", "uint256"], [encoded, nonce]);
  const digest = keccak256(encodedWithNonce);
  return digest;
};

export default getSocialManagementDigest;
