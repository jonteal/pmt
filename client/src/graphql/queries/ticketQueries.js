import { gql } from '@apollo/client';

const GET_TICKETS = gql`
  query getTickets {
    tickets {
      id
      title
      description
      status 
      kanban {
        id
        title
      }
      createdAt
    }
  }
`;

const GET_TICKET = gql`
  query getTicket($id: ID) {
    ticket(id: $id) {
      id
      title 
      description 
      status 
      kanban {
        id 
        title
      }
      createdAt
    }
  }
`;

export { GET_TICKETS, GET_TICKET };
