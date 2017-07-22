import React from 'react'
import { Render, Router, Route, IndexRoute } from 'jumpsuit'
// Styles
import './style/index.scss';
// State
import states from './state'
// Containers
import App from './containers/App/App'
// Screens
import Home from './containers/Home/Home';
import Counter from './screens/Counter';
import Callback from './screens/Callback/Callback';

// Simple Routing
Render(states, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="counter" component={Counter} />
     <Route path="callback" component={Callback} />
    </Route>
  </Router>
));
