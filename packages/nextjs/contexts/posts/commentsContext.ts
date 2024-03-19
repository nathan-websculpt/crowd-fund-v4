import { createContext, useContext } from "react";

export interface IComment {
    postId: string;
    commentId: string;
    commenter: string;
    commentText: string;
    likeCount: number;
    userHasLiked: boolean;
}

export const CommentsContext = createContext<IComment | undefined>(undefined);

// export function useContext(CommentsContext) {
//   const thisCommentContext = useContext(CommentsContext);

//   if (thisCommentContext === undefined)
//     throw new Error("useCommentsContext must be used with an IComment -- error from commentsContext.ts");

//   return thisCommentContext;
// }