import { gql } from '@apollo/client';

const ADD_TICKET = gql`
  mutation AddTicket(
    $title: String!
    $description: String!
    $status: TicketStatus!
    $kanbanId: ID!
  ) {
    addTicket(
      title: $title 
      description: $description 
      status: $status 
      kanbanId: $kanbanId  
    ) {
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

const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id 
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket(
    $id: ID!
    $title: String!
    $description: String!
    $status: TicketStatusUpdate!
  ) {
    updateTicket(
      id: $id 
      title: $title 
      description: $description 
      status: $status 
    ) {
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

export { ADD_TICKET, DELETE_TICKET, UPDATE_TICKET};