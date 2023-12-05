import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface OwnerProps {
  fundRunId: number;
}

export const DonorWithdrawBtn = (owner: OwnerProps) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "fundRunDonorWithdraw",
    args: [owner.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Donor Withdraw</>}
      </button>
    </>
  );
};
