import { useEffect, useState } from "react";
import router from "next/router";
import { gql, useQuery } from "@apollo/client";
import { SignMessageReturnType, isAddress, parseEther, toBytes } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";
import getDigest from "~~/helpers/getDigest";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CreateProposalProps {
  fundRunId: number;
  title: string;
}

export const CreateProposal = (fundRun: CreateProposalProps) => {
  const userAccount = useAccount();
  const [transferDisplay, setTransferDisplay] = useState("0.1");
  const [transferInput, setTransferInput] = useState<bigint>(parseEther("0.1"));
  const [toAddressInput, setToAddressInput] = useState("");
  const [reasonInput, setReasonInput] = useState("test proposal");
  const [creationSignature, setCreationSignature] = useState<SignMessageReturnType>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (creationSignature !== undefined) {
      writeAsync();
    }
  }, [creationSignature]);

  function handleBigIntChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || _v === ".") {
      setTransferInput(0n);
      setTransferDisplay(_v);
    } else if (isValidInteger(IntegerVariant.UINT256, _v, false)) {
      setTransferInput(parseEther(_v));
      setTransferDisplay(_v);
    }
  }

  const newErr = (msg: string) => {
    notification.warning(msg, { position: "top-right", duration: 6000 });
    setErrorMsg(msg);
    setError(true);
  };

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
    args: [fundRun.fundRunId],
  });

  const signNewProposal = async () => {
    setErrorMsg("");
    setError(false);
    if (!isAddress(toAddressInput)) {
      newErr("Please input a valid Address.");
      return;
    }
    if (transferInput <= 0) {
      newErr("Please input a valid amount.");
      return;
    }
    if (reasonInput.trim().length === 0) {
      newErr("A reason is required.");
      return;
    }
    if (reasonInput.trim().length > 150) {
      newErr("The max-length for the reason field is 150 characters");
      return;
    }
    const nonce = getNonce(fundRunNonce);
    const digest = await getDigest(nonce, transferInput, toAddressInput, userAccount.address, reasonInput);

    const proposalCreationSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    setCreationSignature(proposalCreationSig);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createMultisigProposal",
    args: [
      creationSignature,
      fundRun?.fundRunId,
      {
        amount: transferInput,
        to: toAddressInput,
        proposedBy: userAccount.address,
        reason: reasonInput,
      },
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setCreationSignature(undefined);
    },
    onError: err => {
      console.log("Transaction Error Message", err?.message);
      setCreationSignature(undefined);
    },
  });

  const PROPOSALS_GRAPHQL = `{
    proposalCreateds(first: 5) {
      proposedBy
      signature
      fundRunId
      proposalId
      amount
      to
      reason
    }
  }
  `;

  const PROPOSALS_GQL = gql(PROPOSALS_GRAPHQL);
  const proposalsData = useQuery(PROPOSALS_GQL, { pollInterval: 1000 });

  for (let i = 0; i < proposalsData?.data?.proposalCreateds?.length; i++) {
    //TODO:
    // console.log("Proposal from GraphQL Data: ", proposalsData.data.proposalCreateds[i]);
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-5">
        <div className="flex justify-start mb-5">
          <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
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
        <div className="flex mb-5">
          <label className="mr-2 text-lg font-bold underline">Fund Run Title:</label>
          <p className="m-0 text-lg">{fundRun.title}</p>
        </div>
        <h1 className="mb-0 text-xl">Create a New Proposal</h1>
        <h4 className="mt-0 mb-4 text-lg">
          Note: You have to handle proposals in order. If one proposal is not finalized before another is created, the
          nonce will be off (for the unfinished proposal); however, each of these vaults has its own nonce, so they do
          not interfere with each other.
        </h4>
        <label className="text-lg font-bold">To Address</label>
        <input
          type="text"
          placeholder="To Address"
          className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
          value={toAddressInput}
          onChange={e => setToAddressInput(e.target.value)}
        />{" "}
        <div className="sm:gap-5 sm:flex sm:flex-row">
          <div className="flex flex-col">
            <label className="text-lg font-bold">Reason</label>
            <input
              type="text"
              placeholder="Reason"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={reasonInput}
              onChange={e => setReasonInput(e.target.value)}
            />{" "}
          </div>

          <div className="flex flex-col mt-4 sm:mt-0">
            <label className="text-lg font-bold">Amount</label>
            <input
              placeholder="Transfer Amount"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={transferDisplay}
              onChange={e => handleBigIntChange(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-10/12 mx-auto md:w-3/5 btn btn-primary"
          onClick={() => signNewProposal()}
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Submit Proposal</>}
        </button>
      </div>
    </>
  );
};
