import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FundRunDisplay } from "~~/components/crowdfund/FundRunDisplay";
import { FundRunDonate } from "~~/components/crowdfund/FundRunDonate";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const FundRunPage: NextPage = () => {
  const router = useRouter();
  const { fundRun } = router.query as { fundRun?: `${string}` };

  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: fundRun,
  });

  return (
    <>
      <MetaHeader title="Fund Run Viewer" />
      <div className="w-full px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:w-4/5 lg:w-2/5 sm:rounded-lg sm:px-10">
        <div className="flex justify-end mb-5">
          <Link href="/crowdfund/browse-fund-runs" passHref className="link">
            <button className="btn btn-sm btn-primary">View Other Fund Runs</button>
          </Link>
          <button className="ml-5 btn btn-sm btn-primary" onClick={() => router.back()}>
            Back
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            {fundRunSingle ? (
              <div>
                <FundRunDisplay
                  title={fundRunSingle.title}
                  description={fundRunSingle.description}
                  target={fundRunSingle.target}
                  deadline={fundRunSingle.deadline.toString()}
                  amountCollected={fundRunSingle.amountCollected}
                  amountWithdrawn={fundRunSingle.amountWithdrawn}
                  status={fundRunSingle.status}
                />

                <FundRunDonate id={fundRunSingle.id} owners={fundRunSingle.owners} />
              </div>
            ) : (
              <h1>Sorry! Nothing here.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FundRunPage;
