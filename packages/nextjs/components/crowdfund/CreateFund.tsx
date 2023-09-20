import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const CreateFund = () => {
  const router = useRouter();
  const address = useAccount();
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [targetInput, setTargetInput] = useState<bigint>(parseEther("1"));
  const [deadlineInput, setDeadlineInput] = useState<number>(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "FundRunCreated",
    listener: logs => {
      logs.map(log => {
        const { id, owner, title, target } = log.args;
        console.log(
          "📡 New Fund Run Event \ncreator:",
          owner,
          "\nID: ",
          id,
          "\nTitle: ",
          title,
          "\n  with a target of: ",
          target,
        );
        if (address.address == owner) router.push(`/crowdfund/${id}`);
      });
    },
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createFundRun",
    args: [titleInput, descInput, targetInput, deadlineInput],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      if (txnReceipt.status === "success") {
        console.log(txnReceipt);
      }
    },
  });

  const validateThenWrite = () => {
    setErrorMsg("");
    setError(false);
    if (titleInput === "" || descInput === "") {
      setErrorMsg("Please provide a Title and a Description.");
      setError(true);
      return;
    } else if (targetInput <= 0 || deadlineInput <= 0) {
      setErrorMsg("A goal and a deadline are both required fields.");
      setError(true);
      return;
    } else if (deadlineInput > 65535) {
      setErrorMsg("The Deadline must be less than 65,535 ... it is a uint16 in the contract");
      setError(true);
      return;
    }

    writeAsync();
  };

  return (
    <>
      <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 sm:gap-5">
            <div className="flex justify-end mb-5">
              <Link href="/crowdfund/browse-fund-runs" passHref className="link">
                <button className="btn btn-sm btn-primary">View Other Fund Runs</button>
              </Link>
              <button className="ml-5 btn btn-sm btn-primary" onClick={() => router.back()}>
                Back
              </button>
            </div>
            {error ? (
              <div className="flex justify-center">
                <p className="whitespace-pre-line">{errorMsg}</p>
              </div>
            ) : (
              <></>
            )}
            {/* up-and-down */}
            <label className="text-lg font-bold">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
            />{" "}
            <label className="text-lg font-bold">Description</label>
            <textarea
              placeholder="Description"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300 textarea"
              value={descInput}
              onChange={e => setDescInput(e.target.value)}
            />
            {/* ^^^ up-and-down ^^^ */}
            {/* side-by-side on desktop, up-and-down on phone */}
            <div className="sm:gap-5 sm:flex sm:flex-row">
              <div className="flex flex-col">
                <label className="text-lg font-bold">Minimum Goal</label>
                <input
                  type="number"
                  placeholder="Target Amount"
                  className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                  onChange={e => setTargetInput(parseEther(e.target.value))}
                />
              </div>

              <div className="flex flex-col mt-4 sm:mt-0">
                <label className="text-lg font-bold">Deadline (mins from now)</label>
                <input
                  type="number"
                  placeholder="Deadline"
                  className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                  value={deadlineInput}
                  onChange={e => setDeadlineInput(parseInt(e.target.value))}
                />
              </div>
            </div>
            {/* ^^^ side-by-side on desktop, up-and-down on phone ^^^^ */}
            <button
              className="w-10/12 mx-auto md:w-3/5 btn btn-primary"
              onClick={() => validateThenWrite()}
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Start My Fund</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
