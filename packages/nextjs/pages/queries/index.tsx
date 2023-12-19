import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";
import { ProposalsSnapshotTable } from "~~/components/queries/proposalsSnapshotTable/ProposalsSnapshotTable";

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
    </>
  );
};
export default QueriesPage;
