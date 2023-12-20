import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface DonationRowProps {
  id: string;
  donor: string;
  amount: bigint;
  fundRunTitle: string;
}

export const DonationRow = (thisDonation: DonationRowProps) => {
  return (
    <>
      <tr>
        <td>
          <Address address={thisDonation?.donor} size="sm" />
        </td>
        <td>{formatEther(thisDonation?.amount)}</td>
        <td>{thisDonation?.fundRunTitle}</td>
      </tr>
    </>
  );
};
