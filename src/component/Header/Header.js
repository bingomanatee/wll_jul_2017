import './Header.css';
import React from 'react';

import User from '../User/User';
export default () => (<div className="Header dark">
  <div className="Header__title">
    <h1>Wonderland Labs.com</h1>
  </div>
  <div className="Header__user">
    <User />
  </div>
</div>);