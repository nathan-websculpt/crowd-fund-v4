import { useState } from "react";
import { SignaturesSubTable } from "./SignaturesSubTable";
import { SingleProposal } from "./SingleProposal";

interface ProposalRowProps {
  fundRunId: number;
  proposalId: number;
  status: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
  signatures: [];
}

export const ProposalRow = (vp: ProposalRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <>
      <tr
        className={`text-sm ${vp.status == 0 ? "bg-secondary border-secondary" : ""}  ${
          vp.status == 1 ? "bg-accent border-accent" : ""
        } ${vp.status == 2 ? "bg-neutral border-neutral text-primary" : ""}`}
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
        <SingleProposal
          proposalId={vp.proposalId}
          fundRunId={vp.fundRunId}
          status={vp.status}
          amount={vp.amount}
          to={vp.to}
          proposedBy={vp.proposedBy}
          reason={vp.reason}
        />
      </tr>
      <tr className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={10}>
          <SignaturesSubTable signatures={vp.signatures} />
        </td>
      </tr>
    </>
  );
};
