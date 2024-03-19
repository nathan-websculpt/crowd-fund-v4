import { createContext } from "react";

export interface IComment {
    postId: string;
    commentId: string;
    commenter: string;
    commentText: string;
    likeCount: number;
    userHasLiked: boolean;
}

export const CommentsContext = createContext<IComment | undefined>(undefined);