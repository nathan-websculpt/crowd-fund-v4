import { SubComment } from "./SubComment";

interface SubCommentsProps {
  postId: string;
  subComments: any[];
}
// todo:rename vars
export const SubComments = (subCommentsList: SubCommentsProps) => {
  console.log(subCommentsList?.subComments[0].id);
  return (
    <>
      <div className="pl-4 mb-4 ml-8 border-l-4 border-secondary">
        {subCommentsList?.subComments.map(sc => (
          <div key={sc.id} className="p-4 m-2 border-b-2 border-primary">
            <SubComment
              postId={subCommentsList.postId}
              id={sc.id}
              commentText={sc.commentText}
              commenter={sc.commenter}
            />
          </div>
        ))}
      </div>
    </>
  );
};
