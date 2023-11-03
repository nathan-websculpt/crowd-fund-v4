// for signing digest of a multisig proposal (CreateProposal.tsx and SupportProposal.tsx)
const getNonce = (fundRunNonce: bigint) => {
  return fundRunNonce !== undefined ? fundRunNonce + 1n : 0n;
};

export default getNonce;
