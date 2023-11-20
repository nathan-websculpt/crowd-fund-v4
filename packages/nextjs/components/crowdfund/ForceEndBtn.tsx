import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface EndFundRunProps {
  fundRunId: number;
}

export const ForceEndBtn = (fundRun: EndFundRunProps) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "forceEnd",
    args: [fundRun.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <button className="btn btn-primary btn-xs" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Force End</>}
      </button>
    </>
  );
};
