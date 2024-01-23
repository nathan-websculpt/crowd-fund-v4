//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MultisigManager.sol";

/**
 * @title Fund Run Manager - creates Fund Runs and allows for donations to them
 *
 */

contract FundRunManager is MultisigManager {
	event Donation(uint16 fundRunId, address donor, uint256 amount);

	event FundRun(
		uint16 fundRunId,
		address[] owners,
		string title,
		string description,
		uint256 amountCollected,
		uint256 amountWithdrawn
	);

	function createFundRun(
		string memory _title,
		string memory _description,
		address[] memory _owners
	) external {
		bytes32 baseCompare = keccak256("");
		bytes32 titleCompare = keccak256(bytes(_title));
		bytes32 descriptionCompare = keccak256(bytes(_description));
		require(
			titleCompare != baseCompare && descriptionCompare != baseCompare,
			"Title and Description are both required fields."
		);

		/**
		 * @dev prevents creator from adding self as co-owner
		 *      prevents two co-owners from having the same address
		 */
		require(
			_validateOwners(msg.sender, _owners),
			"The co-owners and the creator of a Fund Run must all have different wallet addresses."
		);

		CrowdFundLibrary.FundRunValues storage fundRunVals = fundRunValues[
			numberOfFundRuns
		];
		fundRunVals.amountCollected = 0;
		fundRunVals.amountWithdrawn = 0;

		fundRunOwners[numberOfFundRuns] = _owners;

		emit FundRun(numberOfFundRuns, _owners, _title, _description, 0, 0);

		numberOfFundRuns++;
	}

	function donateToFundRun(
		uint16 _id
	) external payable ownsThisFundRun(_id, msg.sender, false) {
		require(msg.value > 0, "Minimum payment amount not met.");
		uint256 amount = msg.value;

		/**
		 * @dev next few lines are how a person can donate to multiple fund runs (multiple times)
		 * while still keeping the donations logged separately for proper withdrawal
		 * Donor's Address _> Donor Log _> mapping(fundRunID => donationAmount)
		 */
		CrowdFundLibrary.DonorsLog storage donorLog = donorLogs[msg.sender];
		if (donorLog.donor != msg.sender) donorLog.donor = msg.sender;
		uint256 previouslyDonated = donorLog.donorMoneyLog[_id];
		donorLog.donorMoneyLog[_id] = amount + previouslyDonated;
		uint256 newAmountCollected = fundRunValues[_id].amountCollected +
			amount;
		fundRunValues[_id].amountCollected = newAmountCollected;

		emit Donation(_id, msg.sender, amount);
	}
}
