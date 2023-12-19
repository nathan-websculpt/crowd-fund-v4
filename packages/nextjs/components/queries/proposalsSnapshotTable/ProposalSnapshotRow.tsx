import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface ProposalSnapshotRowProps {
  id: string;
  proposalId: number;
  status: number;
  amount: bigint;
  to: string;
  proposedBy: string;
  reason: string;
  fundRunTitle: string;
  remainingEther: bigint;
}

export const ProposalSnapshotRow = (thisProposal: ProposalSnapshotRowProps) => {
  return (
    <>
      <tr>
        <td className="text-center">
          {thisProposal?.status === 0 && <>😄</>}
          {thisProposal?.status === 1 && <>🤝</>}
          {thisProposal?.status === 2 && <>✅</>}
          {thisProposal?.status === 3 && <>❌</>}
        </td>
        <td>
          <Address address={thisProposal?.to} size="sm" />
        </td>
        <td>
          <Address address={thisProposal?.proposedBy} size="sm" />
        </td>
        <td className="text-center">{formatEther(thisProposal?.amount)}</td>
        <td>{thisProposal?.reason}</td>
        <td>{thisProposal?.fundRunTitle}</td>
        <td className="text-center">{formatEther(thisProposal?.remainingEther)}</td>
      </tr>
    </>
  );
};
