import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import './App.css';

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/:post_id" component={Post} />
  </Switch>
);

export default App;
