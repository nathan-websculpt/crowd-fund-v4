import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface DonorWithdrawalRowProps {
  donor: string;
  amount: bigint;
  fundRunTitle: string;
}

export const DonorWithdrawalsRow = (thisDonorWithdrawal: DonorWithdrawalRowProps) => {
  return (
    <>
      <tr>
        <td>
          <Address address={thisDonorWithdrawal?.donor} size="sm" />
        </td>
        <td>{formatEther(thisDonorWithdrawal?.amount)}</td>
        <td>{thisDonorWithdrawal?.fundRunTitle}</td>
      </tr>
    </>
  );
};
