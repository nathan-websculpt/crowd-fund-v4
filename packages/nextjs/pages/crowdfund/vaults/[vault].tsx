import { useRouter } from "next/router";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { CreateProposal } from "~~/components/crowdfund/proposals/CreateProposal";
import { ListProposals } from "~~/components/crowdfund/proposals/ListProposals";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const VaultPage: NextPage = () => {
  const router = useRouter();
  const { vault } = router.query as { vault?: `${string}` }; //fundRunId

  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: vault,
  });

  return (
    <>
      <MetaHeader title="Multisig Vault" />
      {fundRunSingle ? (
        <>
          <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
            <div className="flex items-center justify-center">
              <CreateProposal fundRunId={fundRunSingle.id} title={fundRunSingle.title} />
            </div>
          </div>

          <ListProposals fundRunId={fundRunSingle.id} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            <Spinner width="150px" height="150px" />
          </div>
        </>
      )}
    </>
  );
};

export default VaultPage;
