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
    args: vault, //fundRunId from query
  });

  return (
    <>
      {fundRunSingle ? (
        <>
          <CreateProposal id={fundRunSingle.id} />

          <hr />

          {/* <SupportProposal id={fundRunSingle.id} proposalId={0} /> */}

          <hr />

          {/* <FinalizeProposal id={fundRunSingle.id} proposalId={0} /> */}

          <hr />

          <ListProposals id={fundRunSingle.id} />
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
