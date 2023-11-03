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
          <CreateProposal fundRunId={fundRunSingle.id} />

          <hr />

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
