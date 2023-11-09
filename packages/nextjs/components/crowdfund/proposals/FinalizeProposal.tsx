import { useEffect, useState } from "react";
import { formatEther } from "viem";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

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
      writeAsync();
    }
  }, [nonce]);

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "MultisigTransferCompleted",
    listener: logs => {
      logs.map(log => {
        const { fundRunId, proposalId, to, amount } = log.args;
        console.log(
          "📡 New Multisig-Transfer-Completed Event \nFund Run Id:",
          fundRunId,
          "Proposal Id: ",
          proposalId,
          "\nTo: ",
          to,
          "\nAmount: ",
          formatEther(amount),
        );
      });
    },
  });

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
    args: [proposal.fundRunId],
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
      <td className="w-1/12 text-center md:py-4">
        <div className="tooltip tooltip-primary tooltip-top" data-tip="Done co-signing? Send the transaction.">
          <button className="w-full btn" onClick={() => finishProposal()} disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Finalize</>}
          </button>
        </div>
      </td>
    </>
  );
};
