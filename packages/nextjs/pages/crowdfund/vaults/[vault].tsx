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
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const VaultPage: NextPage = () => {
  const router = useRouter();    
  const { vault } = router.query as { vault?: `${string}` }; //fundRunId
  
  const userAddress = useAccount();
  const [transferInput, setTransferInput] = useState("");
  const [toAddressInput, setToAddressInput] = useState("");
  const [creationSignature, setCreationSignature] = useState();


  const { data: walletClient } = useWalletClient();
  const { data: crowdFundContract } = useScaffoldContract({
    contractName: "CrowdFund",
    walletClient,
  });


  
  const { data: fundRunSingle } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getFundRun",
    args: vault, //fundRunId from query
  });

  const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
  });

  const getNewNonce = () => {return fundRunNonce !== undefined ? fundRunNonce + 1n : 0n};
  const readNonce = () => {return crowdFundContract?.read.nonce}
  const readSigList = () => {return crowdFundContract?.read.signatureList}
  const getDigest = async (
    nonce: bigint,
    amount: BigNumber,
    to: string,
    proposedBy: string,
    reason: string
) => {
    const tx = {amount, to, proposedBy, reason};
    const encoded = defaultAbiCoder.encode(["tuple(uint256,address,address,string)"],  [[tx.amount, tx.to, tx.proposedBy, tx.reason]]);
    const encodedWithNonce = solidityPack(["bytes", "uint256"], [encoded, nonce]);

    const digest= keccak256(encodedWithNonce);
    return digest;
}

const createProposal = async () => {
  const nonce = getNewNonce();
  const digest = await getDigest(nonce, parseEther(transferInput), toAddressInput, userAddress.address, "test proposal");
  console.log('digest', digest);
  setCreationSignature(await walletClient.signMessage(arrayify(digest)));
  signCreateProposal();
};


    
    const { signCreateProposal, isLoading } = useScaffoldContractWrite({
        contractName: "CrowdFund",
        functionName: "createMultisigProposal",
        args: [creationSignature, fundRunSingle?.id],
        onBlockConfirmation: txnReceipt => {
          console.log("📦 Transaction blockHash", txnReceipt.blockHash);
        },
      });

    const testtest = () => {
      console.log("fund run id: ", fundRunSingle?.id);
      console.log("reading Nonce: ", readNonce());
      console.log("reading Signature List: ", readSigList());
    };
  return (
  <>
  {fundRunSingle ? (
  <>
  <h1>got a fund run....</h1>

  <label className="mt-3 text-lg font-bold">To Address</label>
            <input
              type="text"
              placeholder="To Address"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={toAddressInput}
              onChange={e => setToAddressInput(e.target.value)}
            />{" "}
  <div className="mt-4 tooltip tooltip-primary" data-tip="Transfer amount in Ether ... like '0.1' or '1'">
                  <input
                    type="number"
                    placeholder="Transfer Amount"
                    className="max-w-xs input input-bordered input-accent"
                    onChange={e => setTransferInput(e.target.value)}
                  />
                </div>


  <button className="w-10/12 mx-auto mt-5 md:w-3/5 btn btn-primary" onClick={() => createProposal()}>
    Create a Proposal
  </button>
  <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary mt-9" onClick={() => testtest()}>
    TEST
  </button>
  </>
  ) : (<><h1>don't have a fund run</h1></>)}
  
  </>
  );
};

export default VaultPage;