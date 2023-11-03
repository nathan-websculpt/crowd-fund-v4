/* eslint-disable prettier/prettier */
import { SingleProposal } from "./SingleProposal";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface ListProposalProps {
  fundRunId: number; //fundrun
}
export const ListProposals = (frVault: ListProposalProps) => {
  const { data: vaultProposals, isLoading: isListLoading } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getProposals",
    args: [frVault.fundRunId],
  });

  if (isListLoading) {
    return (
      <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        {vaultProposals?.map(vp => (
          <div
            key={vp.proposalId.toString()}
            className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg"
          >
            <SingleProposal
              proposalId={vp.proposalId}
              fundRunId={frVault.fundRunId}
              amount={vp.amount}
              to={vp.to}
              proposedBy={vp.proposedBy}
              reason={vp.reason}
            />
          </div>
        ))}
      </>
    );
  }
};
