import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { Comments } from "~~/components/posts/Comments";
import { SocialPostDisplay } from "~~/components/social/SocialPostDisplay";
import { GQL_SOCIAL_POST_For_Display } from "~~/helpers/getQueries";

const ViewPost: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { loading, error, data } = useQuery(GQL_SOCIAL_POST_For_Display(), {
    variables: { socialPostId: postId },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_FUNDRUN_By_FundRunId Query Error: ", error);
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
        <MetaHeader title="View Post" />
        <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-4/5 lg:w-2/5">
          <div className="flex justify-start mb-5">
            <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
              Back
            </button>
          </div>
          <div className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            <SocialPostDisplay
              id={data.socialPost.id}
              fundRunId={data.socialPost.fundRunId}
              fundRunTitle={data.socialPost.fundRunTitle}
              postText={data.socialPost.postText}
              proposedBy={data.socialPost.proposedBy}
              isCommenting={true}
            />

            <Comments postId={data.socialPost.id} />
          </div>
        </div>
      </>
    );
  }
};
export default ViewPost;
