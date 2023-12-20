import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DonationsTable } from "~~/components/queries/donationsTable/DonationsTable";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";
import { OwnerWithdrawalsTable } from "~~/components/queries/ownerWithdrawalsTable/ownerWithdrawalsTable";
import { ProposalsSnapshotTable } from "~~/components/queries/proposalsSnapshotTable/ProposalsSnapshotTable";
import { SignersSnapshotTable } from "~~/components/queries/signersSnapshotTable/SignersSnapshotTable";

const QueriesPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Query Data" />

      <div className="container mx-auto my-10 overflow-scroll">
        <FundRunsTable />
      </div>

      <div className="container mx-auto my-10 overflow-scroll">
        <ProposalsSnapshotTable />
      </div>

      <div className="container mx-auto my-10 overflow-scroll">
        <SignersSnapshotTable />
      </div>

      <div className="container mx-auto my-10 overflow-scroll">
        <DonationsTable />
      </div>

      <div className="container mx-auto my-10 overflow-scroll">
        <OwnerWithdrawalsTable />
      </div>
    </>
  );
};
export default QueriesPage;
