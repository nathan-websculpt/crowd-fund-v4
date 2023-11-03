/* eslint-disable prettier/prettier */
import { useState } from "react";
import { SignMessageReturnType, toBytes } from "viem";
import { useWalletClient } from "wagmi";
import getDigest from "~~/helpers/getDigest";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

// ethers _> viem
// arrayify becomes: toBytes

interface SupportProposalProps {
  fundRunId: number;
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

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });

  const supportProposal = async () => {
    const nonce = getNonce(fundRunNonce);
    console.log("nonce: ", nonce);
    const digest = await getDigest(nonce, proposal.amount, proposal.to, proposal.proposedBy, proposal.reason);

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
    args: [supportSignature, proposal?.fundRunId, proposal?.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <td className="w-1/12 md:py-4">
        <button className="w-4/5 btn btn-primary" onClick={() => supportProposal()}>
          Co-Sign (first)
        </button>
      </td>
      <td className="w-1/12 md:py-4">
        <button className="w-4/5 btn btn-primary" onClick={() => writeAsync()}>
          Support (second)
        </button>
      </td>
    </>
  );
};
