import { useEffect, useState } from "react";
import { SignMessageReturnType, toBytes } from "viem";
import { useWalletClient } from "wagmi";
import getNonce from "~~/helpers/getNonce";
import getSocialManagementDigest from "~~/helpers/getSocialManagementDigest";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface SupportSocialProposalProps {
  fundRunId: number;
  socialProposalId: number;
  proposedBy: string;
  postText: string;
}

export const SupportSocialProposal = (sp: SupportSocialProposalProps) => {
  const [supportSignature, setSupportSignature] = useState<SignMessageReturnType>();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (supportSignature !== undefined) {
      writeAsync();
    }
  }, [supportSignature]);

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getSocialManagementNonce",
    args: [sp.fundRunId],
  });

  const supportProposal = async () => {
    const nonce = getNonce(fundRunNonce);
    const digest = await getSocialManagementDigest(nonce, sp.postText, sp.proposedBy);

    const proposalSupportSig: any = await walletClient?.signMessage({
      account: walletClient.account,
      message: { raw: toBytes(digest) },
    });
    setSupportSignature(proposalSupportSig);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "supportSocialProposal",
    args: [supportSignature, sp?.fundRunId, sp?.socialProposalId],
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
