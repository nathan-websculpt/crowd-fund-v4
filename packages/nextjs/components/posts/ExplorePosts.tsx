import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "../Spinner";
import { SocialPostDisplay } from "../social/SocialPostDisplay";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GQL_EXPLORE_POSTS_For_Display } from "~~/helpers/getQueries";

export const ExplorePosts = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_EXPLORE_POSTS_For_Display(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_EXPLORE_POSTS_For_Display Query Error: ", error);
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
        <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-4/5 lg:w-2/5">
          <div className="flex justify-start mb-5">
            <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
              Back
            </button>
          </div>
          <div className="flex flex-col mb-3">
            {data?.socialPosts[0] !== undefined ? (
              <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">
                Exploring posts from all Fund Runs
              </h1>
            ) : (
              <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">No Posts found for this Fund Run</h1>
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
          {data?.socialPosts?.map(p => (
            <div
              key={p.id.toString()}
              className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
            >
              <SocialPostDisplay
                id={p.id}
                fundRunId={p.fundRunId}
                fundRunTitle={p.fundRunTitle}
                postText={p.postText}
                proposedBy={p.proposedBy}
                isCommenting={false}
                canTip={true}
              />
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
        </div>
      </>
    );
  }
};