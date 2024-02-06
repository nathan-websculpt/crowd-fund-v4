//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Followers Manager - handles when users follow/unfollow fund runs
 *
 */

contract FollowersManager {
	event Follow(uint16 fundRunId, address user);

	event Unfollow(uint16 fundRunId, address user);

	function follow(uint16 _fundRunId) external {
		emit Follow(_fundRunId, msg.sender);
	}

	function unfollow(uint16 _fundRunId) external {
		emit Unfollow(_fundRunId, msg.sender);
	}
}
