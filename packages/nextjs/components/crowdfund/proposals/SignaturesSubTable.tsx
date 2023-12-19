import { Address } from "~~/components/scaffold-eth";
import { TSignature } from "~~/helpers/getTypes";

interface SignaturesSubTableProps {
  signatures: TSignature[];
}

export const SignaturesSubTable = (thisProposal: SignaturesSubTableProps) => {
  return (
    <>
      <table className="table w-full text-xl bg-base-200 md:table-md table-sm">
        <thead>
          <tr className="text-sm rounded-xl text-base-content">
            <th className="bg-primary">Signer</th>
            <th className="bg-primary">Signature</th>
          </tr>
        </thead>
        <tbody>
          {thisProposal?.signatures?.map(sig => (
            <tr key={sig?.id}>
              <td className="w-1/12 md:py-4">
                <Address address={sig?.signer} size="sm" />
              </td>
              <td className="max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{sig?.signature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
