import { gql } from "@apollo/client";

//for viewing a single Fund Run
export const GQL_FUNDRUN_By_FundRunId = () => {
  return gql`
    query ($slug: Int!) {
      fundRuns(where: { fundRunId: $slug }) {
        fundRunId
        owners
        title
        description
        amountCollected
        amountWithdrawn
      }
    }
  `;
};

//for viewing the Fund Runs list on /browse-fund-runs
//returns latest-first
export const GQL_FUNDRUNS_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      fundRuns(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        fundRunId
        owners
        title
        description
        amountCollected
        amountWithdrawn
      }
    }
  `;
};

//for viewing the Fund Run's "Social Media Page" list-of-posts on "/social/{fundRunId}"
//returns latest-first
export const GQL_SOCIAL_POSTS_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $fundRunId: Int!, $userWalletAddress: String) {
      socialPosts(
        where: { fundRunId: $fundRunId }
        orderBy: socialProposalId
        orderDirection: desc
        first: $limit
        skip: $offset
      ) {
        id
        postText
        proposedBy
        fundRunId
        fundRunTitle
        likeCount
        likes(where: { userWhoLiked: $userWalletAddress }) {
          id
        }
      }
    }
  `;
};

//for viewing latest posts
//used on Explore page
export const GQL_EXPLORE_POSTS_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $userWalletAddress: String) {
      socialPosts(orderBy: blockTimestamp, orderDirection: desc, first: $limit, skip: $offset) {
        id
        postText
        proposedBy
        fundRunId
        fundRunTitle
        likeCount
        likes(where: { userWhoLiked: $userWalletAddress }) {
          id
        }
      }
    }
  `;
};

//for viewing latest posts, from who the user is following
//used on Explore page
export const GQL_EXPLORE_POSTS_By_Who_You_Follow = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $user: String) {
      follows(orderBy: blockTimestamp, orderDirection: desc, first: $limit, skip: $offset, where: { user: $user }) {
        id
        fundRun {
          id
          posts {
            id
            postText
            proposedBy
            fundRunId
            fundRunTitle
            likeCount
            likes(where: { userWhoLiked: $user }) {
              id
            }
          }
        }
      }
    }
  `;
};

//for viewing a single Social Media Post
//used in /post/[postId].tsx
export const GQL_SOCIAL_POST_For_Display = () => {
  return gql`
    query ($socialPostId: String!, $userWalletAddress: String) {
      socialPost(id: $socialPostId) {
        id
        postText
        proposedBy
        fundRunId
        fundRunTitle
        likeCount
        likes(where: { userWhoLiked: $userWalletAddress }) {
          id
        }
      }
    }
  `;
};

//for viewing a Post's Comments
//used in /post/[postId].tsx -- Comments.tsx
export const GQL_SOCIAL_POST_COMMENTS_For_Display = () => {
  return gql`
    query ($socialPostId: String!, $userWalletAddress: String) {
      comments(
        orderBy: numericalId
        orderDirection: desc
        where: { parentCommentId: "0x", socialPost_: { id: $socialPostId } }
      ) {
        id
        commentText
        commenter
        likeCount
        likes(where: { userWhoLiked: $userWalletAddress }) {
          id
        }
        subcomments(orderBy: numericalId, orderDirection: desc) {
          id
          parentCommentId
          commentText
          commenter
          likeCount
          likes(where: { userWhoLiked: $userWalletAddress }) {
            id
          }
        }
      }
    }
  `;
};

//for viewing a Post's Sub-Sub-Comments
//used in /post/[postId].tsx -- SubSubComments.tsx
export const GQL_SOCIAL_SUB_COMMENTS_For_Display = () => {
  return gql`
    query ($parentCommentId: String!, $userWalletAddress: String) {
      comments(orderBy: numericalId, orderDirection: desc, where: { parentCommentId: $parentCommentId }) {
        id
        parentCommentId
        commentText
        commenter
        likeCount
        likes(where: { userWhoLiked: $userWalletAddress }) {
          id
        }
        subcomments(orderBy: numericalId, orderDirection: desc) {
          id
          parentCommentId
          commentText
          commenter
          likeCount
          likes(where: { userWhoLiked: $userWalletAddress }) {
            id
          }
        }
      }
    }
  `;
};

