import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";
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
    </>
  );
};
export default QueriesPage;
