import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { Address } from "../scaffold-eth";
import { CreateSubComment } from "./CreateSubComment";
import { ReplyToggle } from "./ReplyToggle";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GQL_SOCIAL_SUB_COMMENTS_For_Display } from "~~/helpers/getQueries";

interface SubSubCommentsProps {
  postId: string;
  parentCommentId: string;
  layersDeep: number;
  userHasLiked: boolean;
}

export const SubSubComments = (sc: SubSubCommentsProps) => {
  const userAccount = useAccount();
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const { loading, error, data } = useQuery(GQL_SOCIAL_SUB_COMMENTS_For_Display(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
      parentCommentId: sc.parentCommentId,
      userWalletAddress: userAccount.address,
    },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_SUB_COMMENTS_For_Display Query Error: ", error);
  }, [error]);

  //todo: remove
  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_SOCIAL_SUB_COMMENTS_For_Display DATA: ", data);
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center w-full min-w-full gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        {/* todo: I think being able to change the page-size is too much going on... */}
        {/* <div className="flex justify-end gap-3 mb-3">
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Showing 25</option>
            <option value="10">Showing 10</option>
            <option value="1">Showing 1</option>
          </select>
        </div> */}
        {data?.comments?.map(comment => (
          <div
            key={comment.id}
            className={`relative flex flex-col gap-2 p-2 pl-4 m-4 mb-4 ml-8 border shadow-xl bg-base-200 sm:rounded-lg border-secondary border-l-${
              sc.layersDeep * 4
            }`}
          >
            <p>{comment.commentText}</p>
            <div className="flex flex-col items-end mt-3">
              <label className="font-mono text-sm font-bold">Posted By:</label>
              <Address address={comment.commenter} size="sm" />
            </div>

            <ReplyToggle
              postId={sc.postId}
              commentId={comment.id}
              likeCount={comment.likeCount}
              userHasLiked={comment.likes.length === 1}
            />
            {/* <CreateSubComment postId={sc.postId} parentCommentId={comment.id} /> */}
            {/* todo: remove ^^^ */}
            <SubSubComments
              postId={sc.postId}
              parentCommentId={comment.id}
              userHasLiked={comment.userHasLiked}
              layersDeep={comment.layersDeep + 1}
            />
            {/* todo: ^^^ */}
          </div>
        ))}

        {/* <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
            <ArrowLeftIcon className="w-4 h-4" />
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span>...</span>
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
        </div> */}
      </>
    );
  }
};