import { useEffect, useState } from "react";
import { ProposalSnapshotRow } from "./ProposalSnapshotRow";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { GQL_PROPOSALS_Snapshot } from "~~/helpers/getQueries";

export const ProposalsSnapshotTable = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_PROPOSALS_Snapshot(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 10000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("ProposalsSnapshotTable.tsx Query Error: ", error);
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
          <span className="my-auto text-lg">LATEST PROPOSALS</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Showing 25</option>
            <option value="10">Showing 10</option>
            <option value="1">Showing 1</option>
          </select>
        </div>

        <table className="table w-full text-xl table-auto bg-base-100 md:table-lg table-xs">
          <thead>
            <tr className="text-sm rounded-xl text-base-content">
              <th className="bg-primary">Status</th>
              <th className="bg-primary">To</th>
              <th className="bg-primary">Proposed By</th>
              <th className="bg-primary">Amount</th>
              <th className="bg-primary">Reason</th>
              <th className="bg-primary">Fund Run Title</th>
              <th className="bg-primary">Remaining Ether</th>
            </tr>
          </thead>
          <tbody>
            {data?.proposals?.map(proposal => (
              <>
                <ProposalSnapshotRow
                  id={proposal.id}
                  proposalId={proposal.proposalId}
                  status={proposal.status}
                  amount={proposal.amount}
                  to={proposal.to}
                  proposedBy={proposal.proposedBy}
                  reason={proposal.reason}
                  fundRunTitle={proposal.fundRun.title}
                  remainingEther={BigInt(proposal.fundRun.amountCollected) - BigInt(proposal.fundRun.amountWithdrawn)}
                />
              </>
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
