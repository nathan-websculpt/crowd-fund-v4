//TODO: probably can delete this file

import { createContext } from "react";

export interface ISubComment {
    postId: string;
    //parentCommentId: string;
    commentId: string;
    commenter: string;
    commentText: string;
    likeCount: number;
    userHasLiked: boolean;
    //layersDeep: number;
}

export const SubCommentsContext = createContext<ISubComment | undefined>(undefined);