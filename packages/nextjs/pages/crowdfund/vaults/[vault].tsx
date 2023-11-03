/* eslint-disable prettier/prettier */
import { useRouter } from "next/router";
import { NextPage } from "next";
import { CreateProposal } from "~~/components/crowdfund/proposals/CreateProposal";
import { ListProposals } from "~~/components/crowdfund/proposals/ListProposals";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const VaultPage: NextPage = () => {
  const router = useRouter();
  const { vault } = router.query as { vault?: `${string}` }; //fundRunId

  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: vault, //fundRunId from query //todo: rename?
  });

  return (
    <>
      {fundRunSingle ? (
        <>
          <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2 sm:gap-5">
                <CreateProposal fundRunId={fundRunSingle.id} />
              </div>
            </div>
          </div>

          <ListProposals fundRunId={fundRunSingle.id} />
        </>
      ) : (
        <>
          <h1>No Fund Run Vault available</h1>
        </>
      )}
    </>
  );
};

export default VaultPage;
