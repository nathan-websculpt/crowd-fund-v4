import { useState } from "react";
import { Address } from "../scaffold-eth/Address";
import { SubSubComments } from "./SubSubComments";
import { CreateSubComment } from "./CreateSubComment";

interface SubCommentProps {
  postId: string;
  id: string;
  commenter: string;
  commentText: string;
}
// todo:rename vars
export const SubComment = (sc: SubCommentProps) => {
  const [isOpened, toggleIsOpened] = useState(false);
  return (
    <>
      <p>{sc.commentText}</p>
      <div className="flex flex-row justify-between">
        <Address address={sc.commenter} size="lg" />
        <div className="flex flex-row items-center justify-end" onClick={() => toggleIsOpened(!isOpened)}>
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
      </div>

      {/* wrap parts of the ReactTree that contain the components that need to access this context value */}

      {isOpened && (
        <div>
          <CreateSubComment postId={sc.postId} commentId={sc.id} />
          <SubSubComments postId={sc.postId} parentCommentId={sc.id} layersDeep={1} />
        </div>
      )}
    </>
  );
};
