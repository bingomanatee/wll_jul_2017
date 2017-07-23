import React from 'react'
import {Component} from 'jumpsuit';
import Header from '../../component/Header/Header';

export default Component(
  {
    render () {
      return <Header className="dark" showNav={this.props.showNav} directories={this.props.directories} auth={this.props.auth}/>;
    }
  },
  (state) => ({directories: state.articleState.directories, showNav: state.navState.showNav})
)