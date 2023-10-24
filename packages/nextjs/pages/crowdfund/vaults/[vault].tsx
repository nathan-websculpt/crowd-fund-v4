/* eslint-disable prettier/prettier */


// todo: 
// get nonce, 
// ethers.utils.defaultAbiCoder.encode(["tuple(uint256,address,address)"]
// ethers.utils.solidityPack(["bytes", "uint256"], [encoded, nonce]);
// const digest= ethers.utils.keccak256(encodedWithNonce);
// .signMessage(ethers.utils.arrayify(digest)
// await crowdFund.connect(signer).multisigWithdraw(tx, nonce, signatures, fundRunID);
//    ^^^^ NEED VIEM migration code ^^^



import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import { formatEther, parseEther, defaultAbiCoder, solidityPack, keccak256, arrayify } from "ethers/lib/utils";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { SignMessageReturnType } from "viem";
import { CreateProposal } from "~~/components/crowdfund/proposals/CreateProposal";
import { SupportProposal } from "~~/components/crowdfund/proposals/SupportProposal";
import { FinalizeProposal } from "~~/components/crowdfund/proposals/FinalizeProposal";

const VaultPage: NextPage = () => {
  const router = useRouter();    
  const { vault } = router.query as { vault?: `${string}` }; //fundRunId

  const userAddress = useAccount();
  const [transferInput, setTransferInput] = useState("");
  const [toAddressInput, setToAddressInput] = useState("");
  const [creationSignature, setCreationSignature] = useState<SignMessageReturnType>();
  

  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: vault, //fundRunId from query
  }); 
  const { data: walletClient } = useWalletClient();
  const { data: crowdFundContract } = useScaffoldContract({
    contractName: "CrowdFund",
    walletClient,
  });



  return (
  <>
  {fundRunSingle ? (
  <>
 
 <CreateProposal id={fundRunSingle.id}/>

<hr />

 <SupportProposal id={fundRunSingle.id} proposalId={0}/>

<hr />

 <FinalizeProposal id={fundRunSingle.id} proposalId={0}/>
  </>
  ) : (<><h1>don't have a fund run</h1></>)}
 
  </>
  );
};

export default VaultPage;