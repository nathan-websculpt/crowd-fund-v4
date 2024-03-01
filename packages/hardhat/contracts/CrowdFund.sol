//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./SocialPostManager.sol";
import "./FollowersManager.sol";

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

contract CrowdFund is SocialPostManager, FollowersManager {
	uint256 public numberOfComments = 0; //only using this to get comments ordered nicely in the front-end
	event Comment (uint256 numericalId, bytes postId, bytes parentCommentId, string commentText, address commenter);
	event PostLike (bytes postId, address userWhoLiked);
	event CommentLike (bytes postId, bytes commentId, address userWhoLiked);

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

	function createComment(bytes memory _postId, bytes memory _parentCommentId, string memory _commentText) external {
		emit Comment(numberOfComments, _postId, _parentCommentId, _commentText, msg.sender);
		numberOfComments++;
	}

	function likePost(bytes memory _postId) external {
		emit PostLike(_postId, msg.sender);
	}

	function likeComment(bytes memory _postId, bytes memory _commentId) external {
		emit CommentLike(_postId, _commentId, msg.sender);
	}
}
