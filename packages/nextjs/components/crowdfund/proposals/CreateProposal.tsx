/* eslint-disable prettier/prettier */
import { useState } from "react";
import { SignMessageReturnType, parseEther, toBytes } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import getDigest from "~~/helpers/getDigest";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

// ethers _> viem
// arrayify becomes: toBytes

interface CreateProposalProps {
  fundRunId: number; //todo:
}

export const CreateProposal = (proposal: CreateProposalProps) => {
  const userAddress = useAccount();
  const [transferInput, setTransferInput] = useState("0.1");
  const [toAddressInput, setToAddressInput] = useState("0xcE62856Bc18E3d0f202e0f13C0B178026B94626F");
  const [reasonInput, setReasonInput] = useState("test proposal");
  const [creationSignature, setCreationSignature] = useState<SignMessageReturnType>();

  const { data: walletClient } = useWalletClient();

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "ProposalCreated",
    listener: logs => {
      logs.map(log => {
        const { proposedBy, fundRunId, proposalId } = log.args;
        console.log(
          "📡 New Proposal Creation Event \nProposed By:",
          proposedBy,
          "Fund Run Id: ",
          fundRunId,
          "\nProposal Id: ",
          proposalId,
        );
      });
    },
  });

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });

  const signNewProposal = async () => {
    const nonce = getNonce(fundRunNonce);
    console.log("nonce: ", nonce);
    const digest = await getDigest(nonce, parseEther(transferInput), toAddressInput, userAddress.address, reasonInput);

    const proposalCreationSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    console.log(proposalCreationSig);

    setCreationSignature(proposalCreationSig);
  };
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createMultisigProposal",
    args: [
      creationSignature,
      proposal?.fundRunId,
      {
        amount: parseEther(transferInput),
        to: toAddressInput,
        proposedBy: userAddress.address,
        reason: reasonInput,
      },
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="mb-12">
        <h1>CREATE A PROPOSAL (CreateProposal.tsx)</h1>
        <label className="mt-3 text-lg font-bold">To Address</label>
        <input
          type="text"
          placeholder="To Address"
          className="min-w-full px-3 py-3 border rounded-lg bg-base-200 border-base-300"
          value={toAddressInput}
          onChange={e => setToAddressInput(e.target.value)}
        />{" "}
        <br />
        <label className="mt-3 text-lg font-bold">Reason</label>
        <input
          type="text"
          placeholder="Reason"
          className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
          value={reasonInput}
          onChange={e => setReasonInput(e.target.value)}
        />{" "}
        <br />
        <label className="mt-3 text-lg font-bold">Amount</label>
        <div className="mt-4 tooltip tooltip-primary" data-tip="Transfer amount in Ether ... like '0.1' or '1'">
          <input
            type="number"
            placeholder="Transfer Amount"
            className="max-w-xs input input-bordered input-accent"
            value={transferInput}
            onChange={e => setTransferInput(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <button className="w-1/4 mx-2 md:w-1/6 btn btn-primary" onClick={() => signNewProposal()}>
            Sign (first)
          </button>
          <button className="w-1/4 mx-auto md:w-1/6 btn btn-primary" onClick={() => writeAsync()}>
            Create (second)
          </button>
        </div>
      </div>
    </>
  );
};
