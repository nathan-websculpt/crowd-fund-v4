import { ForceEndBtn } from "./ForceEndBtn";
import { FundRunStatus } from "./FundRunStatus";
import { UpdateFundRunStatus } from "./UpdateFundRunStatus";
import { formatEther } from "viem";

interface FundRunDisplayProps {
  id: number;
  title: string;
  description: string;
  target: bigint;
  deadline: string;
  amountCollected: bigint;
  amountWithdrawn: bigint;
  status: number;
}

export const FundRunDisplay = (fundRun: FundRunDisplayProps) => {
  return (
    <>
      <div className="flex justify-between">
        <FundRunStatus status={fundRun.status} />
        <UpdateFundRunStatus fundRunId={fundRun.id} />

        <ForceEndBtn fundRunId={fundRun.id} />
        {/* ^^^ TODO: PRODTODO:: remove this and the component  */}
      </div>

      <label className="text-lg font-bold underline">Title</label>
      <p className="mt-0 mb-1 text-xl">{fundRun.title}</p>

      <label className="text-lg font-bold underline">Description</label>
      <p className="mt-0 mb-1 text-xl">{fundRun.description}</p>

      <div className="justify-between mt-5 lg:mt-0 lg:px-4 lg:flex">
        <div className="flex flex-col">
          <label className="text-lg font-bold underline">Money Target</label>
          <p className="mt-0 mb-1 text-xl break-all">{formatEther(fundRun.target)}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold underline">Ether Donated</label>
          <p className="mt-0 mb-1 text-xl break-all">{formatEther(fundRun.amountCollected)}</p>
        </div>
      </div>

      <div className="justify-between lg:px-4 lg:flex">
        <div className="flex flex-col">
          <label className="text-lg font-bold underline">Ether Withdrawn</label>
          <p className="mt-0 mb-1 text-xl break-all">{formatEther(fundRun.amountWithdrawn)}</p>
        </div>
      </div>
    </>
  );
};
