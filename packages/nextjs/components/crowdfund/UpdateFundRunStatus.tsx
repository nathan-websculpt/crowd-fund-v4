import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface UpdateStatusProps {
  fundRunId: number;
}

export const UpdateFundRunStatus = (fundRun: UpdateStatusProps) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "updateFundRunStatus",
    args: [fundRun.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <button className="btn btn-primary btn-xs" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Update Status</>}
      </button>
    </>
  );
};
