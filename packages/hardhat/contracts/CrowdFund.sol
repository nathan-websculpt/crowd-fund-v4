//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./CrowdFundManager.sol";

/**
 * @dev NOT PRODUCTION-READY ... FOR LEARNING PURPOSES ONLY
 * going to start by removing deadlines
 * there will only be multisigs, now (no more single-owners)
 * Fund Runs will be open-ended (can be topped-off)
 * 
 * 
 * "Fund Runs" will be more like "business accounts" on a social network??
 * They will be able to "post" from their page, but ALL owners must agree on a post
 * "All Owners" may also soon change to a "threshold" of signatures required (instead of amount of owners)
 */

 // CrowdFundLibrary
 // ProfitTaker
 // MultisigManager
 // CrowdFundManager (donations, payables, etc)
 // CrowdFund ( ... working/devving here.)

contract CrowdFund is CrowdFundManager {
	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

}
