//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ProfitTaker.sol";
import "hardhat/console.sol";//TODO: remove

/**
 * @title Multisig Manager - proposal management and multisig transfers
 *
 *  FUNCTIONS for a TRANSFER:
 * 
 *    [external] 
 *  - multisigWithdraw _>  _verifyMultisigRequest _> _processMultisigRequest
 *                     _>  _multisigTransfer (sends funds)
 */

contract MultisigManager is ProfitTaker {
	enum ProposalStatus {
		Created,
		ReadyToSend,
		TxSent,
		Revoked
	}

	mapping(uint16 => uint256) public vaultNonces;
	mapping(uint16 => address) public proposalCreators;
	mapping(uint16 => address[]) public fundRunOwners;
	mapping(uint16 => address[]) public proposalSigners;
	mapping(uint16 => ProposalStatus) public proposalStatuses;
	mapping(uint16 => CrowdFundLibrary.FundRunValues) public fundRunValues;
	mapping(address => CrowdFundLibrary.DonorsLog) public donorLogs; //a single donor will have all of their logs (across all Fund Runs they donated to) here

	uint16 public numberOfMultisigProposals = 0;
	uint16 public numberOfFundRuns = 0;

	string private constant MSG_PREFIX = "\x19Ethereum Signed Message:\n32";

	event ProposalSignature(uint16 proposalId, address signer, bytes signature);

	event ProposalRevoke(uint16 proposalId);

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
				_isOwnerOfFundRun(sender, id),
				"You are not the owner of this Fund Run."
			);
		} else {
			require(
				!_isOwnerOfFundRun(sender, id),
				"You own this Fund Run -- therefore, this operation is not allowed"
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

	function createMultisigProposal(
		bytes calldata _signature,
		uint16 _id,
		CrowdFundLibrary.MultiSigRequest calldata _tx
	) external ownsThisFundRun(_id, msg.sender, true) {
		console.log("HARDHAT CONSOLE__>   createMultisigProposal hit");
		_checkMultisigProposal(
			fundRunValues[_id].amountCollected,
			fundRunValues[_id].amountWithdrawn,
			_tx.amount
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
		ownsThisFundRun(_id, msg.sender, true)
		createdProposal(_proposalId, msg.sender, false)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
		userHasNotSigned(_proposalId, msg.sender)
	{
		proposalSigners[_proposalId].push(msg.sender);
		proposalStatuses[_proposalId] = ProposalStatus(1);
		emit ProposalSignature(_proposalId, msg.sender, _signature);
		console.log("HARDHAT CONSOLE__>   supportMultisigProposal hit ... sig");
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
		ownsThisFundRun(_id, msg.sender, true)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
	{
		console.log("HARDHAT CONSOLE__>   multisigWithdraw hit ... ");
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
		ownsThisFundRun(_id, msg.sender, true)
		createdProposal(_proposalId, msg.sender, true)
		txNotSent(_proposalId)
		notRevoked(_proposalId)
	{
		proposalStatuses[_proposalId] = ProposalStatus(3);
		emit ProposalRevoke(_proposalId);
	}

	function getNonce(uint16 _id) external view returns (uint256) {
		return vaultNonces[_id];
	}

	function _verifyMultisigRequest(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint256 _nonce,
		bytes[] calldata _signatures,
		uint16 _id
	) private {
		console.log("HARDHAT CONSOLE__>   _verifyMultisigRequest hit ");
		require(_nonce > vaultNonces[_id], "nonce already used");
		uint256 signaturesCount = _signatures.length;
		require(
			signaturesCount == fundRunOwners[_id].length, //TODO: eventually getting a "max signature count" from user
			"not enough signers"
		);
		console.log("HARDHAT CONSOLE__>   _verifyMultisigRequest ... AFTER requireds ");
		bytes32 digest = _processMultisigRequest(_tx, _nonce);

		address initialSigner;
		for (uint256 i = 0; i < signaturesCount; i++) {
			bytes memory signature = _signatures[i];
			address signer = ECDSA.recover(digest, signature);
			require(
				_isOwnerOfFundRun(signer, _id),
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
		_checkMultisigProposal(
			fundRunValues[_id].amountCollected,
			fundRunValues[_id].amountWithdrawn,
			_tx.amount
		);
		console.log("HARDHAT CONSOLE__>   _multisigTransfer hit ");

		//contract takes its cut
		uint256 netWithdrawAmount = _getNetWithdrawAmount(_tx.amount);

		fundRunValues[_id].amountWithdrawn =
			fundRunValues[_id].amountWithdrawn +
			_tx.amount;

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

	function _isOwnerOfFundRun(
		address _addr,
		uint16 _id
	) private view returns (bool) {
		for (uint16 i = 0; i < fundRunOwners[_id].length; i++) {
			if (fundRunOwners[_id][i] == _addr) return true;
		}
		return false;
	}

	function _checkMultisigProposal(
		uint256 _amtCollected,
		uint256 _amtWithdrawn,
		uint256 _txAmt
	) private pure {
		require(_amtCollected > 0, "There is nothing to withdraw");
		require(
			_amtCollected > _amtWithdrawn,
			"This Fund Run is empty -- withdrawals may have already occurred."
		);
		require(
			_txAmt > 0,
			"The proposed transaction withdrawal amount must be greater than 0."
		);
		require(
			_amtWithdrawn + _txAmt <= _amtCollected,
			"This proposal would overdraw this Fund Run."
		);
	}

	function _processMultisigRequest(
		CrowdFundLibrary.MultiSigRequest calldata _tx,
		uint256 _nonce
	) private pure returns (bytes32 _digest) {
		bytes memory encoded = abi.encode(_tx);
		_digest = keccak256(abi.encodePacked(encoded, _nonce));
		_digest = keccak256(abi.encodePacked(MSG_PREFIX, _digest));
	}
}
