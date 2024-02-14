const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        CrowdFund: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "commentId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "postId",
                  type: "bytes",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "commentText",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "commenter",
                  type: "address",
                },
              ],
              name: "Comment",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "ContractOwnerWithdrawal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Donation",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "Follow",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
              ],
              name: "FundRun",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "netWithdrawAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "grossWithdrawAmount",
                  type: "uint256",
                },
              ],
              name: "MultisigTransfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "reason",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "enum MultisigManager.ProposalStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "signaturesRequired",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "signaturesCount",
                  type: "uint16",
                },
              ],
              name: "Proposal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
              ],
              name: "ProposalRevoke",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "signer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "ProposalSignature",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "postText",
                  type: "string",
                },
              ],
              name: "SocialPost",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "postText",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "enum SocialPostManager.SocialProposalStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "signaturesRequired",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "signaturesCount",
                  type: "uint16",
                },
              ],
              name: "SocialProposal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
              ],
              name: "SocialProposalRevoke",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "signer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "SocialProposalSignature",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "Unfollow",
              type: "event",
            },
            {
              inputs: [],
              name: "MSG_PREFIX",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "contractOwnerWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_postId",
                  type: "bytes",
                },
                {
                  internalType: "string",
                  name: "_commentText",
                  type: "string",
                },
              ],
              name: "createComment",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "address[]",
                  name: "_owners",
                  type: "address[]",
                },
              ],
              name: "createFundRun",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
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
                  internalType: "struct CrowdFundLibrary.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
              ],
              name: "createMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
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
              name: "createSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "donateToFundRun",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "donorLogs",
              outputs: [
                {
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
                {
                  internalType: "bytes[]",
                  name: "_signaturesList",
                  type: "bytes[]",
                },
              ],
              name: "finalizeAndPost",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
              ],
              name: "follow",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fundRunOwners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "fundRunValues",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getSocialManagementNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                  internalType: "struct CrowdFundLibrary.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
                {
                  internalType: "bytes[]",
                  name: "_signaturesList",
                  type: "bytes[]",
                },
              ],
              name: "multisigWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfComments",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfFundRuns",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfMultisigProposals",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfSocialProposals",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "proposalCreators",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "proposalSigners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "proposalStatuses",
              outputs: [
                {
                  internalType: "enum MultisigManager.ProposalStatus",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "revokeMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
              ],
              name: "revokeSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialManagementNonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialProposalCreators",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "socialProposalSigners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialProposalStatuses",
              outputs: [
                {
                  internalType: "enum SocialPostManager.SocialProposalStatus",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "supportMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
              ],
              name: "supportSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalProfitsTaken",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
              ],
              name: "unfollow",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "vaultNonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        CrowdFund: {
          address: "0x821001b6Bcf64d65C4258219B5559725Ca095bf6",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "ContractOwnerWithdrawal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Donation",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
              ],
              name: "FundRun",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "netWithdrawAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "grossWithdrawAmount",
                  type: "uint256",
                },
              ],
              name: "MultisigTransfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "reason",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "enum MultisigManager.ProposalStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "signaturesRequired",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "signaturesCount",
                  type: "uint16",
                },
              ],
              name: "Proposal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
              ],
              name: "ProposalRevoke",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "signer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "ProposalSignature",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "postText",
                  type: "string",
                },
              ],
              name: "SocialPost",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "postText",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "enum CrowdFund.SocialProposalStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "signaturesRequired",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "signaturesCount",
                  type: "uint16",
                },
              ],
              name: "SocialProposal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
              ],
              name: "SocialProposalRevoke",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "socialProposalId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "signer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "SocialProposalSignature",
              type: "event",
            },
            {
              inputs: [],
              name: "MSG_PREFIX",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "contractOwnerWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "address[]",
                  name: "_owners",
                  type: "address[]",
                },
              ],
              name: "createFundRun",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
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
                  internalType: "struct CrowdFundLibrary.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
              ],
              name: "createMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
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
              name: "createSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "donateToFundRun",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "donorLogs",
              outputs: [
                {
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
                {
                  internalType: "bytes[]",
                  name: "_signaturesList",
                  type: "bytes[]",
                },
              ],
              name: "finalizeAndPost",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fundRunOwners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "fundRunValues",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getSocialManagementNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                  internalType: "struct CrowdFundLibrary.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
                {
                  internalType: "bytes[]",
                  name: "_signaturesList",
                  type: "bytes[]",
                },
              ],
              name: "multisigWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfFundRuns",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfMultisigProposals",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfSocialProposals",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "proposalCreators",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "proposalSigners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "proposalStatuses",
              outputs: [
                {
                  internalType: "enum MultisigManager.ProposalStatus",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "revokeMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
              ],
              name: "revokeSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialManagementNonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialProposalCreators",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "socialProposalSigners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "socialProposalStatuses",
              outputs: [
                {
                  internalType: "enum CrowdFund.SocialProposalStatus",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "supportMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_socialProposalId",
                  type: "uint16",
                },
              ],
              name: "supportSocialProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalProfitsTaken",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              name: "vaultNonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
