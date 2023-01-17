import { gql } from "@apollo/client";

const GET_KANBANS = gql`
  query getKanbans {
    kanbans {
      id
      title
      description
      project {
        id
        title
      }
      createdAt
    }
  }
`;

const GET_KANBAN = gql`
  query getKanban($id: ID) {
    kanban(id: $id) {
      id
      title
      description
      project {
        id
        title
      }
      createdAt
    }
  }
`;

export { GET_KANBANS, GET_KANBAN };