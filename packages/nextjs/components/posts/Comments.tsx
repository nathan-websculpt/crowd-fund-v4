import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { ReplyToggle } from "./ReplyToggle";
import { SubComments } from "./SubComments";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { GQL_SOCIAL_POST_COMMENTS_For_Display } from "~~/helpers/getQueries";

interface CommentsProps {
  postId: string;
}

export const Comments = (c: CommentsProps) => {
  const userAccount = useAccount();
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const { loading, error, data } = useQuery(GQL_SOCIAL_POST_COMMENTS_For_Display(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
      socialPostId: c.postId,
      userWalletAddress: userAccount.address, //todo: what if they aren't connected to a wallet?
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_POST_COMMENTS_For_Display Query Error: ", error);
  }, [error]);

  //todo: remove
  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_SOCIAL_POST_COMMENTS_For_Display DATA: ", data);
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
        {data?.comments?.map(comment => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 px-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
          >
            <p>{comment.commentText}</p>

            {/* TODO: ReplyToggle needs a rename */}
            <ReplyToggle
              postId={c.postId}
              commentId={comment.id}
              likeCount={comment.likeCount}
              userHasLiked={comment.likes.length === 1}
              commenter={comment.commenter}
            />

            <SubComments postId={c.postId} subComments={comment.subcomments} />
          </div>
        ))}
      </>
    );
  }
};
