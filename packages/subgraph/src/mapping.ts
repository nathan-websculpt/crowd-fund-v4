import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import {
  ContractOwnerWithdrawal as ContractOwnerWithdrawalEvent,
  Donation as DonationEvent,
  FundRun as FundRunEvent,
  MultisigTransfer as MultisigTransferEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Proposal as ProposalEvent,
  SocialProposal as SocialProposalEvent,
  ProposalRevoke as ProposalRevokeEvent,
  ProposalSignature as ProposalSignatureEvent,
  SocialProposalSignature as SocialProposalSignatureEvent,
  SocialPost as SocialPostEvent,
  SocialProposalRevoke as SocialProposalRevokeEvent,
  Follow as FollowEvent,
  Unfollow as UnfollowEvent,
  Comment as CommentEvent,
} from "../generated/CrowdFund/CrowdFund";
import {
  ContractOwnerWithdrawal,
  Donation,
  FundRun,
  MultisigTransfer,
  OwnershipTransferred,
  Proposal,
  SocialProposal,
  ProposalRevoke,
  ProposalSignature,
  SocialProposalSignature,
  SocialPost,
  SocialProposalRevoke,
  Follow,
  Unfollow,
  Comment,
} from "../generated/schema";

export function handleContractOwnerWithdrawal(
  event: ContractOwnerWithdrawalEvent
): void {
  let entity = new ContractOwnerWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contractOwner = event.params.contractOwner;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fundRunId = event.params.fundRunId;
  entity.donor = event.params.donor;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let fundRunEntity = FundRun.load(
    Bytes.fromHexString("fundruns__").concat(
      Bytes.fromI32(event.params.fundRunId)
    )
  );
  if (fundRunEntity !== null) {
    fundRunEntity.amountCollected = fundRunEntity.amountCollected.plus(
      entity.amount
    );
    entity.fundRun = fundRunEntity.id;
    fundRunEntity.save();
  }
  entity.save();
}

