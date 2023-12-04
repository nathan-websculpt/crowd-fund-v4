//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { ECDSA } from "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @dev NOT PRODUCTION-READY ... FOR LEARNING PURPOSES ONLY
 * moving to subgraphs
 * .
 *
 *
 *
 */

contract CrowdFund is Ownable, ReentrancyGuard {
	struct FundRun {
		uint16 id; //not large enough in a prod scenario
		address[] owners;
		string title;
		string description;
		uint256 target;
		uint256 deadline;
		uint256 amountCollected;
		uint256 amountWithdrawn;
		address[] donors;
		uint256[] donations;
		FundRunStatus status;
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

	struct MultiSigRequest {
		uint256 amount;
		address to;
		address proposedBy;
		string reason;
	}

	// // struct MultiSigVault {
	// // 	uint16 proposalId;
	// // 	uint256 amount;
	// // 	address to;
	// // 	address proposedBy;
	// // 	string reason;
	// // 	ProposalStatus status;
	// // }

	// // enum ProposalStatus {
	// // 	Created,
	// // 	Supported,
	// // 	TxSent
	// // }

	enum FundRunStatus {
		Created,
		DeadlineMetMoneyGoalNotMet,
		MoneyGoalMetDeadlineNotMet,
		FullSuccess
	}

	//      fundRunId
	// // mapping(uint16 => MultiSigVault[]) public vaults; //Fund Run's proposals
	//      proposalId
	// // mapping(uint16 => bytes[]) public signatureList;
	//      proposalId
	// // mapping(uint16 => address[]) public signerList;
	mapping(uint16 => uint256) public vaultNonces; //fundRunId => Nonce
	mapping(uint256 => FundRun) public fundRuns;
	mapping(address => DonorsLog) public donorLogs; //a single donor will have all of their logs (across all Fund Runs they donated to) here

	uint16 public numberOfFundRuns = 0;
	uint16 public numberOfMultisigProposals = 0;
	uint256 public totalProfitsTaken = 0;

	uint256 private commissionPayout = 0;
	uint16 private constant crowdFundCommission = 25; //.25%
	uint16 private constant crowdFundDenominator = 10000;
	string private constant MSG_PREFIX = "\x19Ethereum Signed Message:\n32";

	event DonationOccurred(address[] owners, address donor, uint256 amount);

	event FundRunOwnerWithdrawal(address[] owners, uint256 amount);

	event DonorWithdrawal(address[] owners, address donor, uint256 amount);

	event ContractOwnerWithdrawal(address contractOwner, uint256 amount);

	event FundRunCreated(
		uint16 id,
		address[] owners,
		string title,
		uint256 target
	);

	event ProposalCreated(
		address proposedBy,
		bytes signature,
		uint16 fundRunId,
		uint16 proposalId,
		uint256 amount,
		address to,
		string reason
	);

	event ProposalSupported(
		address supportedBy,
		bytes signature,
		uint16 fundRunId,
		uint16 proposalId
	);

	event ProposalRevoked(
		uint16 fundRunId,
		uint16 proposalId,
		address to,
		string reason
	);

	event MultisigTransferCompleted(
		uint16 fundRunId,
		uint16 proposalId,
		address to,
		uint256 amount
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
				fundRuns[id].deadline < block.timestamp,
				"This Fund Run is not complete."
			);
		} else {
			require(
				fundRuns[id].deadline > block.timestamp,
				"This Fund Run has already completed."
			);
		}
		_;
	}

	modifier fundRunSucceeded(uint16 id, bool mustHaveSucceeded) {
		if (mustHaveSucceeded) {
			require(
				fundRuns[id].amountCollected >= fundRuns[id].target,
				"This Fund Run has not yet met its monetary goal."
			);
		} else {
			require(
				fundRuns[id].amountCollected < fundRuns[id].target,
				"This Fund Run has already met its monetary goal."
			);
		}
		_;
	}

	modifier isMultisig(uint16 id, bool mustBeMultisig) {
		if (mustBeMultisig) {
			require(
				fundRuns[id].owners.length > 1,
				"This is NOT a multisig Fund Run - Operation not allowed."
			);
		} else {
			require(
				fundRuns[id].owners.length == 1,
				"This IS a multisig Fund Run - Operation not allowed."
			);
		}
		_;
	}

	// // modifier createdProposal(
	// // 	uint16 _proposalId,
	// // 	uint16 _fundRunId,
	// // 	address signer,
	// // 	bool mustBeProposer
	// // ) {
	// // 	MultiSigVault[] storage vaultsList = vaults[_fundRunId];
	// // 	for (uint16 i = 0; i < vaultsList.length; i++) {
	// // 		if (vaultsList[i].proposalId == _proposalId) {
	// // 			if (mustBeProposer) {
	// // 				require(
	// // 					vaultsList[i].proposedBy == signer,
	// // 					"The address is NOT the creator of this proposal -- action not allowed."
	// // 				);
	// // 				_;
	// // 			} else {
	// // 				require(
	// // 					vaultsList[i].proposedBy != signer,
	// // 					"The address is the creator of this proposal -- creators of proposals can not support them -- action not allowed."
	// // 				);
	// // 				_;
	// // 			}
	// // 		}
	// // 	}
	// // }

	// // modifier txNotSent(uint16 _proposalId, uint16 _fundRunId) {
	// // 	for (uint16 i = 0; i < vaults[_fundRunId].length; i++) {
	// // 		if (vaults[_fundRunId][i].proposalId == _proposalId) {
	// // 			require(
	// // 				vaults[_fundRunId][i].status != ProposalStatus(2),
	// // 				"This Multisig Tx has already went through."
	// // 			);
	// // 			_;
	// // 		}
	// // 	}
	// // }

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

	function createMultisigProposal(
		bytes calldata _signature,
		uint16 _fundRunId,
		MultiSigRequest calldata _tx
	)
		external
		isMultisig(_fundRunId, true)
		ownsThisFundRun(_fundRunId, msg.sender, true)
		fundRunCompleted(_fundRunId, true)
		fundRunSucceeded(_fundRunId, true)
	{
		FundRun storage fundRun = fundRuns[_fundRunId];
		require(fundRun.amountCollected > 0, "There is nothing to withdraw");
		require(
			fundRun.amountCollected > fundRun.amountWithdrawn,
			"This Fund Run is empty -- withdrawals may have already occurred."
		);
		require(
			_tx.amount > 0,
			"The proposed transaction withdrawal amount must be greater than 0."
		);
		require(
			fundRun.amountWithdrawn + _tx.amount <= fundRun.amountCollected,
			"This proposal would overdraw this Fund Run."
		);

		// // signatureList[numberOfMultisigProposals].push(_signature);
		// // signerList[numberOfMultisigProposals].push(msg.sender);

		// // MultiSigVault memory vault = MultiSigVault({
		// // 	proposalId: numberOfMultisigProposals,
		// // 	amount: _tx.amount,
		// // 	to: _tx.to,
		// // 	proposedBy: _tx.proposedBy,
		// // 	reason: _tx.reason,
		// // 	status: ProposalStatus(0)
		// // });
		// // vaults[_fundRunId].push(vault);

		emit ProposalCreated(msg.sender, _signature, _fundRunId, numberOfMultisigProposals, _tx.amount, _tx.to, _tx.reason); //TODO: status?
		numberOfMultisigProposals++;
	}

	function supportMultisigProposal(
		bytes calldata _signature,
		uint16 _fundRunId,
		uint16 _proposalId
	)
		external
		isMultisig(_fundRunId, true)
		ownsThisFundRun(_fundRunId, msg.sender, true)
		// // createdProposal(_proposalId, _fundRunId, msg.sender, false)
		// // txNotSent(_proposalId, _fundRunId)
	{
		// // require(
		// // 	!userHasSigned(msg.sender, _proposalId),
		// // 	"This user has already supported this proposal."
		// // );
		// // changeProposalStatus(_fundRunId, _proposalId, 1);
		emit ProposalSupported(msg.sender, _signature, _fundRunId, _proposalId);
	}

	/**
	 * @dev  final transfer/call (when all signers are thought to have signed)
	 */
	function multisigWithdraw(
		MultiSigRequest calldata _tx,
		uint256 _nonce,
		uint16 _fundRunId,
		uint16 _proposalId,
		bytes[] calldata _signaturesList //TODO: get from subgraph
	)
		external
		nonReentrant
		isMultisig(_fundRunId, true)
		ownsThisFundRun(_fundRunId, msg.sender, true)
		// // txNotSent(_proposalId, _fundRunId)
	{
		_verifyMultisigRequest(
			_tx,
			_nonce,
			_signaturesList, //TODO: get from subgraph
			_fundRunId
		);
		_multisigTransfer(_tx, _fundRunId, _proposalId);
	}

	/**
	 * @dev  Only the user who created a proposal can revoke it
	 */
	// // function revokeMultisigProposal(
	// // 	uint16 _fundRunId,
	// // 	uint16 _proposalId
	// // )
	// // 	external
	// // 	isMultisig(_fundRunId, true)
	// // 	ownsThisFundRun(_fundRunId, msg.sender, true)
	// // 	createdProposal(_proposalId, _fundRunId, msg.sender, true)
	// // 	txNotSent(_proposalId, _fundRunId)
	// // {
	// // 	MultiSigVault[] storage vaultsList = vaults[_fundRunId];
	// // 	for (uint16 i = 0; i < vaultsList.length; i++) {
	// // 		if (vaultsList[i].proposalId == _proposalId) {
	// // 			emit ProposalRevoked(
	// // 				_fundRunId,
	// // 				_proposalId,
	// // 				vaults[_fundRunId][i].to,
	// // 				vaults[_fundRunId][i].reason
	// // 			);
	// // 			delete vaults[_fundRunId][i];
	// // 			break;
	// // 		}
	// // 	}
	// // }

	function createFundRun(
		string memory _title,
		string memory _description,
		uint256 _target,
		uint16 _deadline,
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
		require(validateOwners(msg.sender, _owners), "The co-owners and the creator of a Fund Run must all have different wallet addresses.");

		FundRun storage fundRun = fundRuns[numberOfFundRuns];
		fundRun.id = numberOfFundRuns;
		fundRun.owners = _owners;
		fundRun.title = _title;
		fundRun.description = _description;
		fundRun.target = _target;
		fundRun.deadline = fundRunDeadline;
		fundRun.amountCollected = 0;
		fundRun.amountWithdrawn = 0;
		fundRun.status = FundRunStatus(0);
		numberOfFundRuns++;

		emit FundRunCreated(
			fundRun.id,
			fundRun.owners,
			fundRun.title,
			fundRun.target
		);
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

		FundRun storage fundRun = fundRuns[_id];

		fundRun.donors.push(msg.sender);
		fundRun.donations.push(amount);

		/**
		 * @dev next few lines are how a person can donate to multiple fund runs (multiple times)
		 * while still keeping the donations logged separately for proper withdrawal
		 * Donor's Address _> Donor Log _> mapping(fundRunID => donationAmount)
		 */
		DonorsLog storage donorLog = donorLogs[msg.sender];
		if (donorLog.donor != msg.sender) donorLog.donor = msg.sender;
		uint256 previouslyDonated = donorLog.donorMoneyLog[fundRun.id];
		donorLog.donorMoneyLog[fundRun.id] = amount + previouslyDonated;
		uint256 newAmountCollected = fundRun.amountCollected + amount;
		fundRun.amountCollected = newAmountCollected;

		if (
			fundRun.amountCollected >= fundRun.target &&
			fundRun.status != FundRunStatus(2)
		) fundRun.status = FundRunStatus(2);

		emit DonationOccurred(fundRun.owners, msg.sender, amount);
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
		FundRun storage fundRun = fundRuns[_id];
		require(fundRun.amountCollected > 0, "There is nothing to withdraw");
		require(
			fundRun.amountCollected > fundRun.amountWithdrawn,
			"This Fund Run is empty -- a withdrawal may have already occurred."
		);
		uint256 grossWithdrawAmount = fundRun.amountCollected -
			fundRun.amountWithdrawn;
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
			(grossWithdrawAmount + fundRun.amountWithdrawn) <=
				fundRun.amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		//contract takes its cut
		uint256 netWithdrawAmount = getNetWithdrawAmount(grossWithdrawAmount);

		fundRun.amountWithdrawn = fundRun.amountWithdrawn + grossWithdrawAmount;

		if (fundRun.status != FundRunStatus(3))
			fundRun.status = FundRunStatus(3);

		(bool success, ) = payable(msg.sender).call{ value: netWithdrawAmount }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit FundRunOwnerWithdrawal(fundRun.owners, netWithdrawAmount);
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
		FundRun storage fundRun = fundRuns[_id];
		DonorsLog storage donorLog = donorLogs[msg.sender];
		uint256 amountToWithdraw = donorLog.donorMoneyLog[fundRun.id];
		require(
			amountToWithdraw > 0,
			"There is nothing to withdraw - Have you already withdrawn?"
		);

		///@dev ADD the would-be withdrawal amount to the actual withdrawn amount
		///and ensure they are going to be less-than/equal-to the Fund Run's total balance ("amountCollected")
		require(
			(amountToWithdraw + fundRun.amountWithdrawn) <=
				fundRun.amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		if (fundRun.status != FundRunStatus(1))
			fundRun.status = FundRunStatus(1);

		donorLog.donorMoneyLog[fundRun.id] = 0;
		fundRun.amountWithdrawn = fundRun.amountWithdrawn + amountToWithdraw;

		(bool success, ) = payable(msg.sender).call{ value: amountToWithdraw }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit DonorWithdrawal(fundRun.owners, msg.sender, amountToWithdraw);
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

	function updateFundRunStatus(uint16 _fundRunId) external {
		FundRun storage fundRun = fundRuns[_fundRunId];
		if (fundRun.deadline < block.timestamp)
			if (fundRun.amountCollected < fundRun.target)
				fundRun.status = FundRunStatus(1);
			else fundRun.status = FundRunStatus(3);
		else if (fundRun.amountCollected < fundRun.target)
			fundRun.status = FundRunStatus(0);
		else fundRun.status = FundRunStatus(2);
	}

	/**
	 * @dev Returns list of Fund Runs in reverse order (latest-first)
	 */
	function getFundRuns() external view returns (FundRun[] memory) {
		FundRun[] memory allFundRuns = new FundRun[](numberOfFundRuns);
		for (uint16 i = 1; i < numberOfFundRuns + 1; i++) {
			allFundRuns[i - 1] = fundRuns[numberOfFundRuns - i];
		}
		return allFundRuns;
	}

	/**
	 * @dev Returns list of Proposals (from a Fund Run's Vault)
	 */
	// // function getProposals(
	// // 	uint16 _fundRunId
	// // ) external view returns (MultiSigVault[] memory) {
	// // 	return vaults[_fundRunId];
	// // }

	function getFundRun(uint16 _id) external view returns (FundRun memory) {
		return fundRuns[_id];
	}

	function timeLeft(uint16 _id) external view returns (uint256) {
		require(block.timestamp < fundRuns[_id].deadline, "It's ovaaaa");
		return fundRuns[_id].deadline - block.timestamp;
	}

	function getBalance()
		external
		view
		returns (uint256 crowdFund_contractBalance)
	{
		return address(this).balance;
	}

	function getNonce(uint16 _fundRunId) external view returns (uint256) {
		return vaultNonces[_fundRunId];
	}

	function _verifyMultisigRequest(
		MultiSigRequest calldata _tx,
		uint256 _nonce,
		bytes[] calldata _signatures,
		uint16 _fundRunId
	) private {
		require(_nonce > vaultNonces[_fundRunId], "nonce already used");
		uint256 signaturesCount = _signatures.length;
		require(
			signaturesCount == fundRuns[_fundRunId].owners.length,
			"not enough signers"
		);
		bytes32 digest = _processMultisigRequest(_tx, _nonce);

		address initialSigner;
		for (uint256 i = 0; i < signaturesCount; i++) {
			bytes memory signature = _signatures[i];
			address signer = ECDSA.recover(digest, signature);
			require(
				isOwnerOfFundRun(signer, _fundRunId),
				"Possible Issues: Proposal completed, problem with signature, or you are not a co-owner of this Fund Run."
			);
			require(
				signer != initialSigner,
				"duplicate signature has been prevented."
			);
			initialSigner = signer;
		}
		vaultNonces[_fundRunId] = _nonce;
	}

	function _processMultisigRequest(
		MultiSigRequest calldata _tx,
		uint256 _nonce
	) private pure returns (bytes32 _digest) {
		bytes memory encoded = abi.encode(_tx);
		_digest = keccak256(abi.encodePacked(encoded, _nonce));
		_digest = keccak256(abi.encodePacked(MSG_PREFIX, _digest));
	}

	function _multisigTransfer(
		MultiSigRequest calldata _tx,
		uint16 _fundRunId,
		uint16 _proposalId
	) private {
		FundRun storage fundRun = fundRuns[_fundRunId];
		require(fundRun.amountCollected > 0, "There is nothing to withdraw");
		require(
			fundRun.amountCollected > fundRun.amountWithdrawn,
			"This Fund Run is empty -- withdrawals may have already occurred."
		);
		require(
			_tx.amount > 0,
			"The proposed transaction withdrawal amount is 0."
		);
		require(
			fundRun.amountWithdrawn + _tx.amount <= fundRun.amountCollected,
			"This Fund Run is hereby prevented from being over-drawn."
		);

		//contract takes its cut
		uint256 netWithdrawAmount = getNetWithdrawAmount(_tx.amount);

		fundRun.amountWithdrawn = fundRun.amountWithdrawn + _tx.amount;

		if (fundRun.status != FundRunStatus(3))
			fundRun.status = FundRunStatus(3);

		// // changeProposalStatus(_fundRunId, _proposalId, 2);

		(bool success, ) = payable(_tx.to).call{ value: netWithdrawAmount }("");

		require(success, "Transfer not fulfilled");
		emit MultisigTransferCompleted(
			_fundRunId,
			_proposalId,
			_tx.to,
			netWithdrawAmount
		);
	}

	// // function changeProposalStatus(
	// // 	uint16 _fundRunId,
	// // 	uint16 _proposalId,
	// // 	uint16 _newStatus
	// // ) private {
	// // 	for (uint16 i = 0; i < vaults[_fundRunId].length; i++) {
	// // 		if (vaults[_fundRunId][i].proposalId == _proposalId) {
	// // 			if (vaults[_fundRunId][i].status != ProposalStatus(_newStatus))
	// // 				vaults[_fundRunId][i].status = ProposalStatus(_newStatus);
	// // 			break;
	// // 		}
	// // 	}
	// // }

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
		for (uint16 i = 0; i < fundRuns[_id].owners.length; i++) {
			if (fundRuns[_id].owners[i] == _addr) return true;
		}
		return false;
	}

	// // function userHasSigned(
	// // 	address _signer,
	// // 	uint16 _proposalId
	// // ) private view returns (bool) {
	// // 	for (uint16 i = 0; i < signerList[_proposalId].length; i++) {
	// // 		if (signerList[_proposalId][i] == _signer) return true;
	// // 	}
	// // 	return false;
	// // }

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
		if(_owners.length == 1) return true;
		bool creatorAlreadyInList = false;
		address addrOne;
		address addrTwo;
		for (uint16 i = 0; i < _owners.length; i++) {
			if (_owners[i] == _creator && creatorAlreadyInList) return false;
			else if(_owners[i] == _creator) creatorAlreadyInList = true;
			if (_owners[i] == addrOne || _owners[i] == addrTwo) return false;
			if (i == 0) addrOne = _owners[i];
			else if (i == 1) addrTwo = _owners[i];
		}
		return true;
	}

	//TODO: PRODTODO:: remove this _________________________________________>
	function forceEnd(uint16 _id) external {
		require(block.timestamp < fundRuns[_id].deadline, "It's ovaaaa");
		uint256 diff = (fundRuns[_id].deadline - block.timestamp) + 5;
		fundRuns[_id].deadline = diff;
	}
	//TODO: PRODTODO:: END: remove this ^^^________________________^^^
}
