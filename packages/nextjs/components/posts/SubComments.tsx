import { CommentsContext } from "~~/contexts/posts/commentsContext";
import { SubComment } from "./SubComment";
import { SubCommentsContext } from "~~/contexts/posts/subCommentsContext";

interface SubCommentsProps {
  postId: string;
  subComments: any[];
}

export const SubComments = (subCommentsList: SubCommentsProps) => {
  console.log("from SubCommentsss", subCommentsList?.subComments);
  return (
    <>
      <div className="pl-4 mb-4 ml-8 border-l-4 border-secondary">
        {subCommentsList?.subComments.map(sc => (
          <div key={sc.id} className="p-4 m-2 border-b-2 border-primary">
            {/* <SubCommentsContext.Provider
              value={(subCommentsList.postId, sc.id, sc.commenter, sc.commentText, sc.likeCount, sc.likes.length === 1)}
            > */}

            <CommentsContext.Provider
              value={(subCommentsList.postId, sc.id, sc.commenter, sc.commentText, sc.likeCount, sc.likes.length === 1)}
            >
              <SubComment
              // postId={subCommentsList.postId}
              // id={sc.id}
              // commentText={sc.commentText}
              // commenter={sc.commenter}
              // likeCount={sc.likeCount}
              // userHasLiked={sc.likes.length === 1}
              />
            </CommentsContext.Provider>
            {/* </SubCommentsContext.Provider> */}
          </div>
        ))}
      </div>
    </>
  );
};
