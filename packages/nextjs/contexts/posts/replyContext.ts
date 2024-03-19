import { createContext, useContext } from "react";

export interface IReply {
  showReply: boolean;
  setShowReply: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const ReplyContext = createContext<IReply | undefined>(undefined);
