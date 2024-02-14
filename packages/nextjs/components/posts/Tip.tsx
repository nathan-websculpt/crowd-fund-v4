import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface TipProps {
  id: number;
}

export const Tip = (fundRun: TipProps) => {
  const donationAmt = "0.001";
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "donateToFundRun",
    args: [fundRun?.id],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
    value: donationAmt,
  });

  return (
    <>
      <div className="tooltip tooltip-right tooltip-primary" data-tip="TIP 0.001 Ether">
        <button className="ml-2 btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>TIP</>}
        </button>
      </div>
    </>
  );
};
