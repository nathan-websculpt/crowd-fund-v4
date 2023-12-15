import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";

const QueriesPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Query Data" />
      <FundRunsTable />
    </>
  );
};
export default QueriesPage;
