/* eslint-disable prettier/prettier */
import { useState } from "react";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface FinalizeProposalProps {
  fundRunId: number;
  proposalId: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
}

export const FinalizeProposal = (proposal: FinalizeProposalProps) => {
  const [nonceInput, setNonceInput] = useState<bigint>();
  const tx = { amount: proposal.amount, to: proposal.to, proposedBy: proposal.proposedBy, reason: proposal.reason };

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });

  const finishProposal = () => {
    const nonce = getNonce(fundRunNonce);
    setNonceInput(nonce);

    console.log("nonce: ", nonce);
    console.log("fund run id: ", proposal.fundRunId);
    console.log("proposal id: ", proposal.proposalId);
    console.log("amount: ", proposal.amount.toString());
    console.log("to: ", proposal.to);
    console.log("proposedBy: ", proposal.proposedBy);
    console.log("reason: ", proposal.reason);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "multisigWithdraw",
    args: [tx, nonceInput, proposal.fundRunId, proposal.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <td className="w-1/12 md:py-4">
        <button className="w-4/5 btn btn-primary" onClick={() => finishProposal()}>
          Ready (first)
        </button>
      </td>
      <td className="w-1/12 md:py-4">
        <button className="w-4/5 btn btn-primary" onClick={() => writeAsync()}>
          Finalize (second)
        </button>
      </td>
    </>
  );
};
