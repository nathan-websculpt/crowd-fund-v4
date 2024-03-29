import { useEffect } from "react";
import { Spinner } from "../Spinner";
import { CommentInteractions } from "./CommentInteractions";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { GQL_SOCIAL_SUB_COMMENTS_For_Display } from "~~/helpers/getQueries";

interface SubSubCommentsProps {
  postId: string;
  parentCommentId: string;
  layersDeep: number;
  userHasLiked: boolean;
}

export const SubSubComments = (sc: SubSubCommentsProps) => {
  const userAccount = useAccount();
  const { loading, error, data } = useQuery(GQL_SOCIAL_SUB_COMMENTS_For_Display(), {
    variables: {
      parentCommentId: sc.parentCommentId,
      userWalletAddress: userAccount.address,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_SUB_COMMENTS_For_Display Query Error: ", error);
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
        {data?.comments?.map(comment => (
          <div
            key={comment.id}
            className={`flex flex-col gap-2 p-2 pl-4 m-4 mb-4 ml-0 border-l-8 border-t shadow-xl bg-base-200 sm:rounded-lg ${
              sc.layersDeep % 2 === 0 ? "border-l-accent border-t-accent" : "border-l-secondary border-t-secondary"
            }`}
          >
            <p>{comment.commentText}</p>

            <CommentInteractions
              postId={sc.postId}
              commentId={comment.id}
              likeCount={comment.likeCount}
              userHasLiked={comment.likes.length === 1}
              commenter={comment.commenter}
            />

            <SubSubComments
              postId={sc.postId}
              parentCommentId={comment.id}
              userHasLiked={comment.userHasLiked}
              layersDeep={sc.layersDeep + 1}
            />
          </div>
        ))}
      </>
    );
  }
};
