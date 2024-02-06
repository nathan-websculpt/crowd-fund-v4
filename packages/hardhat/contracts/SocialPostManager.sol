//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./FundRunManager.sol";

/**
 * @title Social Post Manager - Where proposals for a Fund Run to create a new Social Media Post are managed
 *
 */

 contract SocialPostManager is FundRunManager {
	enum SocialProposalStatus {
		Created,
		ReadyToSend,
		PostSent,
		Revoked
	}

	mapping(uint16 => uint256) public socialManagementNonces;
	mapping(uint16 => address) public socialProposalCreators;
	mapping(uint16 => address[]) public socialProposalSigners;
	mapping(uint16 => SocialProposalStatus) public socialProposalStatuses;
	uint16 public numberOfSocialProposals = 0;
	
	event SocialProposalRevoke(uint16 socialProposalId);

	event SocialProposalSignature(
		uint16 socialProposalId,
		address signer,
		bytes signature
	);

	event SocialProposal(
		uint16 socialProposalId,
		uint16 fundRunId,
		address proposedBy,
		string postText,
		SocialProposalStatus status,
		uint256 signaturesRequired,
		uint16 signaturesCount
	);

	event SocialPost(
		uint16 socialProposalId,
		uint16 fundRunId,
		address proposedBy,
		string postText
	);

	modifier createdSocialProposal(
		uint16 socialProposalId,
		address signer,
		bool mustBeProposer
	) {
		if (mustBeProposer) {
			require(
				socialProposalCreators[socialProposalId] == signer,
				"The address is NOT the creator of this proposal -- action not allowed."
			);
			_;
		} else {
			require(
				socialProposalCreators[socialProposalId] != signer,
				"The address is the creator of this proposal -- creators of proposals can not support them -- action not allowed."
			);
			_;
		}
	}

	modifier postNotSent(uint16 socialProposalId) {
		require(
			socialProposalStatuses[socialProposalId] != SocialProposalStatus(2),
			"This Post has already been Posted."
		);
		_;
	}

	modifier socialProposalNotRevoked(uint16 socialProposalId) {
		require(
			socialProposalStatuses[socialProposalId] != SocialProposalStatus(3),
			"This Proposal has been revoked - action not allowed."
		);
		_;
	}

	modifier userHasNotSignedSocialProposal(uint16 socialProposalId, address signer) {
		for (uint16 i = 0; i < socialProposalSigners[socialProposalId].length; i++) {
			require(
				socialProposalSigners[socialProposalId][i] != signer,
				"This user has already signed this proposal - action not allowed."
			);
		}
		_;
	}

	function createSocialProposal(
		bytes calldata _signature,
		uint16 _id,
		CrowdFundLibrary.SocialMediaRequest calldata _tx
	) external ownsThisFundRun(_id, msg.sender, true) {
		SocialProposalStatus thisStatus = SocialProposalStatus(0);
		socialProposalCreators[numberOfSocialProposals] = msg.sender;
		socialProposalStatuses[numberOfSocialProposals] = thisStatus;
		socialProposalSigners[numberOfSocialProposals].push(msg.sender);

		emit SocialProposal(
			numberOfSocialProposals,
			_id,
			msg.sender,
			_tx.postText,
			thisStatus,
			fundRunOwners[_id].length, //TODO: later on ... get value from user - total signatures required
			0
		);

		emit SocialProposalSignature(numberOfSocialProposals, msg.sender, _signature);

		numberOfSocialProposals++;
	}

	function supportSocialProposal(
		bytes calldata _signature,
		uint16 _id,
		uint16 _socialProposalId
	)
		external
		ownsThisFundRun(_id, msg.sender, true)
		createdSocialProposal(_socialProposalId, msg.sender, false)
		postNotSent(_socialProposalId)
		socialProposalNotRevoked(_socialProposalId)
		userHasNotSignedSocialProposal(_socialProposalId, msg.sender)
	{
		socialProposalSigners[_socialProposalId].push(msg.sender);
		socialProposalStatuses[_socialProposalId] = SocialProposalStatus(1);
		emit SocialProposalSignature(_socialProposalId, msg.sender, _signature);
	}

	/**
	 * @dev  final (when all signers are thought to have signed)
	 */
	function finalizeAndPost(
		CrowdFundLibrary.SocialMediaRequest calldata _tx,
		uint256 _nonce,
		uint16 _id,
		uint16 _socialProposalId,
		bytes[] calldata _signaturesList
	)
		external
		nonReentrant
		ownsThisFundRun(_id, msg.sender, true)
		postNotSent(_socialProposalId)
		socialProposalNotRevoked(_socialProposalId)
	{
		_verifySocialRequest(_tx, _nonce, _signaturesList, _id);		
		socialProposalStatuses[_socialProposalId] = SocialProposalStatus(2);
		emit SocialPost(_socialProposalId, _id, _tx.proposedBy, _tx.postText);
	}

	/**
	 * @dev  Only the user who created a proposal can revoke it
	 */
	function revokeSocialProposal(
		uint16 _id,
		uint16 _socialProposalId
	)
		external
		ownsThisFundRun(_id, msg.sender, true)
		createdSocialProposal(_socialProposalId, msg.sender, true)
		postNotSent(_socialProposalId)
		socialProposalNotRevoked(_socialProposalId)
	{
		socialProposalStatuses[_socialProposalId] = SocialProposalStatus(3);
		emit SocialProposalRevoke(_socialProposalId);
	}

	function getSocialManagementNonce(uint16 _id) external view returns (uint256) {
		return socialManagementNonces[_id];
	}

	function _verifySocialRequest(
		CrowdFundLibrary.SocialMediaRequest calldata _tx,
		uint256 _nonce,
		bytes[] calldata _signatures,
		uint16 _id
	) private {
		require(_nonce > socialManagementNonces[_id], "nonce already used");
		uint256 signaturesCount = _signatures.length;
		require(
			signaturesCount == fundRunOwners[_id].length, //TODO: eventually getting a "max signature count" from user
			"not enough signers"
		);
		bytes32 digest = _processSocialRequest(_tx, _nonce);

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
		socialManagementNonces[_id] = _nonce;
	}

	function _processSocialRequest(
		CrowdFundLibrary.SocialMediaRequest calldata _tx,
		uint256 _nonce
	) private pure returns (bytes32 _digest) {
		bytes memory encoded = abi.encode(_tx);
		_digest = keccak256(abi.encodePacked(encoded, _nonce));
		_digest = keccak256(abi.encodePacked(MSG_PREFIX, _digest));
	}
}
