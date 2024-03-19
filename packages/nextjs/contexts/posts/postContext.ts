import { createContext, useContext } from "react";

export interface IPost {
  postId: string;
  fundRunId: number;
  fundRunTitle: string;
  postText: string;
  proposedBy: string;
  isCommenting: boolean;
  canTip: boolean;
  likeCount: number;
  userLikedPost: boolean;
}

export const PostContext = createContext<IPost | undefined>(undefined);

export function usePostContext() {
  const thisPostToggleContext = useContext(PostContext);

  if (thisPostToggleContext === undefined)
    throw new Error("usePostContext must be used with an IPost -- error from PostContext.ts");

  return thisPostToggleContext;
}
