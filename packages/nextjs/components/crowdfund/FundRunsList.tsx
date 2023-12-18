import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "../Spinner";
import { FundRunDisplay } from "./FundRunDisplay";
import { useQuery } from "@apollo/client";
import { GQL_FUNDRUNS } from "~~/helpers/getQueries";

export const FundRunsList = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_FUNDRUNS(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("Query Error: ", error);
  }, [error]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-center gap-3 mb-3">
          <span className="my-auto text-lg">Page {pageNum + 1}</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Show 25</option>
            <option value="10">Show 10</option>
            <option value="1">Show 1</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button disabled={!pageNum} className="btn btn-primary" onClick={() => setPageNum(prev => prev - 1)}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={() => setPageNum(prev => prev + 1)}>
            Next
          </button>
        </div>

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
