import { ProposalRow } from "./ProposalRow";

interface ProposalsSubTableProps {
  proposals: [];
}

export const ProposalsSubTable = (thisFundRun: ProposalsSubTableProps) => {
  return (
    <>
      <table className="table w-full text-xl bg-base-100 md:table-md table-sm">
        <thead>
          <tr className="text-sm rounded-xl text-base-content">
            <th className="bg-primary"></th>
            <th className="bg-primary">Status</th>
            <th className="bg-primary">ID</th>
            <th className="bg-primary">Amount</th>
            <th className="bg-primary">To</th>
            <th className="bg-primary">Proposed By</th>
            <th className="bg-primary">Reason</th>
          </tr>
        </thead>
        <tbody>
          {thisFundRun?.proposals?.map(proposal => (
            <>
              <ProposalRow
                key={proposal.id}
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
