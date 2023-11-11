import { FaceFrownIcon, FaceSmileIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

interface FundRunStatusProps {
  status: number;
}

export const FundRunStatus = (fundRun: FundRunStatusProps) => {
  return (
    <>
      {/* deadline not met; money goal not met */}
      {fundRun.status === 0 && (
        <div>
          <div className="tooltip tooltip-primary" data-tip="This fund is still open.">
            <LockOpenIcon className="w-6 h-6 mr-2" />
          </div>
          <div className="tooltip tooltip-primary" data-tip="Monetary goal not met.">
            <FaceFrownIcon className="w-6 h-6" />
          </div>
        </div>
      )}
      {/* deadline met; money goal not met */}
      {fundRun.status === 1 && (
        <div>
          <div className="tooltip tooltip-primary" data-tip="This fund is closed.">
            <LockClosedIcon className="w-6 h-6 mr-2" />
          </div>
          <div className="tooltip tooltip-primary" data-tip="Monetary goal not met.">
            <FaceFrownIcon className="w-6 h-6" />
          </div>
        </div>
      )}
      {/* money goal met; deadline not met */}
      {fundRun.status === 2 && (
        <div>
          <div className="tooltip tooltip-primary" data-tip="This fund is still open.">
            <LockOpenIcon className="w-6 h-6 mr-2" />
          </div>
          <div className="tooltip tooltip-primary" data-tip="Monetary goal has been met.">
            <FaceSmileIcon className="w-6 h-6" />
          </div>
        </div>
      )}
      {/* money goal AND deadline met */}
      {fundRun.status === 3 && (
        <div>
          <div className="tooltip tooltip-primary" data-tip="This fund is closed.">
            <LockClosedIcon className="w-6 h-6 mr-2" />
          </div>
          <div className="tooltip tooltip-primary" data-tip="Monetary goal has been met.">
            <FaceSmileIcon className="w-6 h-6" />
          </div>
        </div>
      )}
    </>
  );
};
