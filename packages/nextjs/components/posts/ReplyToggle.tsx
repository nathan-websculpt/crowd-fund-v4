import { useState } from "react";
import { CommentLikeButton } from "./CommentLikeButton";
import { CreateSubComment } from "./CreateSubComment";
import { ReplyContext } from "~~/contexts/posts/replyContext";

interface CommentProps {
  postId: string;
  commentId: string;
  likeCount: number;
  userHasLiked: boolean;
}

export const ReplyToggle = (c: CommentProps) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      <ReplyContext.Provider value={{ showReply, setShowReply }}>
        <div className="absolute flex flex-row items-center gap-2 top-20">
          {/* This is the "comment" icon, it is currently a custom color, because I needed something that works with both light and dark themes */}
          <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setShowReply(!showReply)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0b70ab"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
            </svg>
            <p className="font-mono text-sm font-bold">Reply</p>
          </div>

          <CommentLikeButton
            postId={c.postId}
            commentId={c.commentId}
            likeCount={c.likeCount}
            userHasLiked={c.userHasLiked}
          />
        </div>
        <div className="flex flex-col">
          {showReply && <CreateSubComment postId={c.postId} parentCommentId={c.commentId} />}
        </div>
      </ReplyContext.Provider>
    </>
  );
};
