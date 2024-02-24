import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CreateSubCommentProps {
  postId: string; //TODO: may not need this...
  commentId: string;
}

export const CreateSubComment = (c: CreateSubCommentProps) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(false);
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
    functionName: "createSubComment",
    args: [c.postId, c.commentId, commentText],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <>
      <label className="text-lg font-bold">Sub-Comment</label>
      <textarea
        placeholder="Leave your sub-comment..."
        className="px-3 py-3 border rounded-lg bg-base-200 border-base-300 textarea"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => validateThenWrite()}>
        Leave your Comment
      </button>
    </>
  );
};
