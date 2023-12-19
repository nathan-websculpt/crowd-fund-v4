import { ProposalRow } from "./ProposalRow";
import { TProposal } from "~~/helpers/getTypes";

interface ProposalsSubTableProps {
  proposals: TProposal[];
}

export const ProposalsSubTable = (thisFundRun: ProposalsSubTableProps) => {
  return (
    <>
      <table className="table w-full text-xl table-auto bg-base-200 table-md">
        <thead>
          <tr className="text-sm rounded-xl text-base-content">
            <th className="bg-primary"></th>
            <th className="text-center bg-primary">Status</th>
            <th className="text-center bg-primary">ID</th>
            <th className="text-center bg-primary">Amount</th>
            <th className="bg-primary">To</th>
            <th className="bg-primary">Proposed By</th>
            <th className="bg-primary">Reason</th>
          </tr>
        </thead>
        <tbody>
          {thisFundRun?.proposals?.map(proposal => (
            <>
              <ProposalRow
                id={proposal.id}
                proposalId={proposal.proposalId}
                status={proposal.status}
                amount={proposal.amount}
                to={proposal.to}
                proposedBy={proposal.proposedBy}
                reason={proposal.reason}
                signatures={proposal.signatures}
              />
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
