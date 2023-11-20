import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { CreateFundRun } from "~~/components/crowdfund/CreateFundRun";

const StartFundRun: NextPage = () => {
  return (
    <>
      <MetaHeader title="Start your Fund Run" />
      <CreateFundRun />
    </>
  );
};

export default StartFundRun;
