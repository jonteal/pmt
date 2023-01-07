import { gql } from "@apollo/client";

const ADD_ACTIVITY_COMMENT = gql`
  mutation AddActivityComment(
    $commentText: String!
    $createdAt: String!
    $projectId: ID!
  ) {
    addActivityComment(
      commentText: $commentText
      status: $status
      clientId: $clientId
    ) {
      id
      commentText
      createdAt
      projectId {
        id
      }
    }
  }
`;

const DELETE_ACTIVITY_COMMENT = gql`
  mutation DeleteActivityComment($id: ID!) {
    deleteActivityComment(id: $id) {
      id
    }
  }
`;

const UPDATE_ACTIVITY_COMMENT = gql`
  mutation UpdateActivityComment(
    $commentText: String!
    $createdAt: String!
    $projectId: ID!
  ) {
    updateActivityComment(
      commentText: $commentText
      status: $status
      clientId: $clientId
    ) {
      id
      commentText
      createdAt
      projectId {
        id
      }
    }
  }
`;

export {
  ADD_ACTIVITY_COMMENT,
  UPDATE_ACTIVITY_COMMENT,
  DELETE_ACTIVITY_COMMENT,
};
