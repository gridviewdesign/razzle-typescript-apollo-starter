import React from 'react';
import './Home.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_POSTS = gql`
  {
    posts {
      id
      title
    }
  }
`;

interface Data {
  posts: Array<{ id: string; title: string }>;
}

const Posts = () => (
  <Query<Data> query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading..</div>;
      }
      if (error) {
        return <div>{error}</div>;
      }
      return (
        <div>
          {data.posts.map(post => (
            <h3 key={post.id}>{post.title}</h3>
          ))}
        </div>
      );
    }}
  </Query>
);

const Home = () => (
  <React.Fragment>
    <h1>Welcome to Razzle.</h1>
    <Posts />
  </React.Fragment>
);

export default Home;
