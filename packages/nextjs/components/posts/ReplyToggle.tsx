import { useContext, useState } from "react";
import { CommentLikeButton } from "./CommentLikeButton";
import { CreateSubComment } from "./CreateSubComment";
import { ReplyContext } from "~~/contexts/posts/replyContext";
import { CommentsContext } from "~~/contexts/posts/commentsContext";

export const ReplyToggle = () => {
  const [showReply, setShowReply] = useState(false);
  const commentsContext = useContext(CommentsContext);
  console.log("from ReplyToggle: ", commentsContext?.commentId);

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
            postId={commentsContext.postId}
            commentId={commentsContext.commentId}
            likeCount={commentsContext.likeCount}
            userHasLiked={commentsContext.userHasLiked}
          />
        </div>
        <div className="flex flex-col">
          {showReply && <CreateSubComment 
          postId={commentsContext?.postId} 
          parentCommentId={commentsContext?.commentId} />}
        </div>
      </ReplyContext.Provider>
    </>
  );
};
