import { FaceFrownIcon, FaceSmileIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

interface FundRunStatusProps {
  status: number;
}

export const FundRunStatus = (fund: FundRunStatusProps) => {
  return (
    <>
      {/* deadline not met; money goal not met */}
      <div className="flex flex-col p-2">
        {fund.status == 0 && (
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
        {fund.status == 1 && (
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
        {fund.status == 2 && (
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
        {fund.status == 3 && (
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
