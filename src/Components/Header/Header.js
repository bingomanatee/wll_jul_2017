
import './Header.css';
import React from 'react';

import User from '../User';
export default (props) => {
 return <div className='Header'>
    <h1>Wonderland Labs.com</h1>
    <User auth={props.auth} />
  </div>;
}