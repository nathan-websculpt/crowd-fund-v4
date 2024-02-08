// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Comment extends ethereum.Event {
  get params(): Comment__Params {
    return new Comment__Params(this);
  }
}

export class Comment__Params {
  _event: Comment;

  constructor(event: Comment) {
    this._event = event;
  }

  get postId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get commentText(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class ContractOwnerWithdrawal extends ethereum.Event {
  get params(): ContractOwnerWithdrawal__Params {
    return new ContractOwnerWithdrawal__Params(this);
  }
}

export class ContractOwnerWithdrawal__Params {
  _event: ContractOwnerWithdrawal;

  constructor(event: ContractOwnerWithdrawal) {
    this._event = event;
  }

  get contractOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Donation extends ethereum.Event {
  get params(): Donation__Params {
    return new Donation__Params(this);
  }
}

export class Donation__Params {
  _event: Donation;

  constructor(event: Donation) {
    this._event = event;
  }

  get fundRunId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get donor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Follow extends ethereum.Event {
  get params(): Follow__Params {
    return new Follow__Params(this);
  }
}

export class Follow__Params {
  _event: Follow;

  constructor(event: Follow) {
    this._event = event;
  }

  get fundRunId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class FundRun extends ethereum.Event {
  get params(): FundRun__Params {
    return new FundRun__Params(this);
  }
}

export class FundRun__Params {
  _event: FundRun;

  constructor(event: FundRun) {
    this._event = event;
  }

  get fundRunId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get owners(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }

  get amountCollected(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get amountWithdrawn(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class MultisigTransfer extends ethereum.Event {
  get params(): MultisigTransfer__Params {
    return new MultisigTransfer__Params(this);
  }
}

export class MultisigTransfer__Params {
  _event: MultisigTransfer;

  constructor(event: MultisigTransfer) {
    this._event = event;
  }

  get proposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get fundRunId(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get netWithdrawAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get grossWithdrawAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Proposal extends ethereum.Event {
  get params(): Proposal__Params {
    return new Proposal__Params(this);
  }
}

export class Proposal__Params {
  _event: Proposal;

  constructor(event: Proposal) {
    this._event = event;
  }

  get proposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get fundRunId(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get proposedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get to(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get reason(): string {
    return this._event.parameters[5].value.toString();
  }

  get status(): i32 {
    return this._event.parameters[6].value.toI32();
  }

  get signaturesRequired(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get signaturesCount(): i32 {
    return this._event.parameters[8].value.toI32();
  }
}

export class ProposalRevoke extends ethereum.Event {
  get params(): ProposalRevoke__Params {
    return new ProposalRevoke__Params(this);
  }
}

export class ProposalRevoke__Params {
  _event: ProposalRevoke;

  constructor(event: ProposalRevoke) {
    this._event = event;
  }

  get proposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class ProposalSignature extends ethereum.Event {
  get params(): ProposalSignature__Params {
    return new ProposalSignature__Params(this);
  }
}

export class ProposalSignature__Params {
  _event: ProposalSignature;

  constructor(event: ProposalSignature) {
    this._event = event;
  }

  get proposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get signer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get signature(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class SocialPost extends ethereum.Event {
  get params(): SocialPost__Params {
    return new SocialPost__Params(this);
  }
}

export class SocialPost__Params {
  _event: SocialPost;

  constructor(event: SocialPost) {
    this._event = event;
  }

  get socialProposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get fundRunId(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get proposedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get postText(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class SocialProposal extends ethereum.Event {
  get params(): SocialProposal__Params {
    return new SocialProposal__Params(this);
  }
}

export class SocialProposal__Params {
  _event: SocialProposal;

  constructor(event: SocialProposal) {
    this._event = event;
  }

  get socialProposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get fundRunId(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get proposedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get postText(): string {
    return this._event.parameters[3].value.toString();
  }

  get status(): i32 {
    return this._event.parameters[4].value.toI32();
  }

  get signaturesRequired(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get signaturesCount(): i32 {
    return this._event.parameters[6].value.toI32();
  }
}

export class SocialProposalRevoke extends ethereum.Event {
  get params(): SocialProposalRevoke__Params {
    return new SocialProposalRevoke__Params(this);
  }
}

export class SocialProposalRevoke__Params {
  _event: SocialProposalRevoke;

  constructor(event: SocialProposalRevoke) {
    this._event = event;
  }

  get socialProposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class SocialProposalSignature extends ethereum.Event {
  get params(): SocialProposalSignature__Params {
    return new SocialProposalSignature__Params(this);
  }
}

export class SocialProposalSignature__Params {
  _event: SocialProposalSignature;

  constructor(event: SocialProposalSignature) {
    this._event = event;
  }

  get socialProposalId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get signer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get signature(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class Unfollow extends ethereum.Event {
  get params(): Unfollow__Params {
    return new Unfollow__Params(this);
  }
}

export class Unfollow__Params {
  _event: Unfollow;

  constructor(event: Unfollow) {
    this._event = event;
  }

  get fundRunId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class CrowdFund__fundRunValuesResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getAmountCollected(): BigInt {
    return this.value0;
  }

  getAmountWithdrawn(): BigInt {
    return this.value1;
  }
}

export class CrowdFund extends ethereum.SmartContract {
  static bind(address: Address): CrowdFund {
    return new CrowdFund("CrowdFund", address);
  }

  MSG_PREFIX(): string {
    let result = super.call("MSG_PREFIX", "MSG_PREFIX():(string)", []);

    return result[0].toString();
  }

  try_MSG_PREFIX(): ethereum.CallResult<string> {
    let result = super.tryCall("MSG_PREFIX", "MSG_PREFIX():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  donorLogs(param0: Address): Address {
    let result = super.call("donorLogs", "donorLogs(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_donorLogs(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("donorLogs", "donorLogs(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  fundRunOwners(param0: i32, param1: BigInt): Address {
    let result = super.call(
      "fundRunOwners",
      "fundRunOwners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_fundRunOwners(param0: i32, param1: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "fundRunOwners",
      "fundRunOwners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  fundRunValues(param0: i32): CrowdFund__fundRunValuesResult {
    let result = super.call(
      "fundRunValues",
      "fundRunValues(uint16):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return new CrowdFund__fundRunValuesResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_fundRunValues(
    param0: i32
  ): ethereum.CallResult<CrowdFund__fundRunValuesResult> {
    let result = super.tryCall(
      "fundRunValues",
      "fundRunValues(uint16):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new CrowdFund__fundRunValuesResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  getNonce(_id: i32): BigInt {
    let result = super.call("getNonce", "getNonce(uint16):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_id))
    ]);

    return result[0].toBigInt();
  }

  try_getNonce(_id: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getNonce", "getNonce(uint16):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_id))
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getSocialManagementNonce(_id: i32): BigInt {
    let result = super.call(
      "getSocialManagementNonce",
      "getSocialManagementNonce(uint16):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_id))]
    );

    return result[0].toBigInt();
  }

  try_getSocialManagementNonce(_id: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getSocialManagementNonce",
      "getSocialManagementNonce(uint16):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_id))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  numberOfFundRuns(): i32 {
    let result = super.call(
      "numberOfFundRuns",
      "numberOfFundRuns():(uint16)",
      []
    );

    return result[0].toI32();
  }

  try_numberOfFundRuns(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "numberOfFundRuns",
      "numberOfFundRuns():(uint16)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  numberOfMultisigProposals(): i32 {
    let result = super.call(
      "numberOfMultisigProposals",
      "numberOfMultisigProposals():(uint16)",
      []
    );

    return result[0].toI32();
  }

  try_numberOfMultisigProposals(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "numberOfMultisigProposals",
      "numberOfMultisigProposals():(uint16)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  numberOfSocialProposals(): i32 {
    let result = super.call(
      "numberOfSocialProposals",
      "numberOfSocialProposals():(uint16)",
      []
    );

    return result[0].toI32();
  }

  try_numberOfSocialProposals(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "numberOfSocialProposals",
      "numberOfSocialProposals():(uint16)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proposalCreators(param0: i32): Address {
    let result = super.call(
      "proposalCreators",
      "proposalCreators(uint16):(address)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return result[0].toAddress();
  }

  try_proposalCreators(param0: i32): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "proposalCreators",
      "proposalCreators(uint16):(address)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proposalSigners(param0: i32, param1: BigInt): Address {
    let result = super.call(
      "proposalSigners",
      "proposalSigners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_proposalSigners(
    param0: i32,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "proposalSigners",
      "proposalSigners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proposalStatuses(param0: i32): i32 {
    let result = super.call(
      "proposalStatuses",
      "proposalStatuses(uint16):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return result[0].toI32();
  }

  try_proposalStatuses(param0: i32): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "proposalStatuses",
      "proposalStatuses(uint16):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  socialManagementNonces(param0: i32): BigInt {
    let result = super.call(
      "socialManagementNonces",
      "socialManagementNonces(uint16):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return result[0].toBigInt();
  }

  try_socialManagementNonces(param0: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "socialManagementNonces",
      "socialManagementNonces(uint16):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  socialProposalCreators(param0: i32): Address {
    let result = super.call(
      "socialProposalCreators",
      "socialProposalCreators(uint16):(address)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return result[0].toAddress();
  }

  try_socialProposalCreators(param0: i32): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "socialProposalCreators",
      "socialProposalCreators(uint16):(address)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  socialProposalSigners(param0: i32, param1: BigInt): Address {
    let result = super.call(
      "socialProposalSigners",
      "socialProposalSigners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_socialProposalSigners(
    param0: i32,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "socialProposalSigners",
      "socialProposalSigners(uint16,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  socialProposalStatuses(param0: i32): i32 {
    let result = super.call(
      "socialProposalStatuses",
      "socialProposalStatuses(uint16):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return result[0].toI32();
  }

  try_socialProposalStatuses(param0: i32): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "socialProposalStatuses",
      "socialProposalStatuses(uint16):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  totalProfitsTaken(): BigInt {
    let result = super.call(
      "totalProfitsTaken",
      "totalProfitsTaken():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalProfitsTaken(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalProfitsTaken",
      "totalProfitsTaken():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vaultNonces(param0: i32): BigInt {
    let result = super.call("vaultNonces", "vaultNonces(uint16):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))
    ]);

    return result[0].toBigInt();
  }

  try_vaultNonces(param0: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall("vaultNonces", "vaultNonces(uint16):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _contractOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ContractOwnerWithdrawCall extends ethereum.Call {
  get inputs(): ContractOwnerWithdrawCall__Inputs {
    return new ContractOwnerWithdrawCall__Inputs(this);
  }

  get outputs(): ContractOwnerWithdrawCall__Outputs {
    return new ContractOwnerWithdrawCall__Outputs(this);
  }
}

export class ContractOwnerWithdrawCall__Inputs {
  _call: ContractOwnerWithdrawCall;

  constructor(call: ContractOwnerWithdrawCall) {
    this._call = call;
  }
}

export class ContractOwnerWithdrawCall__Outputs {
  _call: ContractOwnerWithdrawCall;

  constructor(call: ContractOwnerWithdrawCall) {
    this._call = call;
  }
}

export class CreateCommentCall extends ethereum.Call {
  get inputs(): CreateCommentCall__Inputs {
    return new CreateCommentCall__Inputs(this);
  }

  get outputs(): CreateCommentCall__Outputs {
    return new CreateCommentCall__Outputs(this);
  }
}

export class CreateCommentCall__Inputs {
  _call: CreateCommentCall;

  constructor(call: CreateCommentCall) {
    this._call = call;
  }

  get _postId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _commentText(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateCommentCall__Outputs {
  _call: CreateCommentCall;

  constructor(call: CreateCommentCall) {
    this._call = call;
  }
}

export class CreateFundRunCall extends ethereum.Call {
  get inputs(): CreateFundRunCall__Inputs {
    return new CreateFundRunCall__Inputs(this);
  }

  get outputs(): CreateFundRunCall__Outputs {
    return new CreateFundRunCall__Outputs(this);
  }
}

export class CreateFundRunCall__Inputs {
  _call: CreateFundRunCall;

  constructor(call: CreateFundRunCall) {
    this._call = call;
  }

  get _title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _owners(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class CreateFundRunCall__Outputs {
  _call: CreateFundRunCall;

  constructor(call: CreateFundRunCall) {
    this._call = call;
  }
}

export class CreateMultisigProposalCall extends ethereum.Call {
  get inputs(): CreateMultisigProposalCall__Inputs {
    return new CreateMultisigProposalCall__Inputs(this);
  }

  get outputs(): CreateMultisigProposalCall__Outputs {
    return new CreateMultisigProposalCall__Outputs(this);
  }
}

export class CreateMultisigProposalCall__Inputs {
  _call: CreateMultisigProposalCall;

  constructor(call: CreateMultisigProposalCall) {
    this._call = call;
  }

  get _signature(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _id(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _tx(): CreateMultisigProposalCall_txStruct {
    return changetype<CreateMultisigProposalCall_txStruct>(
      this._call.inputValues[2].value.toTuple()
    );
  }
}

export class CreateMultisigProposalCall__Outputs {
  _call: CreateMultisigProposalCall;

  constructor(call: CreateMultisigProposalCall) {
    this._call = call;
  }
}

export class CreateMultisigProposalCall_txStruct extends ethereum.Tuple {
  get amount(): BigInt {
    return this[0].toBigInt();
  }

  get to(): Address {
    return this[1].toAddress();
  }

  get proposedBy(): Address {
    return this[2].toAddress();
  }

  get reason(): string {
    return this[3].toString();
  }
}

export class CreateSocialProposalCall extends ethereum.Call {
  get inputs(): CreateSocialProposalCall__Inputs {
    return new CreateSocialProposalCall__Inputs(this);
  }

  get outputs(): CreateSocialProposalCall__Outputs {
    return new CreateSocialProposalCall__Outputs(this);
  }
}

export class CreateSocialProposalCall__Inputs {
  _call: CreateSocialProposalCall;

  constructor(call: CreateSocialProposalCall) {
    this._call = call;
  }

  get _signature(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _id(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _tx(): CreateSocialProposalCall_txStruct {
    return changetype<CreateSocialProposalCall_txStruct>(
      this._call.inputValues[2].value.toTuple()
    );
  }
}

export class CreateSocialProposalCall__Outputs {
  _call: CreateSocialProposalCall;

  constructor(call: CreateSocialProposalCall) {
    this._call = call;
  }
}

export class CreateSocialProposalCall_txStruct extends ethereum.Tuple {
  get postText(): string {
    return this[0].toString();
  }

  get proposedBy(): Address {
    return this[1].toAddress();
  }
}

export class DonateToFundRunCall extends ethereum.Call {
  get inputs(): DonateToFundRunCall__Inputs {
    return new DonateToFundRunCall__Inputs(this);
  }

  get outputs(): DonateToFundRunCall__Outputs {
    return new DonateToFundRunCall__Outputs(this);
  }
}

export class DonateToFundRunCall__Inputs {
  _call: DonateToFundRunCall;

  constructor(call: DonateToFundRunCall) {
    this._call = call;
  }

  get _id(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class DonateToFundRunCall__Outputs {
  _call: DonateToFundRunCall;

  constructor(call: DonateToFundRunCall) {
    this._call = call;
  }
}

export class FinalizeAndPostCall extends ethereum.Call {
  get inputs(): FinalizeAndPostCall__Inputs {
    return new FinalizeAndPostCall__Inputs(this);
  }

  get outputs(): FinalizeAndPostCall__Outputs {
    return new FinalizeAndPostCall__Outputs(this);
  }
}

export class FinalizeAndPostCall__Inputs {
  _call: FinalizeAndPostCall;

  constructor(call: FinalizeAndPostCall) {
    this._call = call;
  }

  get _tx(): FinalizeAndPostCall_txStruct {
    return changetype<FinalizeAndPostCall_txStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get _nonce(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _id(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get _socialProposalId(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get _signaturesList(): Array<Bytes> {
    return this._call.inputValues[4].value.toBytesArray();
  }
}

export class FinalizeAndPostCall__Outputs {
  _call: FinalizeAndPostCall;

  constructor(call: FinalizeAndPostCall) {
    this._call = call;
  }
}

export class FinalizeAndPostCall_txStruct extends ethereum.Tuple {
  get postText(): string {
    return this[0].toString();
  }

  get proposedBy(): Address {
    return this[1].toAddress();
  }
}

export class FollowCall extends ethereum.Call {
  get inputs(): FollowCall__Inputs {
    return new FollowCall__Inputs(this);
  }

  get outputs(): FollowCall__Outputs {
    return new FollowCall__Outputs(this);
  }
}

export class FollowCall__Inputs {
  _call: FollowCall;

  constructor(call: FollowCall) {
    this._call = call;
  }

  get _fundRunId(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class FollowCall__Outputs {
  _call: FollowCall;

  constructor(call: FollowCall) {
    this._call = call;
  }
}

export class MultisigWithdrawCall extends ethereum.Call {
  get inputs(): MultisigWithdrawCall__Inputs {
    return new MultisigWithdrawCall__Inputs(this);
  }

  get outputs(): MultisigWithdrawCall__Outputs {
    return new MultisigWithdrawCall__Outputs(this);
  }
}

export class MultisigWithdrawCall__Inputs {
  _call: MultisigWithdrawCall;

  constructor(call: MultisigWithdrawCall) {
    this._call = call;
  }

  get _tx(): MultisigWithdrawCall_txStruct {
    return changetype<MultisigWithdrawCall_txStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get _nonce(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _id(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get _proposalId(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get _signaturesList(): Array<Bytes> {
    return this._call.inputValues[4].value.toBytesArray();
  }
}

export class MultisigWithdrawCall__Outputs {
  _call: MultisigWithdrawCall;

  constructor(call: MultisigWithdrawCall) {
    this._call = call;
  }
}

export class MultisigWithdrawCall_txStruct extends ethereum.Tuple {
  get amount(): BigInt {
    return this[0].toBigInt();
  }

  get to(): Address {
    return this[1].toAddress();
  }

  get proposedBy(): Address {
    return this[2].toAddress();
  }

  get reason(): string {
    return this[3].toString();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RevokeMultisigProposalCall extends ethereum.Call {
  get inputs(): RevokeMultisigProposalCall__Inputs {
    return new RevokeMultisigProposalCall__Inputs(this);
  }

  get outputs(): RevokeMultisigProposalCall__Outputs {
    return new RevokeMultisigProposalCall__Outputs(this);
  }
}

export class RevokeMultisigProposalCall__Inputs {
  _call: RevokeMultisigProposalCall;

  constructor(call: RevokeMultisigProposalCall) {
    this._call = call;
  }

  get _id(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _proposalId(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class RevokeMultisigProposalCall__Outputs {
  _call: RevokeMultisigProposalCall;

  constructor(call: RevokeMultisigProposalCall) {
    this._call = call;
  }
}

export class RevokeSocialProposalCall extends ethereum.Call {
  get inputs(): RevokeSocialProposalCall__Inputs {
    return new RevokeSocialProposalCall__Inputs(this);
  }

  get outputs(): RevokeSocialProposalCall__Outputs {
    return new RevokeSocialProposalCall__Outputs(this);
  }
}

export class RevokeSocialProposalCall__Inputs {
  _call: RevokeSocialProposalCall;

  constructor(call: RevokeSocialProposalCall) {
    this._call = call;
  }

  get _id(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _socialProposalId(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class RevokeSocialProposalCall__Outputs {
  _call: RevokeSocialProposalCall;

  constructor(call: RevokeSocialProposalCall) {
    this._call = call;
  }
}

export class SupportMultisigProposalCall extends ethereum.Call {
  get inputs(): SupportMultisigProposalCall__Inputs {
    return new SupportMultisigProposalCall__Inputs(this);
  }

  get outputs(): SupportMultisigProposalCall__Outputs {
    return new SupportMultisigProposalCall__Outputs(this);
  }
}

export class SupportMultisigProposalCall__Inputs {
  _call: SupportMultisigProposalCall;

  constructor(call: SupportMultisigProposalCall) {
    this._call = call;
  }

  get _signature(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _id(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _proposalId(): i32 {
    return this._call.inputValues[2].value.toI32();
  }
}

export class SupportMultisigProposalCall__Outputs {
  _call: SupportMultisigProposalCall;

  constructor(call: SupportMultisigProposalCall) {
    this._call = call;
  }
}

export class SupportSocialProposalCall extends ethereum.Call {
  get inputs(): SupportSocialProposalCall__Inputs {
    return new SupportSocialProposalCall__Inputs(this);
  }

  get outputs(): SupportSocialProposalCall__Outputs {
    return new SupportSocialProposalCall__Outputs(this);
  }
}

export class SupportSocialProposalCall__Inputs {
  _call: SupportSocialProposalCall;

  constructor(call: SupportSocialProposalCall) {
    this._call = call;
  }

  get _signature(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _id(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _socialProposalId(): i32 {
    return this._call.inputValues[2].value.toI32();
  }
}

export class SupportSocialProposalCall__Outputs {
  _call: SupportSocialProposalCall;

  constructor(call: SupportSocialProposalCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnfollowCall extends ethereum.Call {
  get inputs(): UnfollowCall__Inputs {
    return new UnfollowCall__Inputs(this);
  }

  get outputs(): UnfollowCall__Outputs {
    return new UnfollowCall__Outputs(this);
  }
}

export class UnfollowCall__Inputs {
  _call: UnfollowCall;

  constructor(call: UnfollowCall) {
    this._call = call;
  }

  get _fundRunId(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class UnfollowCall__Outputs {
  _call: UnfollowCall;

  constructor(call: UnfollowCall) {
    this._call = call;
  }
}
