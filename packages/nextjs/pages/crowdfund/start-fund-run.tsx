import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { CreateFund } from "~~/components/crowdfund/CreateFund";

const StartFundRun: NextPage = () => {
  return (
    <>
      <MetaHeader title="Start your Fund Run" />
      <CreateFund />
    </>
  );
};

export default StartFundRun;
