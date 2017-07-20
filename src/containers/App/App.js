import React from 'react'
import './App.css'
import {Component} from 'jumpsuit';
import Header from '../Header/Header';

export default Component ({
  render() {
    return (
      <div className='App'>
       <Header auth={this.props.auth} />
        {this.props.children}
      </div>
    )
  }
})
