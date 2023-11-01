/* eslint-disable prettier/prettier */
import { useState } from "react";
// todo: full migration to viem?
import { SignMessageReturnType, toBytes, encodePacked, keccak256, encodeAbiParameters, parseAbiParameters } from "viem";
import { useWalletClient } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface SupportProposalProps {
  id: number; //fundrun //todo:
  proposalId: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
}

export const SupportProposal = (proposal: SupportProposalProps) => {
  const [supportSignature, setSupportSignature] = useState<SignMessageReturnType>();

  const { data: walletClient } = useWalletClient();

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "ProposalSupported",
    listener: logs => {
      logs.map(log => {
        const { supportedBy, fundRunId, proposalId } = log.args;
        console.log(
          "📡 New Proposal Supported Event \nSupported By:",
          supportedBy,
          "Fund Run Id: ",
          fundRunId,
          "\nProposal Id: ",
          proposalId,
        );
      });
    },
  });

  //todo: refactor A:1
  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });
  const getNewNonce = () => {
    return fundRunNonce !== undefined ? fundRunNonce + 1n : 0n;
  }; //todo: refactor
  const getDigest = async (nonce: bigint) => {

    console.log("getDigest amount: ", proposal.amount.toString());
    console.log("getDigest to: ", proposal.to);
    console.log("getDigest proposedBy: ", proposal.proposedBy);
    console.log("getDigest reason: ", proposal.reason);

    const encoded = encodeAbiParameters(
      parseAbiParameters("uint256 amount, address to, address proposedBy, string reason"),
      [proposal.amount, proposal.to, proposal.proposedBy, proposal.reason],
    );
    const encodedWithNonce = encodePacked(["bytes", "uint256"], [encoded, nonce]);

    const digest = keccak256(encodedWithNonce);
    return digest;
  }; //todo: refactor A:1

  const supportProposal = async () => {
    const nonce = getNewNonce(); //TODO: get from the proposal and To Address
    const digest = await getDigest(nonce);
    console.log("nonce: ", nonce);
    console.log("digest", digest);
    console.log("wallet client", walletClient?.account);
    console.log("digest, made w/ wallet client", walletClient?.account);

    const proposalSupportSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    console.log(proposalSupportSig);

    setSupportSignature(proposalSupportSig);
  };
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "supportMultisigProposal",
    args: [supportSignature, proposal?.id, proposal?.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="mt-12">
        <h1>SUPPORT THIS PROPOSAL (SupportProposal.tsx)</h1>

        <button className="w-10/12 mx-auto mt-5 md:w-3/5 btn btn-primary" onClick={() => supportProposal()}>
          {/* Create a Proposal */}
          First Click
        </button>
        <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary mt-9" onClick={() => writeAsync()}>
          Second Click
        </button>
      </div>
    </>
  );
};
