import { useState } from "react";
import { ProposalsSubTable } from "./ProposalsSubTable";
import { formatEther } from "viem";

interface FundRunRowProps {
  status: number;
  fundRunId: number;
  title: string;
  description: string;
  target: bigint;
  donated: bigint;
  withdrawn: bigint;
  proposals: [];
}

export const FundRunRow = (fr: FundRunRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <>
      <tr
        className={`text-sm ${fr.status == 0 ? "bg-secondary border-secondary" : ""}  ${
          fr.status == 1 ? "bg-accent border-accent" : ""
        } ${fr.status == 2 ? "bg-neutral border-neutral text-primary" : ""}`}
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

        <td className="w-1/12 md:py-4">
          {fr.status === 0 && <>😄</>}
          {fr.status === 1 && <>🤝</>}
          {fr.status === 2 && <>✅</>}
        </td>

        <td className="w-1/12 md:py-4">{fr.fundRunId.toString()}</td>
        <td className="w-1/12 md:py-4">{fr.title}</td>
        <td className="w-1/12 md:py-4">{fr.description}</td>
        <td className="w-1/12 md:py-4">{formatEther(fr.target)}</td>
        <td className="w-1/12 md:py-4">{formatEther(fr.donated)}</td>
        <td className="w-1/12 md:py-4">{formatEther(fr.withdrawn)}</td>
      </tr>
      <tr className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={8}>
          <ProposalsSubTable proposals={fr.proposals} />
        </td>
      </tr>
    </>
  );
};
