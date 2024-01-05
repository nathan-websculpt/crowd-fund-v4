import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DonationsTable } from "~~/components/queries/donationsTable/DonationsTable";
import { DonorWithdrawalsTable } from "~~/components/queries/donorWithdrawalsTable/DonorWithdrawalsTable";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";
import { OwnerWithdrawalsTable } from "~~/components/queries/ownerWithdrawalsTable/OwnerWithdrawalsTable";
import { ProposalsSnapshotTable } from "~~/components/queries/proposalsSnapshotTable/ProposalsSnapshotTable";
import { SignersSnapshotTable } from "~~/components/queries/signersSnapshotTable/SignersSnapshotTable";

const QueriesPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Query Data" />

      <div className="container mx-auto my-10 overflow-auto">
        <FundRunsTable />
      </div>

      <div className="container mx-auto my-10 overflow-auto">
        <ProposalsSnapshotTable />
      </div>

      <div className="container mx-auto my-10 overflow-auto">
        <SignersSnapshotTable />
      </div>

      <div className="container mx-auto my-10 overflow-auto">
        <DonationsTable />
      </div>

      <div className="container mx-auto my-10 overflow-auto">
        <OwnerWithdrawalsTable />
      </div>

      <div className="container mx-auto my-10 overflow-auto">
        <DonorWithdrawalsTable />
      </div>
    </>
  );
};
export default QueriesPage;
