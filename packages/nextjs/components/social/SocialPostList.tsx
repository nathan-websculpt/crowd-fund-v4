import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { SocialPostDisplay } from "~~/components/social/SocialPostDisplay";
import { GQL_SOCIAL_POSTS_For_Display } from "~~/helpers/getQueries";

export const SocialPostList = () => {
  const router = useRouter();
  const { fundRun } = router.query as { fundRun?: `${string}` }; //fundRunId
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_SOCIAL_POSTS_For_Display(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
      fundRunId: parseInt(fundRun),
    },
    pollInterval: 10000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_POSTS_For_Display Query Error: ", error);
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
        {data?.socialPosts[0] !== undefined ? (
          <div className="flex flex-col mb-12">
            <h1 className="font-bold text-primary-content">Posts from Fund Run: {data?.socialPosts[0].fundRunTitle}</h1>
            <Link
              href={`/social-management/${data?.socialPosts[0].fundRunId}`}
              passHref
              className="w-full max-w-full min-w-full mt-4"
            >
              <p className="text-center bg-primary">Click Here to Manage Social Page</p>
            </Link>
            <p className="-mt-2 text-center">☝️ would be removed in production ☝️</p>
          </div>
        ) : (
          <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">No Fund Run found</h1>
        )}
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
              fundRunId={p.fundRunId}
              fundRunTitle={p.fundRunTitle}
              postText={p.postText}
              proposedBy={p.proposedBy}
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
      </>
    );
  }
};
