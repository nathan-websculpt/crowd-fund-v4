import { useState } from "react";
import { ProposalsSubTable } from "./ProposalsSubTable";
import { formatEther } from "viem";
import { FundRunStatus } from "~~/components/crowdfund/FundRunStatus";
import { TProposal } from "~~/helpers/getTypes";

interface FundRunRowProps {
  id: string;
  status: number;
  fundRunId: number;
  owners: string[];
  title: string;
  description: string;
  target: bigint;
  donated: bigint;
  withdrawn: bigint;
  proposals: TProposal[];
}

export const FundRunRow = (fr: FundRunRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <>
      <tr>
        {fr?.owners?.length == 1 ? (
          <td></td>
        ) : (
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
        )}

        <td>
          <FundRunStatus status={fr?.status} />
        </td>
        <td className="text-center">{fr?.fundRunId.toString()}</td>
        <td>{fr?.title}</td>
        <td>{fr?.description}</td>
        <td className="text-center">{formatEther(fr?.target)}</td>
        <td className="text-center">{formatEther(fr?.donated)}</td>
        <td className="text-center">{formatEther(fr?.withdrawn)}</td>
      </tr>
      <tr className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={8}>
          <ProposalsSubTable proposals={fr?.proposals} />
        </td>
      </tr>
    </>
  );
};
