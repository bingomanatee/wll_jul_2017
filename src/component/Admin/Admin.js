import React from 'react';
import './Admin.css';
import {Actions} from 'jumpsuit';

export default  (props) => {
  return (<div className="Admin">
    <div className="Admin__frame">
     <h1 className="pageHeader">Administration</h1>
      <ul>
        <li><a onClick={() => Actions.goCategories()}>Categories</a></li>
      </ul>
    </div>
  </div>)
}