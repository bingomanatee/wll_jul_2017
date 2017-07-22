import React from 'react'
import {Component} from 'jumpsuit';
import Header from '../../component/Header/Header';

export default Component(
  {
    render () {
      return <Header className="dark" auth={this.props.auth}/>;
    }
  }
)