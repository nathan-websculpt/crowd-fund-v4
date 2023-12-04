import {
    ContractOwnerWithdrawal as ContractOwnerWithdrawalEvent,
    DonationOccurred as DonationOccurredEvent,
    DonorWithdrawal as DonorWithdrawalEvent,
    FundRunCreated as FundRunCreatedEvent,
    FundRunOwnerWithdrawal as FundRunOwnerWithdrawalEvent,
    MultisigTransferCompleted as MultisigTransferCompletedEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    ProposalCreated as ProposalCreatedEvent,
    ProposalRevoked as ProposalRevokedEvent,
    ProposalSupported as ProposalSupportedEvent
  } from "../generated/crowdFundTestThree/crowdFundTestThree"
  import {
    ContractOwnerWithdrawal,
    DonationOccurred,
    DonorWithdrawal,
    FundRunCreated,
    FundRunOwnerWithdrawal,
    MultisigTransferCompleted,
    OwnershipTransferred,
    ProposalCreated,
    ProposalRevoked,
    ProposalSupported
  } from "../generated/schema"
  
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
  
  export function handleDonationOccurred(event: DonationOccurredEvent): void {
    let entity = new DonationOccurred(
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
  
  export function handleFundRunCreated(event: FundRunCreatedEvent): void {
    let entity = new FundRunCreated(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.crowdFundTestThree_id = event.params.id
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
  
  export function handleMultisigTransferCompleted(
    event: MultisigTransferCompletedEvent
  ): void {
    let entity = new MultisigTransferCompleted(
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
  
  export function handleProposalCreated(event: ProposalCreatedEvent): void {
    let entity = new ProposalCreated(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.proposedBy = event.params.proposedBy
    entity.signature = event.params.signature
    entity.fundRunId = event.params.fundRunId
    entity.proposalId = event.params.proposalId
    entity.amount = event.params.amount
    entity.to = event.params.to
    entity.reason = event.params.reason
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()
  }
  
  export function handleProposalRevoked(event: ProposalRevokedEvent): void {
    let entity = new ProposalRevoked(
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
  
  export function handleProposalSupported(event: ProposalSupportedEvent): void {
    let entity = new ProposalSupported(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.supportedBy = event.params.supportedBy
    entity.signature = event.params.signature
    entity.fundRunId = event.params.fundRunId
    entity.proposalId = event.params.proposalId
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()
  }
  