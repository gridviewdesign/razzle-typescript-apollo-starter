import { useQuery } from 'react-apollo-hooks';
import React from 'react';
import { Link } from 'react-router-dom';

import { GET_POSTS } from '../config/querys';

interface Post {
  id: number;
  title: string;
}

const Posts: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const postsData = data.posts.slice(9, 19);

  return (
    <ul>
      {postsData.map((post: Post) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
