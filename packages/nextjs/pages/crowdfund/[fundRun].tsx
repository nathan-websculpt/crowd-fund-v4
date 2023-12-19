import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { FundRunDisplay } from "~~/components/crowdfund/FundRunDisplay";
import { FundRunDonate } from "~~/components/crowdfund/FundRunDonate";
import { GQL_FUNDRUN_By_FundRunId } from "~~/helpers/getQueries";

const FundRunPage: NextPage = () => {
  const router = useRouter();
  const { fundRun } = router.query as { fundRun?: `${string}` };

  const { loading, error, data } = useQuery(GQL_FUNDRUN_By_FundRunId(), {
    variables: { slug: parseInt(fundRun) },
    pollInterval: 1000,
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
        <MetaHeader title="Fund Run Viewer" />
        <div className="w-full px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:w-4/5 lg:w-2/5 sm:rounded-lg sm:px-10">
          <div className="flex justify-end mb-5">
            <Link href="/crowdfund/browse-fund-runs" passHref className="btn btn-sm btn-primary">
              View Other Fund Runs
            </Link>
            <button className="ml-5 btn btn-sm btn-primary" onClick={() => router.back()}>
              Back
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
              {data?.fundRuns[0] ? (
                <div>
                  <FundRunDisplay
                    id={data?.fundRuns[0].fundRunId}
                    title={data?.fundRuns[0].title}
                    description={data?.fundRuns[0].description}
                    target={data?.fundRuns[0].target}
                    deadline={data?.fundRuns[0].deadline.toString()}
                    amountCollected={data?.fundRuns[0].amountCollected}
                    amountWithdrawn={data?.fundRuns[0].amountWithdrawn}
                    status={data?.fundRuns[0].status}
                  />

                  <FundRunDonate id={data?.fundRuns[0].fundRunId} owners={data?.fundRuns[0].owners} />
                </div>
              ) : (
                <h1>Sorry! Nothing here.</h1>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default FundRunPage;
