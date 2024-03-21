import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { Address } from "../scaffold-eth";
import { SignMessageReturnType, formatEther, toBytes } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import getNonce from "~~/helpers/getNonce";
import getSocialManagementDigest from "~~/helpers/getSocialManagementDigest";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CreateSocialProposalProps {
  fundRunId: number;
  title: string;
  owners: [];
  remainingEther: bigint;
}

export const CreateSocialProposal = (fundRun: CreateSocialProposalProps) => {
  const userAccount = useAccount();
  const [postTextInput, setPostTextInput] = useState("test post");
  const [creationSignature, setCreationSignature] = useState<SignMessageReturnType>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (creationSignature !== undefined) {
      writeAsync();
    }
  }, [creationSignature]);

  const newErr = (msg: string) => {
    notification.warning(msg, { position: "top-right", duration: 6000 });
    setErrorMsg(msg);
    setError(true);
  };

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getSocialManagementNonce",
    args: [fundRun.fundRunId],
  });

  const signNewProposal = async () => {
    setErrorMsg("");
    setError(false);
    if (postTextInput.trim().length === 0) {
      newErr("Post Text is required.");
      return;
    }
    if (postTextInput.trim().length > 550) {
      newErr("The max-length for the field is 550 characters");
      return;
    }

    const nonce = getNonce(fundRunNonce);
    const digest = await getSocialManagementDigest(nonce, postTextInput, userAccount.address);

    const proposalCreationSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    setCreationSignature(proposalCreationSig);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createSocialProposal",
    args: [
      creationSignature,
      fundRun?.fundRunId,
      {
        postText: postTextInput,
        proposedBy: userAccount.address,
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

  return (
    <>
      <div className="flex flex-col w-full gap-2 sm:gap-5 sm:w-4/5 md:w-3/5">
        <div className="flex justify-between gap-3 mb-5">
          <div className="flex justify-start">
            <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
              Back
            </button>
          </div>
          <div className="flex justify-end gap-4">
            <Link href={`/social/${fundRun?.fundRunId}`} passHref className="btn btn-sm btn-primary">
              View Your Page
            </Link>
            <Link href={`/crowdfund/vaults/${fundRun?.fundRunId}`} passHref className="btn btn-sm btn-primary">
              View Your Vault
            </Link>
          </div>
        </div>
        {error ? (
          <div className="flex justify-center">
            <p className="whitespace-pre-line">{errorMsg}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between px-8 mb-4">
          <h1 className="text-2xl underline">Create a New SOCIAL Proposal</h1>
          <div className="flex items-center gap-4">
            <h4 className="text-xl font-bold underline">Remaining Ether:</h4>
            <span className="text-lg">{formatEther(fundRun?.remainingEther)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-16 mb-8">
          <div className="flex items-center gap-6">
            <label className="text-xl font-bold underline">Title:</label>
            <p className="mr-16 text-lg sm:mr-24">{fundRun.title}</p>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold underline">Owners:</h1>
            <div className="flex flex-col gap-4">
              {fundRun?.owners?.map(owner => (
                <div key={owner}>
                  <Address address={owner} size="md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/5 gap-4 mx-auto">
          <h4 className="mb-4 text-center text-md">
            Note: You have to handle proposals in order. If one proposal is not finalized before another is created, the
            nonce will be off (for the unfinished proposal).
          </h4>
          <div className="flex flex-col">
            <label className="mb-3 text-2xl font-bold">Propose a Post</label>
            <textarea
              name="post-text-input"
              rows={5}
              cols={55}
              placeholder="What would you like to say to your donors?"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={postTextInput}
              onChange={e => setPostTextInput(e.target.value)}
            />{" "}
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
