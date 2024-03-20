import { useEffect } from "react";
import { Spinner } from "../Spinner";
import { CommentInteractions } from "./CommentInteractions";
import { SubComment } from "./SubComment";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { GQL_SOCIAL_POST_COMMENTS_For_Display } from "~~/helpers/getQueries";

interface CommentsProps {
  postId: string;
}

export const Comments = (c: CommentsProps) => {
  const userAccount = useAccount();
  const { loading, error, data } = useQuery(GQL_SOCIAL_POST_COMMENTS_For_Display(), {
    variables: {
      socialPostId: c.postId,
      userWalletAddress: userAccount.address,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_POST_COMMENTS_For_Display Query Error: ", error);
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
            className="flex flex-col gap-2 px-2 m-4 border-l-8 shadow-xl bg-base-200 sm:rounded-lg border-secondary"
          >
            <p>{comment.commentText}</p>

            <CommentInteractions
              postId={c.postId}
              commentId={comment.id}
              likeCount={comment.likeCount}
              userHasLiked={comment.likes.length === 1}
              commenter={comment.commenter}
            />
            
            {/* sub-comments -- map to <SubComment /> */}
            <div className="mb-4 ml-2 border-l-8 border-accent">
              {comment.subcomments.map(sc => (
                <div key={sc.id} className="p-4 border-b-4 border-accent">
                  <SubComment
                    postId={c.postId}
                    id={sc.id}
                    commentText={sc.commentText}
                    commenter={sc.commenter}
                    likeCount={sc.likeCount}
                    userHasLiked={sc.likes.length === 1}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
};
