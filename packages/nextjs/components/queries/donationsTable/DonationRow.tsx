import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface DonationRowProps {
  id: string;
  fundRunId: number;
  donor: string;
  amount: bigint;
}

export const DonationRow = (thisDonation: DonationRowProps) => {
  return (
    <>
      <tr>
        <td>
          <Address address={thisDonation?.donor} size="sm" />
        </td>
        <td>{formatEther(thisDonation?.amount)}</td>
        <td>{thisDonation?.fundRunId}</td>
      </tr>
    </>
  );
};
