import { gql } from "@apollo/client";

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

export const GQL_PROPOSALS = () => {
  return gql`
    query ($slug: Int!) {
      proposals(where: { fundRunId: $slug }) {
        proposalId
        fundRunId
        proposedBy
        amount
        to
        reason
      }
    }
  `;
};
