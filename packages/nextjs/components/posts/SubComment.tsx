import { useState } from "react";
import { Address } from "../scaffold-eth/Address";
import { CommentLikeButton } from "./CommentLikeButton";
import { CreateSubComment } from "./CreateSubComment";
import { SubSubComments } from "./SubSubComments";

interface SubCommentProps {
  postId: string;
  id: string;
  commenter: string;
  commentText: string;
  likeCount: number;
  userHasLiked: boolean;
}

export const SubComment = (sc: SubCommentProps) => {
  const [isOpened, toggleIsOpened] = useState(false);
  return (
    <>
      <p>{sc.commentText}</p>
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
          </div>
          <CommentLikeButton
            postId={sc.postId}
            commentId={sc.id}
            likeCount={sc.likeCount}
            userHasLiked={sc.userHasLiked}
          />
        </div>

        <div className="flex flex-col items-end justify-end mt-3">
          <label className="font-mono text-sm font-bold">Posted By:</label>
          <Address address={sc.commenter} size="sm" />
        </div>
      </div>

      <div className="flex flex-row justify-end"></div>

      {isOpened && (
        <div>
          <CreateSubComment postId={sc.postId} parentCommentId={sc.id} />
          <SubSubComments postId={sc.postId} parentCommentId={sc.id} layersDeep={1} />
        </div>
      )}
    </>
  );
};
