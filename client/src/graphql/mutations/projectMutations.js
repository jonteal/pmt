import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
    $startDate: String
    $deadline: String
  ) {
    addProject(
      title: $title
      description: $description
      status: $status 
      clientId: $clientId 
      startDate: $startDate
      deadline: $deadline
    ) {
      id
      title
      description 
      status 
      client {
        id 
        firstName
        lastName 
      }
      startDate
      deadline
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject ($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $title: String
    $description: String
    $status: ProjectStatusUpdate
    $startDate: String
    $deadline: String
  ) {
    updateProject(
      id: $id 
      title: $title 
      description: $description 
      status: $status 
      startDate: $startDate
      deadline: $deadline
    ) {
      id 
      title 
      description 
      status 
      client {
        id 
        firstName
        lastName 
      }
      startDate
      deadline
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };