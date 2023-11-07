/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
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
  const [nonce, setNonce] = useState<bigint>();
  const tx = { amount: proposal.amount, to: proposal.to, proposedBy: proposal.proposedBy, reason: proposal.reason };

  useEffect(() => {
    if (nonce !== undefined) {
      console.log("FINALIZING");
      writeAsync();
    }
  }, [nonce]);

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });

  const finishProposal = () => {
    const nonce = getNonce(fundRunNonce);
    setNonce(nonce);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "multisigWithdraw",
    args: [tx, nonce, proposal.fundRunId, proposal.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <td className="w-1/12 md:py-4 text-center">
        <div className="tooltip tooltip-primary tooltip-top" data-tip="Done co-signing? Send the transaction.">
          <button className="w-full btn" onClick={() => finishProposal()}>
            Finalize
          </button>
        </div>
      </td>
    </>
  );
};
