import { usePostContext } from "~~/contexts/posts/postContext";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface CommentProps {
  // postId: string;
  commentId: string;
  likeCount: number;
  userHasLiked: boolean;
}

export const CommentLikeButton = (c: CommentProps) => {
  const postContext = usePostContext();
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "likeComment",
    args: [postContext.postId, c.commentId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="flex flex-row items-center gap-2 ml-4">
        {/* This is the "like/heart" icon, it is currently a custom color, because I needed something that works with both light and dark themes */}
        {c.userHasLiked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#0b70ab"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
              strokeWidth="0"
              fill="#0b70ab"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#0b70ab"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => writeAsync()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        )}
        <p className="font-mono text-sm font-bold">{c.likeCount} Likes</p>
      </div>
    </>
  );
};
