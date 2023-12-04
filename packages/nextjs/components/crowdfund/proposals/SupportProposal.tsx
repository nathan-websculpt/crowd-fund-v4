import { useEffect, useState } from "react";
import { SignMessageReturnType, toBytes } from "viem";
import { useWalletClient } from "wagmi";
import getDigest from "~~/helpers/getDigest";
import getNonce from "~~/helpers/getNonce";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface SupportProposalProps {
  fundRunId: number;
  proposalId: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
}

export const SupportProposal = (proposal: SupportProposalProps) => {
  const [supportSignature, setSupportSignature] = useState<SignMessageReturnType>();

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (supportSignature !== undefined) {
      writeAsync();
    }
  }, [supportSignature]);

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "ProposalSupported",
    listener: logs => {
      logs.map(log => {
        const { supportedBy, signature, fundRunId, proposalId } = log.args;
        console.log(
          "📡 New Proposal Supported Event \nSupported By:",
          supportedBy,
          "\nWith Signature: ",
          signature,
          "\nFund Run Id: ",
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
    args: [proposal.fundRunId],
  });

  const supportProposal = async () => {
    const nonce = getNonce(fundRunNonce);
    const digest = await getDigest(nonce, proposal.amount, proposal.to, proposal.proposedBy, proposal.reason);

    const proposalSupportSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    setSupportSignature(proposalSupportSig);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "supportMultisigProposal",
    args: [supportSignature, proposal?.fundRunId, proposal?.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setSupportSignature(undefined);
    },
    onError: err => {
      console.log("Transaction Error Message", err?.message);
      setSupportSignature(undefined);
    },
  });

  return (
    <>
      <td className="w-1/12 text-center md:py-4">
        <div className="tooltip tooltip-primary tooltip-right" data-tip="Support this proposal before finalizing.">
          <button className="w-full btn" onClick={() => supportProposal()} disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Support</>}
          </button>
        </div>
      </td>
    </>
  );
};
