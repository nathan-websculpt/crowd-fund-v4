import {
  ContractOwnerWithdrawal as ContractOwnerWithdrawalEvent,
  Donation as DonationEvent,
  DonorWithdrawal as DonorWithdrawalEvent,
  FundRun as FundRunEvent,
  FundRunOwnerWithdrawal as FundRunOwnerWithdrawalEvent,
  MultisigTransfer as MultisigTransferEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Proposal as ProposalEvent,
  ProposalRevoke as ProposalRevokeEvent,
  ProposalSignature as ProposalSignatureEvent
} from "../generated/cfTestFive/cfTestFive"
import {
  ContractOwnerWithdrawal,
  Donation,
  DonorWithdrawal,
  FundRun,
  FundRunOwnerWithdrawal,
  MultisigTransfer,
  OwnershipTransferred,
  Proposal,
  ProposalRevoke,
  ProposalSignature
} from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleContractOwnerWithdrawal(
  event: ContractOwnerWithdrawalEvent
): void {
  let entity = new ContractOwnerWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contractOwner = event.params.contractOwner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.donor = event.params.donor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDonorWithdrawal(event: DonorWithdrawalEvent): void {
  let entity = new DonorWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.donor = event.params.donor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundRun(event: FundRunEvent): void {
  let entity = new FundRun(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fundRunId = event.params.fundRunId
  entity.title = event.params.title
  entity.target = event.params.target

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundRunOwnerWithdrawal(
  event: FundRunOwnerWithdrawalEvent
): void {
  let entity = new FundRunOwnerWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultisigTransfer(event: MultisigTransferEvent): void {
  let entity = new MultisigTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fundRunId = event.params.fundRunId
  entity.proposalId = event.params.proposalId
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposal(event: ProposalEvent): void {
  let entity = new Proposal(
    Bytes.fromHexString("proposals_").concat(Bytes.fromI32(event.params.proposalId))
  )
  entity.proposalId = event.params.proposalId
  entity.fundRunId = event.params.fundRunId
  entity.proposedBy = event.params.proposedBy
  entity.amount = event.params.amount
  entity.to = event.params.to
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalSignature(event: ProposalSignatureEvent): void {
  let entity = new ProposalSignature(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.signer = event.params.signer
  entity.signature = event.params.signature

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let proposalEntity = Proposal.load(Bytes.fromHexString("proposals_").concat(Bytes.fromI32(event.params.proposalId)))
  if(proposalEntity !== null) {
    entity.proposal = Bytes.fromHexString("proposals_").concat(Bytes.fromI32(event.params.proposalId));
  }
  

  entity.save()
}

export function handleProposalRevoke(event: ProposalRevokeEvent): void {
  let entity = new ProposalRevoke(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fundRunId = event.params.fundRunId
  entity.proposalId = event.params.proposalId
  entity.to = event.params.to
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
