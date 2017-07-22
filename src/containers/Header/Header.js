import React from 'react'
import {Component} from 'jumpsuit';
import Header from './../../Components/Header/Header';

export default Component(
  {
    render () {
      return <Header className="dark" auth={this.props.auth}/>;
    }
  }
)