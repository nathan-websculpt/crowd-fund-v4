import { FinalizeSocialProposal } from "./FinalizeSocialProposal";
import { RevokeSocialProposal } from "./RevokeSocialProposal";
import { SupportSocialProposal } from "./SupportSocialProposal";
import { Address } from "~~/components/scaffold-eth";

interface DisplaySocialProposalProps {
  fundRunId: number;
  socialProposalId: number;
  status: number;
  proposedBy: string;
  postText: string;
}
export const SingleSocialProposal = (sp: DisplaySocialProposalProps) => {
  return (
    <>
      <td className="w-1/12 md:py-4">
        {sp.status === 0 && <>😄</>}
        {sp.status === 1 && <>🤝</>}
        {sp.status === 2 && <>✅</>}
      </td>

      <td className="w-1/12 md:py-4">{sp.socialProposalId.toString()}</td>
      <td className="w-1/12 md:py-4">
        <Address address={sp?.proposedBy} size="sm" />
      </td>
      <td className="w-1/12 md:py-4">{sp.postText}</td>
      {sp.status === 0 ? (
        <SupportSocialProposal
          fundRunId={sp.fundRunId}
          socialProposalId={sp.socialProposalId}
          proposedBy={sp.proposedBy}
          postText={sp.postText}
        />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
      {sp.status === 1 ? (
        <FinalizeSocialProposal
          fundRunId={sp.fundRunId}
          socialProposalId={sp.socialProposalId}
          proposedBy={sp.proposedBy}
          postText={sp.postText}
        />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
      {sp.status !== 2 ? (
        <RevokeSocialProposal fundRunId={sp.fundRunId} socialProposalId={sp.socialProposalId} />
      ) : (
        <td className="w-1/12 md:py-4"></td>
      )}
    </>
  );
};
