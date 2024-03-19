import Link from "next/link";
import { PostLikeButton } from "../posts/PostLikeButton";
import { Tip } from "../posts/Tip";
import { Address } from "../scaffold-eth";
import { usePostContext } from "~~/contexts/posts/postContext";

// interface SocialPostDisplayProps {
//   id: string;
//   fundRunId: number;
//   fundRunTitle: string;
//   postText: string;
//   proposedBy: string;
//   isCommenting: boolean;
//   canTip: boolean;
//   likeCount: number;
//   userLikedPost: boolean;
// }

// export const SocialPostDisplay = (thisPost: SocialPostDisplayProps) => {
export const SocialPostDisplay = () => {
  const postContext = usePostContext();
  console.log("fron SocialPostDisplay(), postContext equals: ", postContext);
  const handle = "@" + postContext?.fundRunTitle.replace(/\s/g, "");
  return (
    <>
      <div className="flex justify-between">
        <Link href={`/social/${postContext?.fundRunId}`} passHref>
          <div className="flex items-center gap-4">
            <p className="mt-0 mb-1 font-serif text-2xl">{postContext?.fundRunTitle}</p>
            <span className="text-md text-opacity-40 text-secondary-content">{handle}</span>
          </div>
        </Link>
        {postContext.canTip && <Tip id={postContext.fundRunId} />}
      </div>

      <p className="mt-3 mb-5 text-3xl">{postContext?.postText}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-row items-center">
          {!postContext.isCommenting && (
            <Link href={`/post/${postContext?.postId}`} passHref className="btn btn-primary btn-sm">
              Comment / s
            </Link>
          )}
          <PostLikeButton/>
        </div>
        <div>
          <label className="font-mono text-sm font-bold">Originally Proposed By:</label>
          <Address address={postContext?.proposedBy} size="sm" />
        </div>
      </div>
    </>
  );
};
