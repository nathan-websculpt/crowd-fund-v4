import Link from "next/link";
import { Spinner } from "../Spinner";
import { FundRunDisplay } from "./FundRunDisplay";
import { useQuery } from "@apollo/client";
import { GQL_FUNDRUNS } from "~~/helpers/getQueries";
import { useEffect } from "react";

export const FundRunsList = () => {
  const { loading, error, data } = useQuery(GQL_FUNDRUNS(), {
    variables: { slug: 0 }, //slug is the skip (for pagination later?)
    pollInterval: 1000,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        {data?.fundRuns?.map(fund => (
          <div
            key={fund.id.toString()}
            className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
          >
            <FundRunDisplay
              id={fund.fundRunId}
              title={fund.title}
              description={fund.description}
              target={fund.target}
              deadline={fund.deadline.toString()} //TODO:
              amountCollected={fund.amountCollected}
              amountWithdrawn={fund.amountWithdrawn}
              status={fund.status}
            />
            <div className="flex justify-between">
              <div>
                {fund.owners.length > 1 && (
                  <Link href={`/crowdfund/vaults/${fund.fundRunId}`} passHref className="btn btn-primary">
                    <div className="tooltip tooltip-primary" data-tip="View Proposals in the Vault">
                      View Vault
                    </div>
                  </Link>
                )}
              </div>

              <div>
                <Link href={`/crowdfund/${fund.fundRunId}`} passHref className="btn btn-primary">
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
