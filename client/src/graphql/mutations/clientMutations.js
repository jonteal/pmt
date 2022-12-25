import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($firstName: String!, $lastName: String!) {
    addClient(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $firstName: String!, $lastName: String!) {
    updateClient(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
