import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface FollowButtonProps {
  fundRunId: number;
}

export const FollowButton = (fundRun: FollowButtonProps) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "follow",
    args: [fundRun.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <button className="btn btn-primary btn-sm" onClick={() => writeAsync()} type="button">
      Follow
    </button>
  );
};
