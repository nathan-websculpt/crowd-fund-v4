import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CreateCommentProps {
  postId: string;
}

export const CreateComment = (c: CreateCommentProps) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateThenWrite = () => {
    setErrorMsg("");
    setError(false);
    // validate data
    if (commentText.trim() === "") {
      newErr("Please provide text for this comment.");
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
    args: [c.postId, "0x", commentText],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setCommentText("");
    },
  });
  return (
    <>
      <label className="text-lg font-bold">Comment</label>
      <textarea
        placeholder="Leave your comment..."
        className="px-3 py-3 border rounded-lg bg-base-200 border-base-300 textarea"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <button className="self-end w-2/12 btn btn-primary" onClick={() => validateThenWrite()}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Leave your Comment</>}
      </button>
    </>
  );
};
