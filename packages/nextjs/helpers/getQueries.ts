import { gql } from "@apollo/client";

//for viewing a single Fund Run
export const GQL_FUNDRUN_BY_ID = () => {
  return gql`
    query ($slug: Int!) {
      fundRuns(where: { fundRunId: $slug }) {
        fundRunId
        owners
        title
        description
        deadline
        target
        amountCollected
        amountWithdrawn
        status
      }
    }
  `;
};

//for viewing the Fund Runs list
//returns latest-first, 25 at a time
export const GQL_FUNDRUNS = () => {
  return gql`
    query ($slug: Int!) {
      fundRuns(orderBy: fundRunId, orderDirection: desc, first: 25, skip: $slug) {
        fundRunId
        owners
        title
        description
        deadline
        target
        amountCollected
        amountWithdrawn
        status
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

//for the table on Vaults page
//will not return revoked proposals
export const GQL_PROPOSALS = () => {
  return gql`
    query ($slug: Int!) {
      proposals(where: { fundRunId: $slug, status_lt: 3 }) {
        proposalId
        fundRunId
        proposedBy
        amount
        to
        reason
        status
      }
    }
  `;
};
