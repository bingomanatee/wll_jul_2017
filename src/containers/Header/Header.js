import React from 'react'
import {Component, Actions} from 'jumpsuit';
import Header from '../../component/Header/Header';

export default Component(
  {
    componentDidMount() {
      if (!this.props.articlesLoaded) {
        Actions.getArticles();
      }
    },
    render () {
      return <Header className="dark" authlevel={this.props.authLevel} location={this.props.location} currentDir={this.props.currentDir}
                     showNav={this.props.showNav} directories={this.props.directories} auth={this.props.auth}/>;
    }
  },
  (state) => ({
    directories: state.articleState.directories,
    articlesLoaded: state.articleState.articlesLoaded,
    location: state.routing.locationBeforeTransitions.pathname,
    currentDir: state.navState.currentDir,
    showNav: state.navState.showNav,
    authLevel: state.authState.authLevel
  })
)
