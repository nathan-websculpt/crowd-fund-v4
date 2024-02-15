import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface UnfollowButtonProps {
  fundRunId: number;
}

export const UnfollowButton = (fundRun: UnfollowButtonProps) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "unfollow",
    args: [fundRun.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <button className="btn btn-primary btn-sm" onClick={() => writeAsync()} type="button">
      Unfollow
    </button>
  );
};
