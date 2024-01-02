import { useEffect, useState } from "react";
import { ProposalSnapshotRow } from "./ProposalSnapshotRow";
import { useLazyQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { GQL_PROPOSALS_Snapshot } from "~~/helpers/getQueries";

export const ProposalsSnapshotTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const [executeSearch, { error, data, loading }] = useLazyQuery(GQL_PROPOSALS_Snapshot(searchInput));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("ProposalsSnapshotTable.tsx Query Error: ", error);
  }, [error]);

  useEffect(() => {
    doQuery();
  }, [pageSize, pageNum]);

  const doQuery = () => {
    if (searchInput === "") {
      executeSearch({
        variables: {
          limit: pageSize,
          offset: pageNum * pageSize,
        },
      });
    } else {
      executeSearch({
        variables: {
          limit: pageSize,
          offset: pageNum * pageSize,
          searchBy: searchInput,
        },
      });
    }
  };

  if (!loaded) {
    executeSearch({
      variables: {
        limit: pageSize,
        offset: pageNum * pageSize,
      },
    });
    setLoaded(true);
  }

  const refreshTbl = (clearSearch: boolean) => {
    if (clearSearch) setSearchInput("");
    setPageNum(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full min-w-full gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-between mb-3">
          <div className="flex gap-3">
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

          <div className="flex gap-3">
            <input
              className="px-5 bg-secondary text-secondary-content"
              placeholder="Search by Wallet Address ... "
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            ></input>
            <button className="px-4 py-2 text-xl bg-primary" onClick={() => doQuery()}>
              SEARCH
            </button>
            {/* <span className="my-auto text-lg">SEARCH</span> */}
          </div>

          <div className="flex gap-3">
            <span className="my-auto text-lg">REFRESH</span>
            <button className="px-4 py-2 text-xl bg-primary" onClick={() => refreshTbl(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
                />
              </svg>
            </button>
          </div>
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
              <ProposalSnapshotRow
                key={proposal?.id}
                id={proposal?.id}
                proposalId={proposal?.proposalId}
                status={proposal?.status}
                amount={proposal?.amount}
                to={proposal?.to}
                proposedBy={proposal?.proposedBy}
                reason={proposal?.reason}
                fundRunTitle={proposal?.fundRun.title}
                remainingEther={BigInt(proposal?.fundRun.amountCollected) - BigInt(proposal?.fundRun.amountWithdrawn)}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
            <ArrowLeftIcon className="w-4 h-4" />
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span>...</span>
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
          <button className="btn btn-sm" onClick={() => setPageNum(prev => prev + 1)}>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }
};
