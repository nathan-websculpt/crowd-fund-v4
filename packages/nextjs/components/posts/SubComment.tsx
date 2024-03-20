import { ReplyToggle } from "./ReplyToggle";
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
  return (
    <>
      <p>{sc.commentText}</p>

      <ReplyToggle
        postId={sc.postId}
        commentId={sc.id}
        likeCount={sc.likeCount}
        userHasLiked={sc.userHasLiked}
        commenter={sc.commenter}
      />

      <SubSubComments postId={sc.postId} parentCommentId={sc.id} layersDeep={1} />
    </>
  );
};
