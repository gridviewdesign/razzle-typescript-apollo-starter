import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import React from 'react';
import useRouter from 'use-react-router';
import Container from '../components/atoms/Container';

const GET_POST = gql`
  query Post($id: Int!) {
    post(id: $id) {
      title
      body
    }
  }
`;

const Post: React.FC = () => {
  const { match } = useRouter();
  const id = parseInt(match.params.id, 10);
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  if (loading) {
    return <Container>Loading...</Container>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <h1>{data.post.title}</h1>
      <p>{data.post.body}</p>
    </Container>
  );
};

export default Post;
