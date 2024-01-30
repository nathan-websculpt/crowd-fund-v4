import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { CreateSocialProposal } from "~~/components/social-management/CreateSocialProposal";
import { SocialProposalTable } from "~~/components/social-management/SocialProposalTable";
import { GQL_FUNDRUN_By_FundRunId } from "~~/helpers/getQueries";

const ManageSocial: NextPage = () => {
  const router = useRouter();
  const { fundRun } = router.query as { fundRun?: `${string}` }; //fundRunId

  //query returns a bit more than needed (for now), but going to use other fields later
  const { loading, error, data } = useQuery(GQL_FUNDRUN_By_FundRunId(), {
    variables: { slug: parseInt(fundRun) },
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_FUNDRUN_By_FundRunId Query Error: ", error);
  }, [error]);

  return (
    <>
      <MetaHeader title="Manage Social Media" />
      {data?.fundRuns[0] ? (
        <>
          <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
            <div className="flex items-center justify-center">
              <CreateSocialProposal fundRunId={data?.fundRuns[0].fundRunId} title={data?.fundRuns[0].title} />
            </div>
          </div>
          {loading ? (
            <>
              <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
                <h1 className="mx-auto">Loading Proposals</h1>
                <Spinner width="150px" height="150px" />
              </div>
            </>
          ) : (
            <SocialProposalTable fundRunId={data?.fundRuns[0].fundRunId} />
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            <h1 className="mx-auto">Loading Fund Run</h1>
            <Spinner width="150px" height="150px" />
          </div>
        </>
      )}
    </>
  );
};

export default ManageSocial;
