import { createContext } from "react";

export interface IComment {
    postId: string;
    commentId: string;
    commenter: string;
    commentText: string;
    likeCount: number;
    userHasLiked: boolean;
}

export const ListOfContexts: any[] = [];

export const CommentsContext = createContext<IComment | undefined>(undefined);

export const SubCommentsContext = createContext<IComment | undefined>(undefined);
