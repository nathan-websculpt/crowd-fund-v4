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
}