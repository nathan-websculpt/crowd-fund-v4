import { useEffect, useState } from "react";
import { FundRunRow } from "./FundRunRow";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { GQL_FUNDRUNS_ALL } from "~~/helpers/getQueries";

export const FundRunsTable = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_FUNDRUNS_ALL(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("FundRunsTable.tsx Query Error: ", error);
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center w-full min-w-full gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-center gap-3 mb-3">
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

        <table className="table w-full text-xl bg-base-100 md:table-md table-sm">
          <thead>
            <tr className="text-sm rounded-xl text-base-content">
              <th className="bg-primary"></th>
              <th className="bg-primary">Status</th>
              <th className="bg-primary">ID</th>
              <th className="bg-primary">Title</th>
              <th className="bg-primary">Description</th>
              <th className="bg-primary">Money Target</th>
              <th className="bg-primary">Donated</th>
              <th className="text-center bg-primary">Withdrawn</th>
            </tr>
          </thead>
          <tbody>
            {data?.fundRuns?.map(fr => (
              <FundRunRow
                key={fr.id} //unique ID from subgraph
                fundRunId={fr.fundRunId}
                status={fr.status}
                title={fr.title}
                description={fr.description}
                target={fr.target}
                donated={fr.amountCollected}
                withdrawn={fr.amountWithdrawn}
                proposals={fr.proposals}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
          <button
            className="btn btn-sm"
            // disabled={isNextButtonDisabled}
            onClick={() => setPageNum(prev => prev + 1)}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }
};
