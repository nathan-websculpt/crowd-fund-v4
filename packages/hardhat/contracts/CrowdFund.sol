//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./SocialPostManager.sol";
import "./Singleton.sol";

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
	address private singletonInstance;
	Singleton private singleton;

	//EVENTS

	//TODO: this may be redundancy-overkill
	modifier enforceSingletonInstance() {
		require(
			singleton.getInstance() == singletonInstance,
			"The wrong instance of Singleton is being used."
		);
		_;
	}

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
		require(
			address(singleton) == address(0),
			"Singleton instance already exists."
		);
		singleton = new Singleton();
		singletonInstance = singleton.getInstance();
	}

	function bar()
		public
		view
		enforceSingletonInstance
		returns (address)
	{
		address yo = singleton.foo(msg.sender);
		return (yo);
	}
}
