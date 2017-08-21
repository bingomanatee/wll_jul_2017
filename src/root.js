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
import Admin from './containers/Admin/Admin';
import Categories from './containers/Categories/Categories';
import CategoryEdit from './containers/CategoryEdit/CategoryEdit';
import ArticleEdit from './containers/ArticleEdit/ArticleEdit';
import ArticleNew from './containers/ArticleNew/ArticleNew';

// Simple Routing
Render(states, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="counter" component={Counter} />
     <Route path="callback" component={Callback} />
      <Route path="directory/:directory" component={Directory} />
      <Route path="article/:currentArticlePath" component={Article} />
      <Route path="admin" component={Admin} />
      <Route path="admin/categories" component={Categories} />
      <Route path="admin/categories/:directory/edit" component={CategoryEdit} />
      <Route path="admin/articles/:directory/new" component={ArticleNew} />
      <Route path="admin/articles/:path/edit" component={ArticleEdit} />
    </Route>
  </Router>
));
