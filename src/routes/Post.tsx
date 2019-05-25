import { useQuery } from 'react-apollo-hooks';
import React from 'react';
import useRouter from 'use-react-router';
import Container from '../components/atoms/Container';
import { Helmet } from 'react-helmet';

import { GET_POST } from '../config/querys';

const Post: React.FC = () => {
  const { match } = useRouter<{ id: string }>();
  const { id } = match.params;
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  if (loading) {
    return <Container>Loading...</Container>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{data.post.title}</title>
      </Helmet>
      <Container>
        <h1>{data.post.title}</h1>
        <p>{data.post.body}</p>
      </Container>
    </>
  );
};

export default Post;
