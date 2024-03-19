import { useContext, useState } from "react";
import { usePostContext } from "~~/contexts/posts/postContext";
import { ReplyContext } from "~~/contexts/posts/replyContext";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CreateSubCommentProps {
  // postId: string; //TODO: may not need this...
  parentCommentId: string;
}

export const CreateSubComment = (c: CreateSubCommentProps) => {
  const postContext = usePostContext();
  const [commentText, setCommentText] = useState("");
  const replyContext = useContext(ReplyContext);
  const [error, setError] = useState(false); //TODO:
  const [errorMsg, setErrorMsg] = useState("");

  const validateThenWrite = () => {
    setErrorMsg("");
    setError(false);
    // validate data
    if (commentText.trim() === "") {
      newErr("Please provide text for this sub-comment.");
      return;
    }
    writeAsync();
  };

  const newErr = (msg: string) => {
    notification.warning(msg, { position: "top-right", duration: 6000 });
    setErrorMsg(msg);
    setError(true);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createComment",
    args: [postContext.postId, c.parentCommentId, commentText],
    onBlockConfirmation: txnReceipt => {
      replyContext?.setShowReply(false);
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <>
      <div className="flex flex-col mt-4">
        <textarea
          placeholder="Leave your reply..."
          className="px-3 py-3 border rounded-lg bg-base-200 border-base-300 textarea"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <button className="w-20 mt-2 btn btn-primary place-self-end" onClick={() => validateThenWrite()}>
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Reply</>}
        </button>
      </div>
    </>
  );
};
