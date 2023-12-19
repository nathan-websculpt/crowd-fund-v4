import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface SignerSnapshotRowProps {
  id: string;
  signer: string;
  to: string;
  amount: bigint;
  reason: string;
}

export const SignerSnapshotRow = (thisSig: SignerSnapshotRowProps) => {
  return (
    <>
      <tr key={thisSig?.id}>
        <td>
          <Address address={thisSig?.signer} size="sm" />
        </td>
        <td>
          <Address address={thisSig?.to} size="sm" />
        </td>
        <td className="text-center">{formatEther(thisSig?.amount)}</td>
        <td>{thisSig?.reason}</td>
      </tr>
    </>
  );
};
