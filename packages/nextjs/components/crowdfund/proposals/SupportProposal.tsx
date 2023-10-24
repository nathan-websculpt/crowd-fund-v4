import { useState } from "react";
import { BigNumber } from "ethers";
import { parseEther, defaultAbiCoder, solidityPack, keccak256, arrayify } from "ethers/lib/utils";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { useAccount, useWalletClient } from "wagmi";
import { SignMessageReturnType } from "viem";

/* eslint-disable prettier/prettier */
interface SupportProposalProps {
    id: number; //fundrun
    proposalId: number; //not needed?
}

export const SupportProposal = (proposal: SupportProposalProps) => {
    const userAddress = useAccount();
    const [transferInput, setTransferInput] = useState("0.1");
    const [toAddressInput, setToAddressInput] = useState("0xB7F675970703342938e58A6C8E76C6D47fC78FDA");
    const [proposedByAddressInput, setProposedByAddressInput] = useState("0xC4d53E07a6521EA73759D1541070BEf3C0823809");
    const [supportSignature, setSupportSignature] = useState<SignMessageReturnType>();
    const [proposalIdInput, setProposalIdInput] = useState<number>();

    const { data: walletClient } = useWalletClient();
    
  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "ProposalSupported",
    listener: logs => {
      logs.map(log => {
        const { supportedBy, fundRunId, proposalId } = log.args;
        console.log(
          "📡 New Proposal Supported Event \nSupported By:",
          supportedBy,
          "\Fund Run Id: ",
          fundRunId,
          "\nProposal Id: ",
          proposalId,
        );
      });
    },
  });

  


  
  //todo: refactor A:1
const { data: fundRunNonce } = useScaffoldContractRead({
contractName: "CrowdFund",
functionName: "getNonce",
});
  const getNewNonce = () => {return fundRunNonce !== undefined ? fundRunNonce + 1n : 0n}; //todo: refactor
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
}//todo: refactor A:1




  const supportProposal = async () => {
    const nonce = getNewNonce();          //TODO: get from the proposal and To Address
    const digest = await getDigest(nonce, parseEther(transferInput), toAddressInput, proposedByAddressInput, "test proposal");
    console.log('digest', digest);
    console.log('wallet client', walletClient?.account);
    const proposalSupportSig:any = 
      await walletClient?.signMessage(
        {
          account: walletClient.account, 
          message: {raw: arrayify(digest)}
        });
    console.log(proposalSupportSig);
    
    setSupportSignature(proposalSupportSig);

  };
  const {writeAsync, isLoading} = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "supportMultisigProposal",
    args: [supportSignature, proposal?.id, proposal?.proposalId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  
  return (
    <>
    <div className="mt-12">
        <h1>SUPPORT A PROPOSAL (SupportProposal.tsx)</h1>

        <label className="mt-3 text-lg font-bold">Proposal Id</label>
                <input
                    type="number"
                    placeholder="Proposal ID"
                    className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                    value={proposalIdInput}
                    onChange={e => setProposalIdInput(parseInt(e.target.value))}
                />{" "}

        <button className="w-10/12 mx-auto mt-5 md:w-3/5 btn btn-primary" onClick={() => supportProposal()}>
        {/* Create a Proposal */}
        First Click
        </button>
        <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary mt-9" onClick={() => writeAsync()}>
        Second Click
        </button> 
    </div>
    </>
  )
}