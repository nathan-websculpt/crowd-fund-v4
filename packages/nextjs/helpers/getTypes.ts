export type TSignature = { id: string; signer: string; signature: string };

export type TProposal = { id: string; proposalId: number; status: number; amount: bigint; to: string; proposedBy: string; reason: string; signatures: TSignature[]; };
