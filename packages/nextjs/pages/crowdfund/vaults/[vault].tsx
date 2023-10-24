/* eslint-disable prettier/prettier */
import { useRouter } from "next/router";
import { NextPage } from "next";
import { CreateProposal } from "~~/components/crowdfund/proposals/CreateProposal";
import { FinalizeProposal } from "~~/components/crowdfund/proposals/FinalizeProposal";
import { SupportProposal } from "~~/components/crowdfund/proposals/SupportProposal";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const VaultPage: NextPage = () => {
  const router = useRouter();
  const { vault } = router.query as { vault?: `${string}` }; //fundRunId

  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: vault, //fundRunId from query
  });

  return (
    <>
      {fundRunSingle ? (
        <>
          <CreateProposal id={fundRunSingle.id} />

          <hr />

          <SupportProposal id={fundRunSingle.id} proposalId={0} />

          <hr />

          <FinalizeProposal id={fundRunSingle.id} proposalId={0} />
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
