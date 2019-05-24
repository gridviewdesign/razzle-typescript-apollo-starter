import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import useRouter from 'use-react-router';

const GET_POST = gql`
  query Post($id: Int!) {
    post(id: $id) {
      title
      body
      user {
        name
      }
    }
  }
`;

interface RouteInfo {
  id: string;
}

const Post = () => {
  const { match } = useRouter();
  const { post_id } = match.params || { post_id: '' };

  return (
    <div>
      <Query<{ loading: boolean; error: boolean; data: {} }>
        query={GET_POST}
        variables={{ id: post_id }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error! {error.message}</div>;
          }

          return (
            <>
              <h1>{data.post.title}</h1>
              <span>By: {data.post.user.name}</span>
              <p>{data.post.body}</p>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default Post;
