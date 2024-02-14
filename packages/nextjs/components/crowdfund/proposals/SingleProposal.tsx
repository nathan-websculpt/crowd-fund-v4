import { FinalizeProposal } from "./FinalizeProposal";
import { RevokeProposal } from "./RevokeProposal";
import { SupportProposal } from "./SupportProposal";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface DisplayProposalProps {
  fundRunId: number;
  proposalId: number;
  status: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
}
export const SingleProposal = (proposal: DisplayProposalProps) => {
  return (
    <>
      <td className="w-1/12 md:py-4">
        {proposal.status === 0 && <>😄</>}
        {proposal.status === 1 && <>🤝</>}
        {proposal.status === 2 && <>✅</>}
      </td>

      <td className="w-1/12 md:py-4">{proposal.proposalId.toString()}</td>
      <td className="w-1/12 md:py-4">{formatEther(proposal.amount)}</td>
      <td className="w-1/12 md:py-4">
        <Address address={proposal?.to} size="sm" />
      </td>
      <td className="w-1/12 md:py-4">
        <Address address={proposal?.proposedBy} size="sm" />
      </td>
      <td className="w-1/12 md:py-4">{proposal.reason}</td>
      {proposal.status === 0 ? (
        <SupportProposal
          fundRunId={proposal.fundRunId}
          proposalId={proposal.proposalId}
          amount={proposal.amount}
          to={proposal.to}
          proposedBy={proposal.proposedBy}
          reason={proposal.reason}
        />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
      {proposal.status === 1 ? (
        <FinalizeProposal
          fundRunId={proposal.fundRunId}
          proposalId={proposal.proposalId}
          amount={proposal.amount}
          to={proposal.to}
          proposedBy={proposal.proposedBy}
          reason={proposal.reason}
        />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
      {proposal.status !== 2 ? (
        <RevokeProposal fundRunId={proposal.fundRunId} proposalId={proposal.proposalId} />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
    </>
  );
};
