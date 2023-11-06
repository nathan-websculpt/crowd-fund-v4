import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface RevokeProposalProps {
  fundRunId: number;
  proposalId: number;
}

export const RevokeProposal = (proposal: RevokeProposalProps) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "revokeMultisigProposal",
    args: [proposal.fundRunId, proposal.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <td className="w-1/12 md:py-4">
        <button className="w-4/5 btn btn-primary" onClick={() => writeAsync()}>
          Revoke (only creator)
        </button>
      </td>
    </>
  );
};
