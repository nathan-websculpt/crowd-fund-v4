import { useState } from "react";
import Link from "next/link";
import { IntegerVariant, isValidInteger } from "../scaffold-eth";
import { DonorWithdrawBtn } from "./DonorWithdrawBtn";
import { OwnerWithdrawBtn } from "./OwnerWithdrawBtn";
import { formatEther } from "viem";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface FundRunProps {
  id: number;
  owners: readonly string[];
}

export const FundRunDonate = (fundRun: FundRunProps) => {
  const [donationInput, setDonationInput] = useState("");

  function handleBigIntChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || _v === "." || isValidInteger(IntegerVariant.UINT256, _v, false)) setDonationInput(_v);
  }

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
    value: donationInput, //TODO: pretty sure this HAS to be a string (when sending ether in the tx)
  });

  const validateThenWrite = () => {
    if (donationInput.trim() === "" || donationInput.trim() === ".") {
      notification.warning("Please input a valid donation amount.", { position: "top-right", duration: 6000 });
      return;
    }
    writeAsync();
  };

  return (
    <>
      <div className="flex">
        <div className="tooltip tooltip-primary" data-tip="Donation Amount in Ether ... like '0.1' or '1'">
          <input
            placeholder="Donation Amount"
            className="max-w-xs input input-bordered input-accent"
            value={donationInput}
            onChange={e => handleBigIntChange(e.target.value)}
          />
        </div>

        <div className="tooltip tooltip-primary" data-tip="Ready to donate Ether?">
          <button className="ml-2 btn btn-primary" onClick={() => validateThenWrite()} disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>DONATE NOW</>}
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 pt-6 mt-4 mb-5 border-t-4 sm:flex-row sm:flex-wrap">
        {fundRun.owners.length === 1 ? (
          <OwnerWithdrawBtn fundRunId={fundRun.id} />
        ) : (
          <Link href={`/crowdfund/vaults/${fundRun.id}`} passHref className="w-10/12 mx-auto md:w-3/5 btn btn-primary">
            <div className="tooltip tooltip-primary" data-tip="View Proposals in the Vault">
              View Vault
            </div>
          </Link>
        )}
        <DonorWithdrawBtn fundRunId={fundRun.id} />
      </div>
    </>
  );
};
