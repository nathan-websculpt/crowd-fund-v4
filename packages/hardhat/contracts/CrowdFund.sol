//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./SocialPostManager.sol";

/**
 * @title Crowd Fund - Where new dev/work will be added
 * @dev NOT PRODUCTION-READY ... FOR LEARNING PURPOSES ONLY
 *
 * Now there will only be multisig Fund Runs (no more single-owner Fund Runs)
 * Fund Runs will be open-ended (can be topped-off)
 * removed deadlines, money-targets, owner-/donor-withdrawals
 *
 *                  ____> ALL CONTRACTS <____
 *                      CrowdFundLibrary
 *                             |
 *                             V
 *                        ProfitTaker
 *                             |
 *                             V
 *                       MultisigManager
 *                             |
 *                             V
 *                       FundRunManager
 *                             |
 *                             V
 *                      SocialPostManager
 *                             |
 *                             V
 *                         CrowdFund
 *
 *
 *
 *
 *
 * CrowdFundLibrary       (  structs  )
 * ProfitTaker            (  contractOwnerWithdraw()  )
 * MultisigManager        (  proposal management and multisig transfers  )
 * FundRunManager         (  donations/payable, createFundRun()  )
 * SocialPostManager      (  manage proposals to make social media type Posts  )
 * CrowdFund              (    ... working/devving here    )
 *
 */

contract CrowdFund is SocialPostManager {
	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}
}
