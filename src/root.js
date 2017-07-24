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
import Directory from './containers/Directory/Directory';
import Article from './containers/Article/Article';

// Simple Routing
Render(states, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="counter" component={Counter} />
     <Route path="callback" component={Callback} />
      <Route path="directory/:directory" component={Directory} />
      <Route path="article/:currentArticlePath" component={Article} />
    </Route>
  </Router>
));
