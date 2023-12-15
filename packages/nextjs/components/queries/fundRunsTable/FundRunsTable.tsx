import { useEffect, useState } from "react";
import { FundRunRow } from "./FundRunRow";
import { useQuery } from "@apollo/client";
import { Spinner } from "~~/components/Spinner";
import { GQL_FUNDRUNS_ALL } from "~~/helpers/getQueries";

export const FundRunsTable = () => {
  const [pageSize, setPageSize] = useState(10);
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

  useEffect(() => {
    if (data !== undefined && data !== null) console.log("FundRunsTable.tsx Query DATA: ", data);
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
};
