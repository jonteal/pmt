import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id,
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

const GET_CLIENT = gql`
  query getClient($id: ID) {
    client(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };