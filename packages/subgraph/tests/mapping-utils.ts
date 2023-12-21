import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ContractOwnerWithdrawal,
  Donation,
  DonorWithdrawal,
  FundRun,
  FundRunStatusChange,
  MultisigTransfer,
  OwnerWithdrawal,
  OwnershipTransferred,
  Proposal,
  ProposalRevoke,
  ProposalSignature
} from "../generated/mapping/mapping"

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

export function createDonationEvent(
  fundRunId: i32,
  donor: Address,
  amount: BigInt
): Donation {
  let donationEvent = changetype<Donation>(newMockEvent())

  donationEvent.parameters = new Array()

  donationEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  donationEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donationEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donationEvent
}

export function createDonorWithdrawalEvent(
  fundRunId: i32,
  donor: Address,
  amount: BigInt
): DonorWithdrawal {
  let donorWithdrawalEvent = changetype<DonorWithdrawal>(newMockEvent())

  donorWithdrawalEvent.parameters = new Array()

  donorWithdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  donorWithdrawalEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donorWithdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donorWithdrawalEvent
}

export function createFundRunEvent(
  fundRunId: i32,
  owners: Array<Address>,
  title: string,
  description: string,
  target: BigInt,
  deadline: BigInt,
  amountCollected: BigInt,
  amountWithdrawn: BigInt,
  status: i32
): FundRun {
  let fundRunEvent = changetype<FundRun>(newMockEvent())

  fundRunEvent.parameters = new Array()

  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam("owners", ethereum.Value.fromAddressArray(owners))
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "amountCollected",
      ethereum.Value.fromUnsignedBigInt(amountCollected)
    )
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawn",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawn)
    )
  )
  fundRunEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return fundRunEvent
}

export function createFundRunStatusChangeEvent(
  fundRunId: i32,
  status: i32
): FundRunStatusChange {
  let fundRunStatusChangeEvent = changetype<FundRunStatusChange>(newMockEvent())

  fundRunStatusChangeEvent.parameters = new Array()

  fundRunStatusChangeEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  fundRunStatusChangeEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return fundRunStatusChangeEvent
}

export function createMultisigTransferEvent(
  proposalId: i32,
  fundRunId: i32,
  to: Address,
  netWithdrawAmount: BigInt,
  grossWithdrawAmount: BigInt
): MultisigTransfer {
  let multisigTransferEvent = changetype<MultisigTransfer>(newMockEvent())

  multisigTransferEvent.parameters = new Array()

  multisigTransferEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  multisigTransferEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  multisigTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  multisigTransferEvent.parameters.push(
    new ethereum.EventParam(
      "netWithdrawAmount",
      ethereum.Value.fromUnsignedBigInt(netWithdrawAmount)
    )
  )
  multisigTransferEvent.parameters.push(
    new ethereum.EventParam(
      "grossWithdrawAmount",
      ethereum.Value.fromUnsignedBigInt(grossWithdrawAmount)
    )
  )

  return multisigTransferEvent
}

export function createOwnerWithdrawalEvent(
  fundRunId: i32,
  owner: Address,
  netWithdrawAmount: BigInt,
  grossWithdrawAmount: BigInt
): OwnerWithdrawal {
  let ownerWithdrawalEvent = changetype<OwnerWithdrawal>(newMockEvent())

  ownerWithdrawalEvent.parameters = new Array()

  ownerWithdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  ownerWithdrawalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ownerWithdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "netWithdrawAmount",
      ethereum.Value.fromUnsignedBigInt(netWithdrawAmount)
    )
  )
  ownerWithdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "grossWithdrawAmount",
      ethereum.Value.fromUnsignedBigInt(grossWithdrawAmount)
    )
  )

  return ownerWithdrawalEvent
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

export function createProposalEvent(
  proposalId: i32,
  fundRunId: i32,
  proposedBy: Address,
  amount: BigInt,
  to: Address,
  reason: string,
  status: i32,
  signaturesRequired: BigInt,
  signaturesCount: i32
): Proposal {
  let proposalEvent = changetype<Proposal>(newMockEvent())

  proposalEvent.parameters = new Array()

  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "fundRunId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fundRunId))
    )
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposedBy",
      ethereum.Value.fromAddress(proposedBy)
    )
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "signaturesRequired",
      ethereum.Value.fromUnsignedBigInt(signaturesRequired)
    )
  )
  proposalEvent.parameters.push(
    new ethereum.EventParam(
      "signaturesCount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(signaturesCount))
    )
  )

  return proposalEvent
}

export function createProposalRevokeEvent(proposalId: i32): ProposalRevoke {
  let proposalRevokeEvent = changetype<ProposalRevoke>(newMockEvent())

  proposalRevokeEvent.parameters = new Array()

  proposalRevokeEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )

  return proposalRevokeEvent
}

export function createProposalSignatureEvent(
  proposalId: i32,
  signer: Address,
  signature: Bytes
): ProposalSignature {
  let proposalSignatureEvent = changetype<ProposalSignature>(newMockEvent())

  proposalSignatureEvent.parameters = new Array()

  proposalSignatureEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalId))
    )
  )
  proposalSignatureEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )
  proposalSignatureEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromBytes(signature))
  )

  return proposalSignatureEvent
}
