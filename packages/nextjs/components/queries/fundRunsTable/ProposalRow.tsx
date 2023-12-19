//IF THIS DOESN'T END UP CHANGING, IT CAN BE DELETED BECAUSE /proposals/ProposalRow.tsx is the same
import { useState } from "react";
import { SignaturesSubTable } from "./SignaturesSubTable";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { TSignature } from "~~/helpers/getTypes";

interface ProposalsRowProps {
  id: string;
  proposalId: number;
  status: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
  signatures: TSignature[];
}

export const ProposalRow = (thisProposal: ProposalsRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);
  return (
    <>
      <tr key={thisProposal?.id}>
        <td className="cursor-pointer" onClick={() => setRowOpen(!rowOpen)}>
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
        <td className="text-center">
          {thisProposal?.status === 0 && <>😄</>}
          {thisProposal?.status === 1 && <>🤝</>}
          {thisProposal?.status === 2 && <>✅</>}
        </td>
        <td className="text-center">{thisProposal?.proposalId.toString()}</td>
        <td className="text-center">{formatEther(thisProposal?.amount)}</td>
        <td>
          <Address address={thisProposal?.to} size="sm" />
        </td>
        <td>
          <Address address={thisProposal?.proposedBy} size="sm" />
        </td>
        <td>{thisProposal?.reason}</td>
      </tr>
      <tr key={thisProposal?.id + thisProposal?.id} className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={7}>
          <SignaturesSubTable signatures={thisProposal?.signatures} />
        </td>
      </tr>
    </>
  );
};
