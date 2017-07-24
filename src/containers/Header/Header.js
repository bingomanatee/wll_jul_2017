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
      console.log('header dirs: ', this.props.directories);
      return <Header className="dark" location={this.props.location} currentDir={this.props.currentDir}
                     showNav={this.props.showNav} directories={this.props.directories} auth={this.props.auth}/>;
    }
  },
  (state) => {
    console.log('state: ', state);
    return {
      directories: state.articleState.directories,
      articlesLoaded: state.articleState.articlesLoaded,
      location: state.routing.locationBeforeTransitions.pathname,
      currentDir: state.navState.currentDir,
      showNav: state.navState.showNav
    }
  }
)
