import { useContext, useState } from "react";
import { Address } from "../scaffold-eth/Address";
import { CommentLikeButton } from "./CommentLikeButton";
import { CreateSubComment } from "./CreateSubComment";
import { SubSubComments } from "./SubSubComments";
import { ReplyToggle } from "./ReplyToggle";
import { SubCommentsContext } from "~~/contexts/posts/subCommentsContext";
import { CommentsContext } from "~~/contexts/posts/commentsContext";

export const SubComment = () => {
  const subCommentsContext = useContext(SubCommentsContext);
  // const subCommentsContext = useContext(CommentsContext);
  const [isOpened, toggleIsOpened] = useState(false);
  console.log("from SubComment: ", subCommentsContext?.postId, " ... ", subCommentsContext?.commentId);
  console.log("allllllllllllllso from SubComment: ", subCommentsContext);
  return (
    <>
      <p>{subCommentsContext.commentText}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center" onClick={() => toggleIsOpened(!isOpened)}>
            <p className="cursor-pointer">{`${isOpened ? "viewing" : "view"} more`}</p>
            <svg
              className={`w-6 h-6 z-40 cursor-pointer  ${isOpened ? "rotate-90" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 7l6 5-6 5V7z" fill="#ffffff" />
            </svg>

            {/* <ReplyToggle
              postId={sc.postId}
              commentId={sc.id}
              likeCount={sc.likeCount}
              userHasLiked={sc.userHasLiked}
            /> */}
          </div>
          <CommentLikeButton
            postId={subCommentsContext.postId}
            commentId={subCommentsContext.id}
            likeCount={subCommentsContext.likeCount}
            userHasLiked={subCommentsContext.userHasLiked}
          />
        </div>

        <div className="flex flex-col items-end justify-end mt-3">
          <label className="font-mono text-sm font-bold">Posted By:</label>
          <Address address={subCommentsContext.commenter} size="sm" />
        </div>
      </div>

      <div className="flex flex-row justify-end"></div>

      {isOpened && (
        <div>
          <CreateSubComment postId={subCommentsContext.postId} parentCommentId={subCommentsContext.commentId} />
          <SubSubComments postId={subCommentsContext.postId} parentCommentId={subCommentsContext.commentId} layersDeep={1} />
        </div>
      )}
    </>
  );
};