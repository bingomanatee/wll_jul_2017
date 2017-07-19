import React from 'react'
import { Render, Router, Route, IndexRoute } from 'jumpsuit'
// Styles
import './index.css'
// State
import states from './state'
// Containers
import App from './containers/App/App'
// Screens
import Home from './screens/Home'
import Counter from './screens/Counter'
import Callback from './screens/Callback/Callback'
import Auth from './Auth/Auth';

const auth = new Auth();

// Simple Routing
Render(states, (
  <Router>
    <Route path='/' component={(props)=><App auth={auth} {...props}></App>}>
      <IndexRoute auth={auth} component={Home} />
      <Route path="counter" component={Counter} />
     <Route path="callback" component={(props) => {
       return <Callback auth={auth} {...props} />;
     }} />
    </Route>
  </Router>
))
