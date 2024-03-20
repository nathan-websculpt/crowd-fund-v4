import Link from "next/link";
import { PostLikeButton } from "../posts/PostLikeButton";
import { Tip } from "../posts/Tip";
import { Address } from "../scaffold-eth";

interface SocialPostDisplayProps {
  id: string;
  fundRunId: number;
  fundRunTitle: string;
  postText: string;
  proposedBy: string;
  isCommenting: boolean;
  canTip: boolean;
  likeCount: number;
  userLikedPost: boolean;
}

export const SocialPostDisplay = (thisPost: SocialPostDisplayProps) => {
  const handle = "@" + thisPost?.fundRunTitle.replace(/\s/g, "");
  return (
    <>
      <div className="flex justify-between">
        <Link href={`/social/${thisPost?.fundRunId}`} passHref>
          <div className="flex items-center gap-4">
            <p className="mt-0 mb-1 font-serif text-2xl">{thisPost?.fundRunTitle}</p>
            <span className="text-md text-opacity-40 text-secondary-content">{handle}</span>
          </div>
        </Link>
        {thisPost.canTip && <Tip id={thisPost.fundRunId} />}
      </div>

      <p className="mt-3 mb-5 text-3xl">{thisPost?.postText}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-row items-center">
          {!thisPost.isCommenting && (
            <Link href={`/post/${thisPost?.id}`} passHref className="btn btn-primary btn-sm">
              Comment / s
            </Link>
          )}
          <PostLikeButton
            postId={thisPost?.id}
            likeCount={thisPost?.likeCount}
            userHasLiked={thisPost?.userLikedPost}
          />
        </div>
        <div className="flex flex-col items-end">
          <label className="font-mono text-sm font-bold">Originally Proposed By:</label>
          <Address address={thisPost?.proposedBy} size="sm" />
        </div>
      </div>
    </>
  );
};
