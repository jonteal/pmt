import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($firstName: String!, $lastName: String!, $phoneNumber: String, $emailAddress: String) {
    addClient(firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, emailAddress: $emailAddress) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $firstName: String!, $lastName: String!, $phoneNumber: String, $emailAddress: String) {
    updateClient(id: $id, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, emailAddress: $emailAddress) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
