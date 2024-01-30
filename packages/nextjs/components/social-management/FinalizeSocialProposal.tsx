import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import getNonce from "~~/helpers/getNonce";
import { GQL_SOCIAL_SIGNATURES } from "~~/helpers/getQueries";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface FinalizeSocialProposalProps {
  fundRunId: number;
  socialProposalId: number;
  proposedBy: string;
  postText: string;
}

export const FinalizeSocialProposal = (proposal: FinalizeSocialProposalProps) => {
  const [nonce, setNonce] = useState<bigint>();
  const tx = { postText: proposal.postText, proposedBy: proposal.proposedBy };

  const [signaturesList, setSignaturesList] = useState<string[]>();

  const [getProposal, { loading, error, data }] = useLazyQuery(GQL_SOCIAL_SIGNATURES());

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_SOCIAL_SIGNATURES Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (nonce !== undefined) {
      getProposal({ variables: { slug1: proposal.fundRunId, slug2: proposal.socialProposalId } });
    }
  }, [nonce]);

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      const thisArr = [];
      for (let i = 0; i < data.socialProposals[0].signatures.length; i++) {
        thisArr.push(data.socialProposals[0].signatures[i].signature);
      }
      setSignaturesList(thisArr);
    }
  }, [data]);

  useEffect(() => {
    if (signaturesList !== undefined && signaturesList.length > 0) {
      writeAsync();
    }
  }, [signaturesList]);

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getSocialManagementNonce",
    args: [proposal.fundRunId],
  });

  const finishProposal = () => {
    const nonce = getNonce(fundRunNonce);
    setNonce(nonce);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "finalizeAndPost",
    args: [tx, nonce, proposal.fundRunId, proposal.socialProposalId, signaturesList],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      setNonce(undefined);
    },
    onError: err => {
      console.log("Transaction Error Message", err?.message);
      setNonce(undefined);
    },
  });
  return (
    <>
      <td className="w-1/12 text-center md:py-4">
        <div className="tooltip tooltip-primary tooltip-top" data-tip="Done co-signing? Send the transaction.">
          <button className="w-full btn" onClick={() => finishProposal()} disabled={isLoading || loading}>
            {isLoading || loading ? <span className="loading loading-spinner loading-sm"></span> : <>Finalize</>}
          </button>
        </div>
      </td>
    </>
  );
};
