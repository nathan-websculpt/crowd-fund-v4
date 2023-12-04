import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/crowdFundTestTwo/crowdFundTestTwo"

export function createContractOwnerWithdrawalEvent(
  contractOwner: Address,
  amount: BigInt
): ContractOwnerWithdrawal {
  let contractOwnerWithdrawalEvent = changetype<ContractOwnerWithdrawal>(
    newMockEvent()
  )

  contractOwnerWithdrawalEvent.parameters = new Array()

  contractOwnerWithdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "contractOwner",
      ethereum.Value.fromAddress(contractOwner)
    )
  )
  contractOwnerWithdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return contractOwnerWithdrawalEvent
}

export function createDonationOccurredEvent(
  donor: Address,
  amount: BigInt
): DonationOccurred {
  let donationOccurredEvent = changetype<DonationOccurred>(newMockEvent())

  donationOccurredEvent.parameters = new Array()

  donationOccurredEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donationOccurredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donationOccurredEvent
}

export function createDonorWithdrawalEvent(
  donor: Address,
  amount: BigInt
): DonorWithdrawal {
  let donorWithdrawalEvent = changetype<DonorWithdrawal>(newMockEvent())

  donorWithdrawalEvent.parameters = new Array()

  donorWithdrawalEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donorWithdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donorWithdrawalEvent
}

export function createFundRunCreatedEvent(
  id: i32,
  title: string,
  target: BigInt
): FundRunCreated {
  let fundRunCreatedEvent = changetype<FundRunCreated>(newMockEvent())

  fundRunCreatedEvent.parameters = new Array()

  fundRunCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "id",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id))
    )
  )
  fundRunCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  fundRunCreatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )

  return fundRunCreatedEvent
}

export function createFundRunOwnerWithdrawalEvent(
  amount: BigInt
): FundRunOwnerWithdrawal {
  let fundRunOwnerWithdrawalEvent = changetype<FundRunOwnerWithdrawal>(
    newMockEvent()
  )

  fundRunOwnerWithdrawalEvent.parameters = new Array()

  fundRunOwnerWithdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundRunOwnerWithdrawalEvent
}

export function createMultisigTransferCompletedEvent(
  fundRunId: i32,
  proposalId: i32,
  to: Address,
  amount: BigInt
): MultisigTransferCompleted {
  let multisigTransferCompletedEvent = changetype<MultisigTransferCompleted>(
    newMockEvent()
  )

  multisigTransferCompletedEvent.parameters = new Array()

  multisigTransferCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  multisigTransferCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  multisigTransferCompletedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  multisigTransferCompletedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return multisigTransferCompletedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProposalCreatedEvent(
  proposedBy: Address,
  signature: Bytes,
  fundRunId: i32,
  proposalId: i32,
  amount: BigInt,
  to: Address,
  reason: string
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposedBy",
      ethereum.Value.fromAddress(proposedBy)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromBytes(signature))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return proposalCreatedEvent
}

export function createProposalRevokedEvent(
  fundRunId: i32,
  proposalId: i32,
  to: Address,
  reason: string
): ProposalRevoked {
  let proposalRevokedEvent = changetype<ProposalRevoked>(newMockEvent())

  proposalRevokedEvent.parameters = new Array()

  proposalRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  proposalRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  proposalRevokedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  proposalRevokedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return proposalRevokedEvent
}

export function createProposalSupportedEvent(
  supportedBy: Address,
  signature: Bytes,
  fundRunId: i32,
  proposalId: i32
): ProposalSupported {
  let proposalSupportedEvent = changetype<ProposalSupported>(newMockEvent())

  proposalSupportedEvent.parameters = new Array()

  proposalSupportedEvent.parameters.push(
    new ethereum.EventParam(
      "supportedBy",
      ethereum.Value.fromAddress(supportedBy)
    )
  )
  proposalSupportedEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromBytes(signature))
  )
  proposalSupportedEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  proposalSupportedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )

  return proposalSupportedEvent
}
