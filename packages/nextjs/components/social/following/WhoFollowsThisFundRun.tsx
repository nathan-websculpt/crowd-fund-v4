import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { GQL_SOCIAL_FOLLOWERS_By_FundRunId } from "~~/helpers/getQueries";

interface WhoFollowsProps {
  fundRunId: number;
}

export const WhoFollowsThisFundRun = (fund: WhoFollowsProps) => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const { error, data } = useQuery(GQL_SOCIAL_FOLLOWERS_By_FundRunId(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
      fundRunId: fund?.fundRunId,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_FOLLOWERS_By_FundRunId Query Error: ", error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col mb-3">
        {data?.follows?.length > 0 ? (
          <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">Viewing Fund Run's Followers</h1>
        ) : (
          <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">Sorry, no followers</h1>
        )}
      </div>
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

      {data?.follows?.map(follower => (
        <div
          key={follower?.id}
          className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
        >
          <Address address={follower?.user} size="xl" />
        </div>
      ))}

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
};
