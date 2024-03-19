import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { Comments } from "~~/components/posts/Comments";
import { CreateComment } from "~~/components/posts/CreateComment";
import { SocialPostDisplay } from "~~/components/social/SocialPostDisplay";
import { PostContext } from "~~/contexts/posts/postContext";
import { GQL_SOCIAL_POST_For_Display } from "~~/helpers/getQueries";

const ViewPost: NextPage = () => {
  const userAccount = useAccount();
  const router = useRouter();
  const { postId } = router.query;

  const { loading, error, data } = useQuery(GQL_SOCIAL_POST_For_Display(), {
    variables: { socialPostId: postId, userWalletAddress: userAccount.address },
    pollInterval: 1000, //PRODTODO:5000
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
        <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-11/12">
          <div className="flex justify-start mb-5">
            <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
              Back
            </button>
          </div>
          <div className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            {data !== undefined && (
              <PostContext.Provider
                value={{
                  postId: data.socialPost.id,
                  fundRunId: data.socialPost.fundRunId,
                  fundRunTitle: data.socialPost.fundRunTitle,
                  postText: data.socialPost.postText,
                  proposedBy: data.socialPost.proposedBy,
                  isCommenting: true,
                  canTip: true,
                  likeCount: data.socialPost.likeCount,
                  userLikedPost: data.socialPost.likes.length === 1,
                }}
              >
                <SocialPostDisplay
                // id={data.socialPost.id}
                // fundRunId={data.socialPost.fundRunId}
                // fundRunTitle={data.socialPost.fundRunTitle}
                // postText={data.socialPost.postText}
                // proposedBy={data.socialPost.proposedBy}
                // isCommenting={true}
                // canTip={true}
                // likeCount={data.socialPost.likeCount}
                // userLikedPost={data.socialPost.likes.length === 1}
                />
              </PostContext.Provider>
            )}
            <div className="mt-6"></div>
            <CreateComment postId={postId} />

            {data !== undefined && (
              <>
                <Comments postId={data.socialPost.id} />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};
export default ViewPost;
