//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title ----
 * @dev Singleton Pattern prevents other contracts in the Inheritance Tree
 * from instantiating duplicate instances of this contract; thus, preventing replays
 *
 * DYOR, because it is thought that a truer form of the "Singleton Pattern" is when
 * deployment is such that the contract's address is the same on all chains.
 *
 * The relationship that CrowdFund has with this contract is designed in a way that
 * a developer could not accidentally use another instance of this contract.
 *
 */

contract Singleton {
	bool private deployed = false;

	modifier enforceDeployed() {
		require(
			deployed,
			"Something is wrong with the instance of Singleton."
		);
		_;
	}

	constructor() {
		require(
			!deployed,
			"Prevented in constructor of Singleton -- Singleton already deployed."
		);
		deployed = true;
	}

	// global access point
	function getInstance() public view returns (address) {
		return address(this);
	}

	function foo(address _addr) public view enforceDeployed returns (address) {
		return (_addr);
	}
}
