import { FaceFrownIcon, FaceSmileIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

interface FundRunStatusProps {
  status: number;
}

export const FundRunStatus = (fundRun: FundRunStatusProps) => {
  return (
    <>
      {/* deadline not met; money goal not met */}
      <div className="flex flex-col p-2">
        {fundRun.status === 0 && (
          <div>
            <div className="tooltip tooltip-primary" data-tip="This fund is still open.">
              <LockOpenIcon className="float-right w-6 h-6 mx-2" />
            </div>
            <div className="tooltip tooltip-primary" data-tip="Monetary goal not met.">
              <FaceFrownIcon className="float-right w-6 h-6 mx-2" />
            </div>
          </div>
        )}
        {/* deadline met; money goal not met */}
        {fundRun.status === 1 && (
          <div>
            <div className="tooltip tooltip-primary" data-tip="This fund is closed.">
              <LockClosedIcon className="float-right w-6 h-6 mx-2" />
            </div>
            <div className="tooltip tooltip-primary" data-tip="Monetary goal not met.">
              <FaceFrownIcon className="float-right w-6 h-6 mx-2" />
            </div>
          </div>
        )}
        {/* money goal met; deadline not met */}
        {fundRun.status === 2 && (
          <div>
            <div className="tooltip tooltip-primary" data-tip="This fund is still open.">
              <LockOpenIcon className="float-right w-6 h-6 mx-2" />
            </div>
            <div className="tooltip tooltip-primary" data-tip="Monetary goal has been met.">
              <FaceSmileIcon className="float-right w-6 h-6 mx-2" />
            </div>
          </div>
        )}
        {/* money goal AND deadline met */}
        {fundRun.status === 3 && (
          <div>
            <div className="tooltip tooltip-primary" data-tip="This fund is closed.">
              <LockClosedIcon className="float-right w-6 h-6 mx-2" />
            </div>
            <div className="tooltip tooltip-primary" data-tip="Monetary goal has been met.">
              <FaceSmileIcon className="float-right w-6 h-6 mx-2" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
