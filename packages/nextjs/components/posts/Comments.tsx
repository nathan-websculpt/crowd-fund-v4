import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GQL_SOCIAL_POST_COMMENTS_For_Display } from "~~/helpers/getQueries";

interface CommentsProps {
  postId: string;
}

export const Comments = (c: CommentsProps) => {
  const { loading, error, data } = useQuery(GQL_SOCIAL_POST_COMMENTS_For_Display(), {
    variables: { socialPostId: c.postId },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_POST_COMMENTS_For_Display Query Error: ", error);
  }, [error]);

  return (
    <>
      {data?.comments?.map(comment => (
        <div
          key={comment.id}
          className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
        >
          <p>{comment.commentText}</p>
        </div>
      ))}
    </>
  );
};
