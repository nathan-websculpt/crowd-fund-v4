import { gql } from "@apollo/client";

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