export function handleFundRun(event: FundRunEvent): void {
  let entity = new FundRun(
    Bytes.fromHexString("fundruns__").concat(
      Bytes.fromI32(event.params.fundRunId)
    )
  );
  entity.fundRunId = event.params.fundRunId;
  entity.owners = changetype<Bytes[]>(event.params.owners);
  entity.title = event.params.title;
  entity.description = event.params.description;
  entity.amountCollected = event.params.amountCollected;
  entity.amountWithdrawn = event.params.amountWithdrawn;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMultisigTransfer(event: MultisigTransferEvent): void {
  let entity = new MultisigTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.fundRunId = event.params.fundRunId;
  entity.to = event.params.to;
  entity.netWithdrawAmount = event.params.netWithdrawAmount;
  entity.grossWithdrawAmount = event.params.grossWithdrawAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let proposalEntity = Proposal.load(
    Bytes.fromHexString("proposals_").concat(
      Bytes.fromI32(event.params.proposalId)
    )
  );
  if (proposalEntity !== null) {
    proposalEntity.status = 2;
    proposalEntity.save();

    let fundRunEntity = FundRun.load(
      Bytes.fromHexString("fundruns__").concat(
        Bytes.fromI32(event.params.fundRunId)
      )
    );
    if (fundRunEntity !== null) {
      fundRunEntity.amountWithdrawn = fundRunEntity.amountWithdrawn.plus(
        event.params.grossWithdrawAmount
      );
      fundRunEntity.save();
    }
  }

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposal(event: ProposalEvent): void {
  let entity = new Proposal(
    Bytes.fromHexString("proposals_").concat(
      Bytes.fromI32(event.params.proposalId)
    )
  );
  entity.proposalId = event.params.proposalId;
  entity.fundRunId = event.params.fundRunId;
  entity.proposedBy = event.params.proposedBy;
  entity.amount = event.params.amount;
  entity.to = event.params.to;
  entity.reason = event.params.reason;
  entity.status = event.params.status;
  entity.signaturesRequired = event.params.signaturesRequired;
  entity.signaturesCount = event.params.signaturesCount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let fundRunEntity = FundRun.load(
    Bytes.fromHexString("fundruns__").concat(
      Bytes.fromI32(event.params.fundRunId)
    )
  );
  if (fundRunEntity !== null) entity.fundRun = fundRunEntity.id;

  entity.save();
}

export function handleProposalSignature(event: ProposalSignatureEvent): void {
  let entity = new ProposalSignature(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.signer = event.params.signer;
  entity.signature = event.params.signature;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let proposalEntity = Proposal.load(
    Bytes.fromHexString("proposals_").concat(
      Bytes.fromI32(event.params.proposalId)
    )
  );
  if (proposalEntity !== null) {
    let newProposalCount = BigInt.fromI32(proposalEntity.signaturesCount + 1);

    if (proposalEntity.signaturesCount === 0) {
      proposalEntity.signaturesCount += 1;
    } else if (newProposalCount.equals(proposalEntity.signaturesRequired)) {
      proposalEntity.status = 1;
      proposalEntity.signaturesCount += 1;
      log.debug("debug one {}", [proposalEntity.signaturesCount.toString()]);
    } else {
      proposalEntity.signaturesCount += 1;
    }
    proposalEntity.save();
    entity.proposal = proposalEntity.id;
  } else {
    log.debug("debug three {}", [
      "NO PROPOSAL FOUND: handleProposalSignature() ~mapping",
    ]);
  }

  entity.save();
}

export function handleProposalRevoke(event: ProposalRevokeEvent): void {
  let entity = new ProposalRevoke(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let proposalEntity = Proposal.load(
    Bytes.fromHexString("proposals_").concat(
      Bytes.fromI32(event.params.proposalId)
    )
  );
  if (proposalEntity !== null) {
    proposalEntity.status = 3;
    proposalEntity.save();
  }

  entity.save();
}

export function handleSocialProposal(event: SocialProposalEvent): void {
  let entity = new SocialProposal(
    Bytes.fromHexString("socialproposals_").concat(
      Bytes.fromI32(event.params.socialProposalId)
    )
  );
  entity.socialProposalId = event.params.socialProposalId;
  entity.fundRunId = event.params.fundRunId;
  entity.proposedBy = event.params.proposedBy;
  entity.postText = event.params.postText;
  entity.status = event.params.status;
  entity.signaturesRequired = event.params.signaturesRequired;
  entity.signaturesCount = event.params.signaturesCount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let fundRunEntity = FundRun.load(
    Bytes.fromHexString("fundruns__").concat(
      Bytes.fromI32(event.params.fundRunId)
    )
  );
  if (fundRunEntity !== null) entity.fundRun = fundRunEntity.id;

  entity.save();
}

export function handleSocialProposalSignature(
  event: SocialProposalSignatureEvent
): void {
  let entity = new SocialProposalSignature(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.socialProposalId = event.params.socialProposalId;
  entity.signer = event.params.signer;
  entity.signature = event.params.signature;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let socialProposalEntity = SocialProposal.load(
    Bytes.fromHexString("socialproposals_").concat(
      Bytes.fromI32(event.params.socialProposalId)
    )
  );
  if (socialProposalEntity !== null) {
    let newProposalCount = BigInt.fromI32(
      socialProposalEntity.signaturesCount + 1
    );

    if (socialProposalEntity.signaturesCount === 0) {
      socialProposalEntity.signaturesCount += 1;
    } else if (
      newProposalCount.equals(socialProposalEntity.signaturesRequired)
    ) {
      socialProposalEntity.status = 1;
      socialProposalEntity.signaturesCount += 1;
      log.debug("debug one {}", [
        socialProposalEntity.signaturesCount.toString(),
      ]);
    } else {
      socialProposalEntity.signaturesCount += 1;
    }
    socialProposalEntity.save();
    entity.socialProposal = socialProposalEntity.id;
  } else {
    log.debug("debug three {}", [
      "NO SOCIAL PROPOSAL FOUND: handleSocialProposalSignature() ~mapping",
    ]);
  }

  entity.save();
}

export function handleSocialProposalRevoke(
  event: SocialProposalRevokeEvent
): void {
  let entity = new SocialProposalRevoke(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.socialProposalId = event.params.socialProposalId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let socialProposalEntity = SocialProposal.load(
    Bytes.fromHexString("socialproposals_").concat(
      Bytes.fromI32(event.params.socialProposalId)
    )
  );
  if (socialProposalEntity !== null) {
    socialProposalEntity.status = 3;
    socialProposalEntity.save();
  }

  entity.save();
}

export function handleSocialPost(event: SocialPostEvent): void {
  let entity = new SocialPost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.socialProposalId = event.params.socialProposalId;
  entity.fundRunId = event.params.fundRunId;
  entity.proposedBy = event.params.proposedBy;
  entity.postText = event.params.postText;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let proposalEntity = SocialProposal.load(
    Bytes.fromHexString("socialproposals_").concat(
      Bytes.fromI32(event.params.socialProposalId)
    )
  );
  if (proposalEntity !== null) {
    proposalEntity.status = 2;
    proposalEntity.save();
  }
  let fundRunEntity = FundRun.load(
    Bytes.fromHexString("fundruns__").concat(Bytes.fromI32(entity.fundRunId))
  );
  if (fundRunEntity !== null){ 
    entity.fundRunTitle = fundRunEntity.title;
    entity.fundRun = fundRunEntity.id;
  }

  entity.save();
}

export function handleFollow(event: FollowEvent): void {
  //ID is user address and the fundrun Id
  let entity = new Follow(
    Bytes.fromHexString("followers_").concat(
      event.params.user.concat(Bytes.fromI32(event.params.fundRunId))
    )
  );
  entity.fundRunId = event.params.fundRunId;
  entity.user = event.params.user;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let fundRunEntity = FundRun.load(
    Bytes.fromHexString("fundruns__").concat(
      Bytes.fromI32(event.params.fundRunId)
    )
  );
  if (fundRunEntity !== null) entity.fundRun = fundRunEntity.id;

  entity.save();
}

export function handleUnfollow(event: UnfollowEvent): void {
  let entity = new Unfollow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fundRunId = event.params.fundRunId;
  entity.user = event.params.user;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let followEntity = Follow.load(
    Bytes.fromHexString("followers_").concat(
      event.params.user.concat(Bytes.fromI32(event.params.fundRunId))
    )
  );
  if (followEntity !== null) {
    followEntity.fundRun = null;
    followEntity.save();
  }

  entity.save();
}

export function handleComment(event: CommentEvent): void {
  let entity = new Comment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.commentId = event.params.commentId;
  entity.commentText = event.params.commentText;
  entity.commenter = event.params.commenter;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let postEntity = SocialPost.load(event.params.postId);
  if(postEntity !== null) {
    entity.socialPost = postEntity.id;
  }

  entity.save();
}
