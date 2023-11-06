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
        <div className="flex justify-center w-11/12 mt-9 max-w-11/12 sm:mx-auto">
          <div className="w-full overflow-x-auto shadow-2xl rounded-xl">
            <h1>Support or Finalize an Existing Proposal</h1>
            <p>😄 - Created</p>
            <p>🤝 - Supported</p>
            <p>✅ - Tx Sent</p>
            <table className="table w-full text-xl bg-base-100 table-zebra md:table-md table-sm">
              <thead>
                <tr className="text-sm rounded-xl text-base-content">
                  <th className="bg-primary">Status</th>
                  <th className="bg-primary">ID</th>
                  <th className="bg-primary">Amount</th>
                  <th className="bg-primary">To</th>
                  <th className="bg-primary">Proposed By</th>
                  <th className="bg-primary">Reason</th>
                  <th className="bg-primary">Submit Support</th>
                  <th className="bg-primary">Finalize</th>
                  <th className="bg-primary">Revoke</th>
                </tr>
              </thead>
              <tbody>
                {vaultProposals?.map(vp => (
                  vp.to !== "0x0000000000000000000000000000000000000000"
                  && vp.proposedBy !== "0x0000000000000000000000000000000000000000"
                  ? (
                  <tr
                    className={`text-sm hover ${vp.status == 1 ? "bg-base-200":""} ${vp.status == 2 ? "bg-neutral text-primary":""}`}
                    key={vp.proposalId.toString()}
                  >
                    <SingleProposal
                      proposalId={vp.proposalId}
                      fundRunId={frVault.fundRunId}
                      status={vp.status}
                      amount={vp.amount}
                      to={vp.to}
                      proposedBy={vp.proposedBy}
                      reason={vp.reason}
                    />
                  </tr>
                ): null 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};
