import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import useReactRouter from 'use-react-router';
import Home from './routes/Home';
import Post from './routes/Post';
import styled from 'styled-components';

const RouteContainer = styled(animated.div)`
  position: absolute;
  width: 100%;
`;

const App = () => {
  const { location } = useReactRouter();

  const transition = useTransition(location, (paths) => paths.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transition.map(({ item, props, key }) => (
        <RouteContainer key={key} style={props}>
          <Switch location={item}>
            <Route exact={true} path="/" component={Home} />
            <Route path="/:id" component={Post} />
          </Switch>
        </RouteContainer>
      ))}
    </>
  );
};

export default App;
