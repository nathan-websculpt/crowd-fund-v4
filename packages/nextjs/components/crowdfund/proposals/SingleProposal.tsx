/* eslint-disable prettier/prettier */
import { FinalizeProposal } from "./FinalizeProposal";
import { RevokeProposal } from "./RevokeProposal";
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
      <td className="w-1/12 md:py-4">{proposal.proposalId.toString()}</td>
      <td className="w-1/12 md:py-4">{formatEther(proposal.amount)}</td>
      <td className="w-1/12 md:py-4">{proposal.to}</td>
      <td className="w-1/12 md:py-4">{proposal.proposedBy}</td>
      <td className="w-1/12 md:py-4">{proposal.reason}</td>
      
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

      <RevokeProposal fundRunId={proposal.fundRunId} proposalId={proposal.proposalId} />
      
    </>
  );
};
