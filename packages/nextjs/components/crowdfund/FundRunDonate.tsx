import { useState } from "react";
import Link from "next/link";
import { DonorWithdrawBtn } from "./DonorWithdrawBtn";
import { OwnerWithdrawBtn } from "./OwnerWithdrawBtn";
import { formatEther } from "viem";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface FundRunProps {
  id: number;
  owners: readonly string[];
}

export const FundRunDonate = (fundRun: FundRunProps) => {
  const [donationInput, setDonationInput] = useState("");

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "DonationOccurred",
    listener: logs => {
      logs.map(log => {
        const { owners, donor, amount } = log.args;
        console.log(
          "📡 New Donation Event \nFund Run Owner:",
          owners,
          "\nDonor: ",
          donor,
          "\nDonation amount: ",
          formatEther(amount),
        );
      });
    },
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "donateToFundRun",
    args: [fundRun?.id],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
    value: donationInput,
  });

  const validateThenWrite = () => {
    if (donationInput === "") {
      alert("Please input a donation amount.");
      return;
    }
    writeAsync();
  };

  return (
    <>
      <div className="tooltip tooltip-primary" data-tip="Donation Amount in Ether ... like '0.1' or '1'">
        <input
          type="number"
          placeholder="Donation Amount"
          className="max-w-xs input input-bordered input-accent"
          onChange={e => setDonationInput(e.target.value)}
        />
      </div>

      <div className="tooltip tooltip-primary" data-tip="Ready to donate Ether?">
        <button className="mt-5 ml-0 xl:ml-7 btn btn-primary" onClick={() => validateThenWrite()} disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>DONATE NOW</>}
        </button>
      </div>

      <div className="flex flex-col justify-center gap-8 pt-6 mt-20 mb-5 border-t-4 sm:mt-12 sm:flex-row sm:flex-wrap">
        {fundRun.owners.length === 1 ? (
          <OwnerWithdrawBtn fundRunId={fundRun.id} />
        ) : (
          <Link href={`/crowdfund/vaults/${fundRun.id}`} passHref className="link">
            <div className="tooltip tooltip-primary" data-tip="View Proposals in the Vault">
              <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary">View Vault</button>
            </div>
          </Link>
        )}
        <DonorWithdrawBtn fundRunId={fundRun.id} />
      </div>
    </>
  );
};
