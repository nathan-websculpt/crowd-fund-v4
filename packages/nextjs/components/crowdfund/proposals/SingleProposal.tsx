/* eslint-disable prettier/prettier */
import { formatEther } from "viem";

interface DisplayProposalProps {
  proposalId: bigint;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
}
export const SingleProposal = (proposal: DisplayProposalProps) => {
  return (
    <>
    <hr />
    <div className="mt-12 mb-12">
      <label className="text-sm font-bold underline">ID</label>
      <p className="text-md">{proposal.proposalId.toString()}</p>

      <label className="text-sm font-bold underline">Amount</label>
      <p className="text-md">{formatEther(proposal.amount)}</p>

      <label className="text-sm font-bold underline">To</label>
      <p className="text-md">{proposal.to}</p>

      <label className="text-sm font-bold underline">proposed By</label>
      <p className="text-md">{proposal.proposedBy}</p>

      <label className="text-sm font-bold underline">Reason</label>
      <p className="text-md">{proposal.reason}</p>
      </div>
    <hr />
    </>
  );
};
