import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunsTable } from "~~/components/queries/fundRunsTable/FundRunsTable";

const QueriesPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Query Data" />

      <div className="container mx-auto my-10">
        <FundRunsTable />
      </div>
    </>
  );
};
export default QueriesPage;
