import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunsTable } from "~~/components/queries/FundRunsTable";

const QueriesPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Query Data" />
      <FundRunsTable />
    </>
  );
};
export default QueriesPage;
