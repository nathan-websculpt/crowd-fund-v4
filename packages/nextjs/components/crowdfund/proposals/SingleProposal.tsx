/* eslint-disable prettier/prettier */
import { FinalizeProposal } from "./FinalizeProposal";
import { SupportProposal } from "./SupportProposal";
import { formatEther } from "viem";

interface DisplayProposalProps {
  fundRunId: number;
  proposalId: number;
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

        <SupportProposal
          fundRunId={proposal.fundRunId}
          proposalId={proposal.proposalId}
          amount={proposal.amount}
          to={proposal.to}
          proposedBy={proposal.proposedBy}
          reason={proposal.reason}
        />

        <FinalizeProposal
          fundRunId={proposal.fundRunId}
          proposalId={proposal.proposalId}
          amount={proposal.amount}
          to={proposal.to}
          proposedBy={proposal.proposedBy}
          reason={proposal.reason}
        />
      </div>
      <hr />
    </>
  );
};
