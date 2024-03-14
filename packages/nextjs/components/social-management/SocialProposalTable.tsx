import { useEffect } from "react";
import { SocialProposalRow } from "./SocialProposalRow";
import { useQuery } from "@apollo/client";
import { Spinner } from "~~/components/Spinner";
import { GQL_SOCIAL_PROPOSALS_By_FundRunId } from "~~/helpers/getQueries";

interface SocialProposalTableProps {
  fundRunId: number;
}

export const SocialProposalTable = (fundRun: SocialProposalTableProps) => {
  const { loading, error, data } = useQuery(GQL_SOCIAL_PROPOSALS_By_FundRunId(), {
    variables: { slug: fundRun.fundRunId },
    pollInterval: 1000, //PRODTODO:5000
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_PROPOSALS_By_FundRunId Query Error: ", error);
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
        <div className="flex justify-center w-11/12 mt-9 max-w-11/12 sm:mx-auto">
          <div className="w-full overflow-x-auto">
            <h1>Support or Finalize an Existing SOCIAL MEDIA Proposal</h1>
            <div className="flex items-center justified-center">
              <p>😄 - Created</p>
              <div className="w-24 h-6 ml-4 bg-secondary"></div>
            </div>
            <div className="flex items-center justified-center">
              <p>🤝 - Supported, Ready to Finalize</p>
              <div className="w-24 h-6 ml-4 bg-accent"></div>
            </div>
            <div className="flex items-center justified-center">
              <p>✅ - POST SENT</p>
              <div className="w-24 h-6 ml-4 bg-neutral"></div>
            </div>
            <table className="table w-full text-xl bg-base-100 md:table-md table-sm">
              <thead>
                <tr className="text-sm rounded-xl text-base-content">
                  <th className="bg-primary"></th>
                  <th className="bg-primary">Status</th>
                  <th className="bg-primary">ID</th>
                  <th className="bg-primary">Proposed By</th>
                  <th className="bg-primary">Post Text</th>
                  <th className="text-center bg-primary">Submit Support</th>
                  <th className="text-center bg-primary">Finalize</th>
                  <th className="text-center bg-primary">Revoke</th>
                </tr>
              </thead>
              <tbody>
                {data?.socialProposals?.map(sp => (
                  <SocialProposalRow
                    key={sp.id} //unique ID from subgraph
                    socialProposalId={sp.socialProposalId}
                    fundRunId={sp.fundRunId}
                    status={sp.status}
                    proposedBy={sp.proposedBy}
                    postText={sp.postText}
                    signatures={sp.signatures}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};
