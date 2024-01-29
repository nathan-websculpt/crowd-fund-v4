import { useState } from "react";
import { SingleSocialProposal } from "./SingleSocialProposal";
import { SocialSignaturesSubTable } from "./SocialSignaturesSubTable";
import { TSignature } from "~~/helpers/getTypes";

interface SocialProposalRowProps {
  fundRunId: number;
  socialProposalId: number;
  status: number;
  proposedBy: string;
  postText: string;
  signatures: TSignature[];
}

export const SocialProposalRow = (sp: SocialProposalRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <>
      <tr
        className={`text-sm ${sp.status == 0 ? "bg-secondary border-secondary" : ""}  ${
          sp.status == 1 ? "bg-accent border-accent" : ""
        } ${sp.status == 2 ? "bg-neutral border-neutral text-primary" : ""}`}
      >
        <td className="w-1/12 cursor-pointer md:py-4" onClick={() => setRowOpen(!rowOpen)}>
          <svg
            className={`w-6 h-6 z-40  ${rowOpen ? "rotate-90" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 7l6 5-6 5V7z" fill="#ffffff" />
          </svg>
        </td>
        <SingleSocialProposal
          socialProposalId={sp.socialProposalId}
          fundRunId={sp.fundRunId}
          status={sp.status}
          proposedBy={sp.proposedBy}
          postText={sp.postText}
        />
      </tr>
      <tr className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={8}>
          <SocialSignaturesSubTable signatures={sp.signatures} />
        </td>
      </tr>
    </>
  );
};
