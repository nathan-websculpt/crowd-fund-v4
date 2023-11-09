import Link from "next/link";
import { Spinner } from "../Spinner";
import { FundRunDisplay } from "./FundRunDisplay";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const FundRunsList = () => {
  const { data: fundRuns, isLoading: isListLoading } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRuns",
  });

  if (isListLoading) {
    return (
      <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        {fundRuns?.map(fund => (
          <div
            key={fund.id.toString()}
            className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
          >
            <FundRunDisplay
              id={fund.id}
              title={fund.title}
              description={fund.description}
              target={fund.target}
              deadline={fund.deadline.toString()}
              amountCollected={fund.amountCollected}
              amountWithdrawn={fund.amountWithdrawn}
              status={fund.status}
            />
            <div className="flex justify-between">
              <div>
                {fund.owners.length > 1 && (
                  <Link href={`/crowdfund/vaults/${fund.id}`} passHref className="btn btn-primary">
                    <div className="tooltip tooltip-primary" data-tip="View Proposals in the Vault">
                      View Vault
                    </div>
                  </Link>
                )}
              </div>

              <div>
                <Link href={`/crowdfund/${fund.id}`} passHref className="btn btn-primary">
                  <div className="tooltip tooltip-primary" data-tip="donate...">
                    View Fund Run
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
};
