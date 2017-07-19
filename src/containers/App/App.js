import React from 'react'
import User from './../User';
import logo from './logo.svg'
import './App.css'
import {Component} from 'jumpsuit';

export default Component ({
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React + Jumpsuit!</h2>
          <User auth={this.props.auth} />
        </div>
        {this.props.children}
      </div>
    )
  }
})
