//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./CrowdFundLibrary.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { ECDSA } from "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @dev NOT PRODUCTION-READY ... FOR LEARNING PURPOSES ONLY
 * ...
 */

contract CrowdFund is Ownable, ReentrancyGuard {
	struct FundRunValues {
		uint256 target;
		uint256 amountCollected;
		uint256 amountWithdrawn;
	}

	/**
	 * @dev an address _> has a DonorsLog
	 * a Donor Log _> has a mapping of
	 * FundRunId => donationAmount
	 */
	struct DonorsLog {
		address donor;
		mapping(uint256 => uint256) donorMoneyLog; //mapping(fundRunId => donationAmount)
	}

	enum FundRunStatus {
		Created,
		DeadlineMetMoneyGoalNotMet,
		MoneyGoalMetDeadlineNotMet,
		FullSuccess
	}

	enum ProposalStatus {
		Created,
		ReadyToSend,
		TxSent,
		Revoked
	}

	mapping(uint16 => uint256) public vaultNonces;
	mapping(uint16 => uint256) public fundRunDeadlines;
	mapping(uint16 => address) public proposalCreators;
	mapping(uint16 => address[]) public fundRunOwners;
	mapping(uint16 => address[]) public proposalSigners;
	mapping(uint16 => FundRunStatus) public fundRunStatuses;
	mapping(uint16 => ProposalStatus) public proposalStatuses;
	mapping(uint16 => FundRunValues) public fundRunValues;
	mapping(address => DonorsLog) public donorLogs; //a single donor will have all of their logs (across all Fund Runs they donated to) here

	uint16 public numberOfFundRuns = 0;
	uint16 public numberOfMultisigProposals = 0;
	uint256 public totalProfitsTaken = 0;

	uint256 private commissionPayout = 0;
	uint16 private constant crowdFundCommission = 25; //.25%
	uint16 private constant crowdFundDenominator = 10000;
	string private constant MSG_PREFIX = "\x19Ethereum Signed Message:\n32";

	event Donation(uint16 fundRunId, address donor, uint256 amount);

	event OwnerWithdrawal(
		uint16 fundRunId,
		address owner,
		uint256 netWithdrawAmount,
		uint256 grossWithdrawAmount
	);

	event DonorWithdrawal(uint16 fundRunId, address donor, uint256 amount);

	event ContractOwnerWithdrawal(address contractOwner, uint256 amount);

	event FundRun(
		uint16 fundRunId,
		address[] owners,
		string title,
		string description,
		uint256 target,
		uint256 deadline,
		uint256 amountCollected,
		uint256 amountWithdrawn,
		FundRunStatus status
	);

	event FundRunStatusChange(uint16 fundRunId, FundRunStatus status);

	event Proposal(
		uint16 proposalId,
		uint16 fundRunId,
		address proposedBy,
		uint256 amount,
		address to,
		string reason,
		ProposalStatus status,
		uint256 signaturesRequired,
		uint16 signaturesCount
	);

	event ProposalSignature(uint16 proposalId, address signer, bytes signature);

	event ProposalRevoke(uint16 proposalId);

	event MultisigTransfer(
		uint16 proposalId,
		uint16 fundRunId,
		address to,
		uint256 netWithdrawAmount,
		uint256 grossWithdrawAmount
	);

	modifier ownsThisFundRun(
		uint16 id,
		address sender,
		bool mustOwnThisFundRun
	) {
		if (mustOwnThisFundRun) {
			require(
				isOwnerOfFundRun(sender, id),
				"You are not the owner of this Fund Run."
			);
		} else {
			require(
				!isOwnerOfFundRun(sender, id),
				"You own this Fund Run -- therefore, this operation is not allowed"
			);
		}
		_;
	}

	modifier fundRunCompleted(uint16 id, bool mustBeCompleted) {
		if (mustBeCompleted) {
			require(
				fundRunDeadlines[id] < block.timestamp,
				"This Fund Run is not complete."
			);
		} else {
			require(
				fundRunDeadlines[id] > block.timestamp,
				"This Fund Run has already completed."
			);
		}
		_;
	}

	modifier fundRunSucceeded(uint16 id, bool mustHaveSucceeded) {
		if (mustHaveSucceeded) {
			require(
				fundRunValues[id].amountCollected >= fundRunValues[id].target,
				"This Fund Run has not yet met its monetary goal."
			);
		} else {
			require(
				fundRunValues[id].amountCollected < fundRunValues[id].target,
				"This Fund Run has already met its monetary goal."
			);
		}
		_;
	}

	modifier isMultisig(uint16 id, bool mustBeMultisig) {
		if (mustBeMultisig) {
			require(
				fundRunOwners[id].length > 1,
				"This is NOT a multisig Fund Run - Operation not allowed."
			);
		} else {
			require(
				fundRunOwners[id].length == 1,
				"This IS a multisig Fund Run - Operation not allowed."
			);
		}
		_;
	}

	modifier createdProposal(
		uint16 proposalId,
		address signer,
		bool mustBeProposer
	) {
		if (mustBeProposer) {
			require(
				proposalCreators[proposalId] == signer,
				"The address is NOT the creator of this proposal -- action not allowed."
			);
			_;
		} else {
			require(
				proposalCreators[proposalId] != signer,
				"The address is the creator of this proposal -- creators of proposals can not support them -- action not allowed."
			);
			_;
		}
	}

	modifier txNotSent(uint16 proposalId) {
		require(
			proposalStatuses[proposalId] != ProposalStatus(2),
			"This Multisig Tx has already went through."
		);
		_;
	}

	modifier notRevoked(uint16 proposalId) {
		require(
			proposalStatuses[proposalId] != ProposalStatus(3),
			"This Proposal has been revoked - action not allowed."
		);
		_;
	}

	modifier userHasNotSigned(uint16 proposalId, address signer) {
		for (uint16 i = 0; i < proposalSigners[proposalId].length; i++) {
			require(
				proposalSigners[proposalId][i] != signer,
				"This user has already signed this proposal - action not allowed."
			);
		}
		_;
	}

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

	function createMultisigProposal(
		bytes calldata _signature,
		uint16 _id,
		CrowdFundLibrary.MultiSigRequest calldata _tx
	)
		external
		isMultisig(_id, true)
		ownsThisFundRun(_id, msg.sender, true)
		fundRunCompleted(_id, true)
		fundRunSucceeded(_id, true)
	{
		require(
			fundRunValues[_id].amountCollected > 0,
			"There is nothing to withdraw"
		);
		require(
			fundRunValues[_id].amountCollected >
				fundRunValues[_id].amountWithdrawn,
			"This Fund Run is empty -- withdrawals may have already occurred."
		);
		require(
			_tx.amount > 0,
			"The proposed transaction withdrawal amount must be greater than 0."
		);
		require(
			fundRunValues[_id].amountWithdrawn + _tx.amount <=
				fundRunValues[_id].amountCollected,
			"This proposal would overdraw this Fund Run."
		);
		ProposalStatus thisStatus = ProposalStatus(0);
		proposalCreators[numberOfMultisigProposals] = msg.sender;
		proposalStatuses[numberOfMultisigProposals] = thisStatus;
		proposalSigners[numberOfMultisigProposals].push(msg.sender);

		emit Proposal(
			numberOfMultisigProposals,
			_id,
			msg.sender,
			_tx.amount,
			_tx.to,
			_tx.reason,
			thisStatus,
			fundRunOwners[_id].length, //TODO: later on ... get value from user - total signatures required
			0
		);

		emit ProposalSignature(
			numberOfMultisigProposals,
			msg.sender,
			_signature
		);

		numberOfMultisigProposals++;
	}

	function supportMultisigProposal(
		bytes calldata _signature,
		uint16 _id,
		uint16 _proposalId
	)
		external
		isMultisig(_id, true)
		ownsThisFundRun(_id, msg.sender, true)
		createdProposal(_proposalId, msg.sender, false)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
		userHasNotSigned(_proposalId, msg.sender)
	{
		proposalSigners[_proposalId].push(msg.sender);
		proposalStatuses[_proposalId] = ProposalStatus(1);
		emit ProposalSignature(_proposalId, msg.sender, _signature);
	}

	/**
	 * @dev  final transfer/call (when all signers are thought to have signed)
	 */
	function multisigWithdraw(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint256 _nonce,
		uint16 _id,
		uint16 _proposalId,
		bytes[] calldata _signaturesList
	)
		external
		nonReentrant
		isMultisig(_id, true)
		ownsThisFundRun(_id, msg.sender, true)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
	{
		_verifyMultisigRequest(_tx, _nonce, _signaturesList, _id);
		_multisigTransfer(_tx, _id, _proposalId);
	}

	/**
	 * @dev  Only the user who created a proposal can revoke it
	 */
	function revokeMultisigProposal(
		uint16 _id,
		uint16 _proposalId
	)
		external
		isMultisig(_id, true)
		ownsThisFundRun(_id, msg.sender, true)
		createdProposal(_proposalId, msg.sender, true)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
	{
		proposalStatuses[_proposalId] = ProposalStatus(3);
		emit ProposalRevoke(_proposalId);
	}

	function createFundRun(
		string memory _title,
		string memory _description,
		uint256 _target,
		uint256 _deadline,
		address[] memory _owners
	) external {
		uint256 fundRunDeadline = block.timestamp + _deadline * 60;
		require(
			fundRunDeadline > block.timestamp,
			"The deadline would ideally be a date in the future there, Time Traveler."
		);
		bytes32 baseCompare = keccak256("");
		bytes32 titleCompare = keccak256(bytes(_title));
		bytes32 descriptionCompare = keccak256(bytes(_description));
		require(
			titleCompare != baseCompare && descriptionCompare != baseCompare,
			"Title and Description are both required fields."
		);
		require(_target > 0, "Your money target must be greater than 0.");

		/**
		 * @dev prevents creator from adding self as co-owner
		 *      prevents two co-owners from having the same address
		 */
		require(
			validateOwners(msg.sender, _owners),
			"The co-owners and the creator of a Fund Run must all have different wallet addresses."
		);

		FundRunValues storage fundRunVals = fundRunValues[numberOfFundRuns];
		fundRunVals.amountCollected = 0;
		fundRunVals.target = _target;
		fundRunVals.amountWithdrawn = 0;

		fundRunOwners[numberOfFundRuns] = _owners;
		fundRunDeadlines[numberOfFundRuns] = fundRunDeadline;
		fundRunStatuses[numberOfFundRuns] = FundRunStatus(0);

		emit FundRun(
			numberOfFundRuns,
			_owners,
			_title,
			_description,
			_target,
			fundRunDeadline,
			0,
			0,
			FundRunStatus(0)
		);

		numberOfFundRuns++;
	}

	function donateToFundRun(
		uint16 _id
	)
		external
		payable
		ownsThisFundRun(_id, msg.sender, false)
		fundRunCompleted(_id, false)
	{
		require(msg.value > 0, "Minimum payment amount not met.");
		uint256 amount = msg.value;

		/**
		 * @dev next few lines are how a person can donate to multiple fund runs (multiple times)
		 * while still keeping the donations logged separately for proper withdrawal
		 * Donor's Address _> Donor Log _> mapping(fundRunID => donationAmount)
		 */
		DonorsLog storage donorLog = donorLogs[msg.sender];
		if (donorLog.donor != msg.sender) donorLog.donor = msg.sender;
		uint256 previouslyDonated = donorLog.donorMoneyLog[_id];
		donorLog.donorMoneyLog[_id] = amount + previouslyDonated;
		uint256 newAmountCollected = fundRunValues[_id].amountCollected +
			amount;
		fundRunValues[_id].amountCollected = newAmountCollected;

		if (fundRunValues[_id].amountCollected >= fundRunValues[_id].target)
			setFundRunStatus(_id, 2);

		emit Donation(_id, msg.sender, amount);
	}

	function fundRunOwnerWithdraw(
		uint16 _id
	)
		external
		nonReentrant
		isMultisig(_id, false)
		ownsThisFundRun(_id, msg.sender, true)
		fundRunCompleted(_id, true)
		fundRunSucceeded(_id, true)
	{
		require(
			fundRunValues[_id].amountCollected > 0,
			"There is nothing to withdraw"
		);
		require(
			fundRunValues[_id].amountCollected >
				fundRunValues[_id].amountWithdrawn,
			"This Fund Run is empty -- a withdrawal may have already occurred."
		);
		uint256 grossWithdrawAmount = fundRunValues[_id].amountCollected -
			fundRunValues[_id].amountWithdrawn;
		require(
			grossWithdrawAmount > 0,
			"There is nothing to withdraw -- a withdrawal may have already occurred."
		);

		/**
		 * @dev in this scenario, the amount that is previously withdrawn should always be 0
		 *
		 * ADD the would-be withdrawal amount to the actual withdrawn amount
		 * and ensure they are going to be less-than/equal-to the Fund Run's total balance ("amountCollected")
		 */
		require(
			(grossWithdrawAmount + fundRunValues[_id].amountWithdrawn) <=
				fundRunValues[_id].amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		//contract takes its cut
		uint256 netWithdrawAmount = getNetWithdrawAmount(grossWithdrawAmount);

		fundRunValues[_id].amountWithdrawn =
			fundRunValues[_id].amountWithdrawn +
			grossWithdrawAmount;

		setFundRunStatus(_id, 3);

		(bool success, ) = payable(msg.sender).call{ value: netWithdrawAmount }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit OwnerWithdrawal(
			_id,
			msg.sender,
			netWithdrawAmount,
			grossWithdrawAmount
		);
	}

	function fundRunDonorWithdraw(
		uint16 _id
	)
		external
		nonReentrant
		ownsThisFundRun(_id, msg.sender, false)
		fundRunCompleted(_id, true)
		fundRunSucceeded(_id, false)
	{
		DonorsLog storage donorLog = donorLogs[msg.sender];
		uint256 amountToWithdraw = donorLog.donorMoneyLog[_id];
		require(
			amountToWithdraw > 0,
			"There is nothing to withdraw - Have you already withdrawn?"
		);

		///@dev ADD the would-be withdrawal amount to the actual withdrawn amount
		///and ensure they are going to be less-than/equal-to the Fund Run's total balance ("amountCollected")
		require(
			(amountToWithdraw + fundRunValues[_id].amountWithdrawn) <=
				fundRunValues[_id].amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		setFundRunStatus(_id, 1);

		donorLog.donorMoneyLog[_id] = 0;
		fundRunValues[_id].amountWithdrawn =
			fundRunValues[_id].amountWithdrawn +
			amountToWithdraw;

		(bool success, ) = payable(msg.sender).call{ value: amountToWithdraw }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit DonorWithdrawal(_id, msg.sender, amountToWithdraw);
	}

	/**
	 * @dev  (OnlyOwner can) Withdraw the profits this contract has made
	 */
	function contractOwnerWithdraw() external onlyOwner nonReentrant {
		require(commissionPayout > 0, "Nothing to withdraw");

		uint256 amountToWithdraw = commissionPayout;
		commissionPayout = 0;
		totalProfitsTaken = totalProfitsTaken + amountToWithdraw;

		(bool success, ) = payable(msg.sender).call{ value: amountToWithdraw }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit ContractOwnerWithdrawal(msg.sender, amountToWithdraw);
	}

	function updateFundRunStatus(uint16 _id) external {
		if (fundRunDeadlines[_id] < block.timestamp)
			if (fundRunValues[_id].amountCollected < fundRunValues[_id].target)
				setFundRunStatus(_id, 1);
			else setFundRunStatus(_id, 3);
		else if (fundRunValues[_id].amountCollected < fundRunValues[_id].target)
			setFundRunStatus(_id, 0);
		else setFundRunStatus(_id, 2);
	}

	function timeLeft(uint16 _id) external view returns (uint256) {
		require(block.timestamp < fundRunDeadlines[_id], "It's ovaaaa");
		return fundRunDeadlines[_id] - block.timestamp;
	}

	function getBalance()
		external
		view
		returns (uint256 crowdFund_contractBalance)
	{
		return address(this).balance;
	}

	function getNonce(uint16 _id) external view returns (uint256) {
		return vaultNonces[_id];
	}

	function setFundRunStatus(uint16 _id, uint16 _newValue) private {
		FundRunStatus newStatus = FundRunStatus(_newValue);
		if (fundRunStatuses[_id] != newStatus) {
			fundRunStatuses[_id] = newStatus;
			emit FundRunStatusChange(_id, newStatus);
		}
	}

	function _verifyMultisigRequest(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint256 _nonce,
		bytes[] calldata _signatures,
		uint16 _id
	) private {
		require(_nonce > vaultNonces[_id], "nonce already used");
		uint256 signaturesCount = _signatures.length;
		require(
			signaturesCount == fundRunOwners[_id].length, //TODO: eventually getting a "max signature count" from user
			"not enough signers"
		);
		bytes32 digest = _processMultisigRequest(_tx, _nonce);

		address initialSigner;
		for (uint256 i = 0; i < signaturesCount; i++) {
			bytes memory signature = _signatures[i];
			address signer = ECDSA.recover(digest, signature);
			require(
				isOwnerOfFundRun(signer, _id),
				"Possible Issues: Proposal completed, problem with signature, or you are not a co-owner of this Fund Run."
			);
			require(
				signer != initialSigner,
				"duplicate signature has been prevented."
			);
			initialSigner = signer;
		}
		vaultNonces[_id] = _nonce;
	}

	function _multisigTransfer(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint16 _id,
		uint16 _proposalId
	) private {
		require(
			fundRunValues[_id].amountCollected > 0,
			"There is nothing to withdraw"
		);
		require(
			fundRunValues[_id].amountCollected >
				fundRunValues[_id].amountWithdrawn,
			"This Fund Run is empty -- withdrawals may have already occurred."
		);
		require(
			_tx.amount > 0,
			"The proposed transaction withdrawal amount is 0."
		);
		require(
			fundRunValues[_id].amountWithdrawn + _tx.amount <=
				fundRunValues[_id].amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		//contract takes its cut
		uint256 netWithdrawAmount = getNetWithdrawAmount(_tx.amount);

		fundRunValues[_id].amountWithdrawn =
			fundRunValues[_id].amountWithdrawn +
			_tx.amount;

		setFundRunStatus(_id, 3);

		proposalStatuses[_proposalId] = ProposalStatus(2);

		(bool success, ) = payable(_tx.to).call{ value: netWithdrawAmount }("");

		require(success, "Transfer not fulfilled");
		emit MultisigTransfer(
			_proposalId,
			_id,
			_tx.to,
			netWithdrawAmount,
			_tx.amount
		);
	}

	function getNetWithdrawAmount(
		uint256 _grossWithdrawAmount
	) private returns (uint256 netWithdrawAmount) {
		uint256 fundsMinusCommission = (_grossWithdrawAmount *
			crowdFundCommission) / crowdFundDenominator; //0.25%
		netWithdrawAmount = _grossWithdrawAmount - fundsMinusCommission;
		//update profit amount
		commissionPayout = commissionPayout + fundsMinusCommission;
	}

	function isOwnerOfFundRun(
		address _addr,
		uint16 _id
	) private view returns (bool) {
		for (uint16 i = 0; i < fundRunOwners[_id].length; i++) {
			if (fundRunOwners[_id][i] == _addr) return true;
		}
		return false;
	}

	function _processMultisigRequest(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint256 _nonce
	) private pure returns (bytes32 _digest) {
		bytes memory encoded = abi.encode(_tx);
		_digest = keccak256(abi.encodePacked(encoded, _nonce));
		_digest = keccak256(abi.encodePacked(MSG_PREFIX, _digest));
	}

	/**
	 * @dev RETURNS FALSE IF:
	 *      creator adds self as co-owner
	 *      two co-owners have the same address
	 * Otherwise returns TRUE
	 */
	function validateOwners(
		address _creator,
		address[] memory _owners
	) private pure returns (bool) {
		if (_owners.length == 1) return true;
		bool creatorAlreadyInList = false;
		address addrOne;
		address addrTwo;
		for (uint16 i = 0; i < _owners.length; i++) {
			if (_owners[i] == _creator && creatorAlreadyInList) return false;
			else if (_owners[i] == _creator) creatorAlreadyInList = true;
			if (_owners[i] == addrOne || _owners[i] == addrTwo) return false;
			if (i == 0) addrOne = _owners[i];
			else if (i == 1) addrTwo = _owners[i];
		}
		return true;
	}

	//TODO: PRODTODO:: remove this _________________________________________>
	function forceEnd(uint16 _id) external {
		require(block.timestamp < fundRunDeadlines[_id], "It's ovaaaa");
		fundRunDeadlines[_id] = block.timestamp - 1;
	}
	//TODO: PRODTODO:: END: remove this ^^^________________________^^^
}
