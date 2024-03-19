import { createContext, useContext } from "react";

export interface IReply {
  showReply: boolean;
  setShowReply: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const ReplyContext = createContext<IReply | undefined>(undefined);

// export function useReplyContext() {
//   const thisReplyToggleContext = useContext(ReplyContext);

//   if (thisReplyToggleContext === undefined)
//     throw new Error("useReplyContext must be used with an IReply -- error from replyContext.ts");

//   return thisReplyToggleContext;
// }
