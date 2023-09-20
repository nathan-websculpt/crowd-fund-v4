import { formatEther } from "viem";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

interface DisplayFundRunProps {
  title: string;
  description: string;
  target: bigint;
  deadline: string;
  amountCollected: bigint;
  amountWithdrawn: bigint;
  isActive: boolean;
}

export const FundRun = (fund: DisplayFundRunProps) => {
  return (
    <>
      {/* TODO: add ID and Address to top of the Fund Run */}
      <label className="text-sm font-bold underline">Title</label>
      <p className="text-md">{fund.title}</p>

      <label className="text-sm font-bold underline">Description</label>
      <p className="text-md">{fund.description}</p>

      <div className="justify-between lg:px-2 lg:flex lg:flex-row">
        <div className="flex flex-col lg:p-2">
          <label className="text-sm font-bold underline">Money Target</label>
          <p className="break-all text-md">{formatEther(fund.target)}</p>
        </div>

        <div className="flex flex-col mt-4 lg:p-2 lg:mt-0">
          <label className="text-sm font-bold underline">Ether Donated</label>
          <p className="break-all text-md">{formatEther(fund.amountCollected)}</p>
        </div>
      </div>

      <div className="justify-between lg:px-2 lg:flex lg:flex-row">
        <div className="flex flex-col lg:p-2">
          <label className="text-sm font-bold underline">Ether Withdrawn</label>
          <p className="break-all text-md">{formatEther(fund.amountWithdrawn)}</p>
        </div>

        <div className="flex flex-col p-2">
          {fund.isActive ? (
            <div className="tooltip tooltip-primary" data-tip="This fund is still open.">
              <LockOpenIcon className="float-right w-6 h-6" />
            </div>
          ) : (
            <div className="tooltip tooltip-primary" data-tip="SORRY! This fund is closed.">
              <LockClosedIcon className="float-right w-6 h-6" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