//queries page
//for viewing 3-tier table
//ALL Fund Runs
export const GQL_FUNDRUNS_Three_Tier = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      fundRuns(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        fundRunId
        owners
        title
        description
        amountCollected
        amountWithdrawn
        proposals {
          id
          proposalId
          fundRunId
          proposedBy
          amount
          to
          reason
          status
          signatures {
            id
            signer
            signature
          }
        }
      }
    }
  `;
};

//for Finalization of a Proposal
//returns all signatures for a Proposal (which are then sent to the contract)
export const GQL_SIGNATURES = () => {
  return gql`
    query ($slug1: Int!, $slug2: Int!) {
      proposals(where: { fundRunId: $slug1, proposalId: $slug2 }) {
        signatures {
          signature
        }
      }
    }
  `;
};

//for Finalization of a Social Media Post
//returns all signatures for a proposed Post (which are then sent to the contract)
export const GQL_SOCIAL_SIGNATURES = () => {
  return gql`
    query ($slug1: Int!, $slug2: Int!) {
      socialProposals(where: { fundRunId: $slug1, socialProposalId: $slug2 }) {
        signatures {
          signature
        }
      }
    }
  `;
};

//for the table on Vaults page
//will not return revoked proposals
export const GQL_PROPOSALS_By_FundRunId = () => {
  return gql`
    query ($slug: Int!) {
      proposals(where: { fundRunId: $slug, status_lt: 3 }) {
        id
        proposalId
        fundRunId
        proposedBy
        amount
        to
        reason
        status
        signatures {
          id
          signer
          signature
        }
      }
    }
  `;
};

//queries page
//for viewing snapshot of latest proposals
//LATEST PROPOSALS
export const GQL_PROPOSALS_Snapshot = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        proposals(orderBy: proposalId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          proposedBy
          amount
          to
          reason
          status
          fundRun {
            id
            title
            amountCollected
            amountWithdrawn
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        proposals(
          where: { or: [{ proposedBy_contains: $searchBy }, { to_contains: $searchBy }] }
          orderBy: proposalId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          proposedBy
          amount
          to
          reason
          status
          fundRun {
            id
            title
            amountCollected
            amountWithdrawn
          }
        }
      }
    `;
};

//queries page
//for viewing snapshot of latest signers
//LATEST SIGNERS
export const GQL_SIGNERS_Snapshot = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        proposalSignatures(orderBy: proposalId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          proposalId
          signer
          proposal {
            id
            amount
            to
            reason
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        proposalSignatures(
          where: { or: [{ signer_contains: $searchBy }, { proposal_: { to_contains: $searchBy } }] }
          orderBy: proposalId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          proposalId
          signer
          proposal {
            id
            amount
            to
            reason
          }
        }
      }
    `;
};

//queries page
//DONATIONS ORDERED-BY FUND RUN
export const GQL_DONATIONS = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        donations(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          donor
          amount
          fundRun {
            id
            title
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        donations(
          where: { fundRun_: { title_contains_nocase: $searchBy } }
          orderBy: fundRunId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          donor
          amount
          fundRun {
            id
            title
          }
        }
      }
    `;
};

//for the SOCIAL Proposals Table
//will not return revoked proposals
export const GQL_SOCIAL_PROPOSALS_By_FundRunId = () => {
  return gql`
    query ($slug: Int!) {
      socialProposals(where: { fundRunId: $slug, status_lt: 3 }) {
        id
        socialProposalId
        fundRunId
        proposedBy
        postText
        status
        signatures {
          id
          signer
          signature
        }
      }
    }
  `;
};

//for seeing if a user is following a Fund Run
//used in FollowToggle.tsx to see IF a user is following a Fund Run
export const GQL_SOCIAL_FOLLOWERS_By_FundRunId_and_Address = () => {
  return gql`
    query ($fundRunId: Int!, $user: String!) {
      fundRuns(where: { fundRunId: $fundRunId }) {
        followers(where: { user: $user }) {
          id
          fundRunId
          user
        }
      }
    }
  `;
};

//for getting all of the Fund Runs that a user is following
//used in WhoAmIFollowing.tsx
export const GQL_SOCIAL_FOLLOWING_By_Address = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $user: String!) {
      follows(
        orderBy: fundRunId
        orderDirection: desc
        first: $limit
        skip: $offset
        where: { user: $user, fundRun_not: null }
      ) {
        id
        fundRun {
          id
          fundRunId
          title
          description
          amountCollected
          amountWithdrawn
        }
      }
    }
  `;
};

//for getting all of the followers for a particular Fund Run
//used in WhoFollowsThisFundRun.tsx
export const GQL_SOCIAL_FOLLOWERS_By_FundRunId = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $fundRunId: Int!) {
      follows(first: $limit, skip: $offset, where: { fundRunId: $fundRunId, fundRun_not: null }) {
        id
        user
      }
    }
  `;
};
