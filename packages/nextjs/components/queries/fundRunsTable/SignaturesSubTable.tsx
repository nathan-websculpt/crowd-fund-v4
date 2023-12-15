//IF THIS DOESN'T END UP CHANGING, IT CAN BE DELETED BECAUSE /proposals/SignaturesSubTable.tsx is the same
interface SignaturesSubTableProps {
  signatures: [];
}

export const SignaturesSubTable = (thisProposal: SignaturesSubTableProps) => {
  return (
    <>
      <table className="table w-full text-xl bg-base-100 md:table-md table-sm">
        <thead>
          <tr className="text-sm rounded-xl text-base-content">
            <th className="bg-primary">Signer</th>
            <th className="bg-primary">Signature</th>
          </tr>
        </thead>
        <tbody>
          {thisProposal?.signatures?.map(sig => (
            <tr key={sig?.id}>
              <td className="w-1/12 md:py-4">{sig?.signer}</td>
              <td className="w-1/12 md:py-4">{sig?.signature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
