//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Crowd Fund Library - Holds structs that are used in other contracts
 *
 */

library CrowdFundLibrary {
	struct MultiSigRequest {
		uint256 amount;
		address to;
		address proposedBy;
		string reason;
	}
<<<<<<< HEAD

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
=======
}
>>>>>>> d7246d719ad6a02249890e54a7ed3845077b047a
