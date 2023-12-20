import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface OwnerWithdrawalRowProps {
  owner: string;
  grossWithdrawAmount: bigint;
  netWithdrawAmount: bigint;
  contractProfit: bigint;
  fundRunTitle: string;
}

export const OwnerWithdrawalsRow = (thisOwnerWithdrawal: OwnerWithdrawalRowProps) => {
  return (
    <>
      <tr>
        <td>
          <Address address={thisOwnerWithdrawal?.owner} size="sm" />
        </td>
        <td>{formatEther(thisOwnerWithdrawal?.grossWithdrawAmount)}</td>
        <td>{formatEther(thisOwnerWithdrawal?.netWithdrawAmount)}</td>
        <td>{formatEther(thisOwnerWithdrawal?.contractProfit)}</td>
        <td>{thisOwnerWithdrawal?.fundRunTitle}</td>
      </tr>
    </>
  );
};
