import React from 'react';
import Posts from '../components/Posts';
import Container from '../components/atoms/Container';
import { Helmet } from 'react-helmet';

const Home = () => (
  <>
    <Helmet>
      <title>Welcome to Razzle.</title>
    </Helmet>
    <Container>
      <h1>Welcome to Razzle.</h1>
      <Posts />
    </Container>
  </>
);

export default Home;
