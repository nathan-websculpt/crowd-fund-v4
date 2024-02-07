import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { FundRunDisplay } from "~~/components/crowdfund/FundRunDisplay";
import { FundRunDonate } from "~~/components/crowdfund/FundRunDonate";
import { SocialPostList } from "~~/components/social/SocialPostList";
import { GQL_FUNDRUN_By_FundRunId } from "~~/helpers/getQueries";

const ViewSocial: NextPage = () => {
  const router = useRouter();
  const { fundRun } = router.query as { fundRun?: `${string}` };

  const { loading, error, data } = useQuery(GQL_FUNDRUN_By_FundRunId(), {
    variables: { slug: parseInt(fundRun) },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_FUNDRUN_By_FundRunId Query Error: ", error);
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
        <MetaHeader title="Social Media Page" />
        <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-4/5 lg:w-2/5">
          <div className="flex justify-start mb-5">
            <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
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
                    amountCollected={data?.fundRuns[0].amountCollected}
                    amountWithdrawn={data?.fundRuns[0].amountWithdrawn}
                  />

                  <FundRunDonate id={data?.fundRuns[0].fundRunId} owners={data?.fundRuns[0].owners} />
                </div>
              ) : (
                <h1>Sorry! Nothing here.</h1>
              )}
            </div>
          </div>

          <SocialPostList />
        </div>
      </>
    );
  }
};

export default ViewSocial;