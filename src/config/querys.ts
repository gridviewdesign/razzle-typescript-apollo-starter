import gql from 'graphql-tag';

export const GET_POSTS = gql`
  {
    posts {
      id
      title
    }
  }
`;

export const GET_POST = gql`
  query Post($id: Int!) {
    post(id: $id) {
      title
      body
    }
  }
`;
