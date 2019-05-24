import React from 'react';
import Posts from '../components/Posts';
import Container from '../components/atoms/Container';

const Home = () => (
  <Container>
    <h1>Welcome to Razzle.</h1>
    <Posts />
  </Container>
);

export default Home;
