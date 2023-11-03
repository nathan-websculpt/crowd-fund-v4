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
      <div className="flex justify-center px-4 md:px-0">
      <div className="w-full overflow-x-auto shadow-2xl rounded-xl">
        <table className="table w-full text-xl bg-base-100 table-zebra md:table-md table-sm">
          <thead>
            <tr className="text-sm rounded-xl text-base-content">
              <th className="bg-primary">ID</th>
              <th className="bg-primary">Amount</th>
              <th className="bg-primary">To</th>
              <th className="bg-primary">Proposed By</th>
              <th className="bg-primary">Reason</th>
              <th className="bg-primary">Co-sign</th>
              <th className="bg-primary">Submit Support</th>
              <th className="bg-primary">Finalize (first)</th>
              <th className="bg-primary">Finalize (second)</th>
            </tr>
          </thead>
<tbody>
        {vaultProposals?.map(vp => (
      <tr className="h-12 text-sm transition-colors duration-200 bg-base-200 hover:bg-base-300"
            key={vp.proposalId.toString()}
          >
            <SingleProposal
              proposalId={vp.proposalId}
              fundRunId={frVault.fundRunId}
              amount={vp.amount}
              to={vp.to}
              proposedBy={vp.proposedBy}
              reason={vp.reason}
            />
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
      </>
    );
  }
};
