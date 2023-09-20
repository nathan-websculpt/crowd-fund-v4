import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface OwnerProps {
  id: number;
}

export const OwnerWithdrawBtn = (owner: OwnerProps) => {
  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "OwnerWithdrawal",
    listener: logs => {
      logs.map(log => {
        const { owner, amount } = log.args;
        console.log("📡 New Owner Withdrawal Event \nFund Run Owner:", owner, "\nWithdrawal Amount: ", amount);
      });
    },
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "fundRunOwnerWithdraw",
    args: [owner.id],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Owner Withdraw</>}
      </button>
    </>
  );
};
