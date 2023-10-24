/* eslint-disable prettier/prettier */
import { useState } from "react";
import { BigNumber } from "ethers";
import { parseEther, defaultAbiCoder, solidityPack, keccak256, arrayify } from "ethers/lib/utils";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { useAccount, useWalletClient } from "wagmi";
import { SignMessageReturnType, formatEther } from "viem";


interface FinalizeProposalProps {
    id: number; //fundrun
    proposalId: number; //not needed?
}
export const FinalizeProposal = (proposal:FinalizeProposalProps) => {
    const userAddress = useAccount();
    const [transferInput, setTransferInput] = useState<bigint>(BigInt(100000000000000000));
    const [toAddressInput, setToAddressInput] = useState("0xB7F675970703342938e58A6C8E76C6D47fC78FDA");
    const [proposedByInput, setProposedByInput] = useState("0x3c4F8cb2ea3FFfFD8f9a1BEF9119F3E12ACC95d0");
    const [reasonInput, setReasonInput] = useState("test proposal");
    const [proposalIdInput, setProposalIdInput] = useState<number>();
    const [nonceInput, setNonceInput] = useState<bigint>();

    const { data: walletClient } = useWalletClient();


    const tx = {amount: transferInput, to: toAddressInput, proposedBy: proposedByInput, reason: reasonInput};
    //todo: refactor A:1
const { data: fundRunNonce } = useScaffoldContractRead({
    contractName: "CrowdFund",
    functionName: "getNonce",
    });
      const getNewNonce = () => {return fundRunNonce !== undefined ? fundRunNonce + 1n : 0n};

const finishProposal = () => {
    const nonce = getNewNonce();
    setNonceInput(nonce);
    console.log('nonce: ', nonce);
    console.log('tx: ', tx);
    console.log('fund run id: ', proposal.id);
    console.log('proposal id: ', proposalIdInput);
};

  const { writeAsync, isLoading } = useScaffoldContractWrite({
      contractName: "CrowdFund",
      functionName: "multisigWithdraw",
      args: [tx, nonceInput, proposal.id, proposalIdInput],
      onBlockConfirmation: txnReceipt => {
        console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      },
    });

    return (<>
        <div className="mt-12">
            <h1>Finalize A PROPOSAL (FinalizeProposal.tsx)</h1>
    
            <label className="mt-3 text-lg font-bold">Proposal Id</label>
                    <input
                        type="number"
                        placeholder="Proposal ID"
                        className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                        value={proposalIdInput}
                        onChange={e => setProposalIdInput(parseInt(e.target.value))}
                    />{" "}
    
    <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary mt-9" onClick={() => finishProposal()}>
            First Click
            </button> 
            <button className="w-10/12 mx-auto md:w-3/5 btn btn-primary mt-9" onClick={() => writeAsync()}>
            Second Click
            </button> 
        </div>
    </>)
};