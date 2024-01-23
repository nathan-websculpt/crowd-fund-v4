//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library CrowdFundLibrary {
	struct MultiSigRequest {
		uint256 amount;
		address to;
		address proposedBy;
		string reason;
	}

	struct FundRunValues {
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
}
