import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FundRunDisplay } from "~~/components/crowdfund/FundRunDisplay";
import { GQL_SOCIAL_FOLLOWING_By_Address } from "~~/helpers/getQueries";

export const WhoAmIFollowing = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const userAccount = useAccount();
  const { error, data } = useQuery(GQL_SOCIAL_FOLLOWING_By_Address(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
      user: userAccount.address,
    },
    pollInterval: 1000, //PRODTODO:5000
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_FOLLOWING_By_Address Query Error: ", error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-4/5 lg:w-2/5">
        <div className="flex justify-start mb-5">
          <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
            Back
          </button>
        </div>
        <div className="flex flex-col mb-3">
          {data?.follows[0] !== undefined ? (
            <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">Who you Follow:</h1>
          ) : (
            <h1 className="mt-4 mb-4 text-4xl text-center text-primary-content">
              You are not following any Fund Runs yet
            </h1>
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

        {data?.follows?.map(followingThis => {
          return followingThis?.fundRun !== null ? (
            <div
              key={followingThis.id.toString()}
              className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
            >
              <FundRunDisplay
                id={followingThis.fundRun.fundRunId}
                title={followingThis.fundRun.title}
                description={followingThis.fundRun.description}
                amountCollected={followingThis.fundRun.amountCollected}
                amountWithdrawn={followingThis.fundRun.amountWithdrawn}
              />
              <div className="flex justify-between">
                <div>
                  <Link
                    href={`/crowdfund/vaults/${followingThis.fundRun.fundRunId}`}
                    passHref
                    className="btn btn-primary"
                  >
                    <div className="tooltip tooltip-primary" data-tip="View Proposals in the Vault">
                      View Vault
                    </div>
                  </Link>
                </div>

                <div>
                  <Link href={`/social/${followingThis.fundRun.fundRunId}`} passHref className="btn btn-primary">
                    <div className="tooltip tooltip-primary" data-tip="donate...">
                      View Fund Run
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div key={followingThis.id.toString()}></div>
          );
        })}

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
};
