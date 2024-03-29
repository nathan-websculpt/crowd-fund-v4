//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./CrowdFundLibrary.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { ECDSA } from "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title Profit Taker - Only Owner is allowed to take the profit from this contract
 *  - Profit is 0.25% of all multisig transfers (not on the donation)
 *
 */

contract ProfitTaker is Ownable, ReentrancyGuard {
	uint256 public totalProfitsTaken = 0;
	uint256 private commissionPayout = 0;
	uint16 private constant crowdFundCommission = 25; //.25%
	uint16 private constant crowdFundDenominator = 10000;

	event ContractOwnerWithdrawal(address contractOwner, uint256 amount);

	/**
	 * @dev  (OnlyOwner can) Withdraw the profits this contract has made
	 */
	function contractOwnerWithdraw() external onlyOwner nonReentrant {
		require(commissionPayout > 0, "Nothing to withdraw");

		uint256 amountToWithdraw = commissionPayout;
		commissionPayout = 0;
		totalProfitsTaken = totalProfitsTaken + amountToWithdraw;

		(bool success, ) = payable(msg.sender).call{ value: amountToWithdraw }(
			""
		);

		require(success, "Withdrawal reverted.");
		emit ContractOwnerWithdrawal(msg.sender, amountToWithdraw);
	}

	/**
	 * @dev called by MultisigManager.sol
	 */
	function _getNetWithdrawAmount(
		uint256 _grossWithdrawAmount
	) internal returns (uint256 netWithdrawAmount) {
		uint256 fundsMinusCommission = (_grossWithdrawAmount *
			crowdFundCommission) / crowdFundDenominator; //0.25%
		netWithdrawAmount = _grossWithdrawAmount - fundsMinusCommission;
		//update profit amount
		commissionPayout = commissionPayout + fundsMinusCommission;
	}
}
