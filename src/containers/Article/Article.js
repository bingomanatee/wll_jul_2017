import React from 'react'
import {Component, Actions} from 'jumpsuit';
import Article from '../../component/Article/Article';

export default Component(
  {
    componentDidMount() {
      if (!this.props.path) {
        let currentArticlePath = this.props.params.currentArticlePath;
        Actions.navState.setCurrentArticlePath(currentArticlePath);
        Actions.getArticle(currentArticlePath);
      }
      if (!(this.props.directories && this.props.directories.length)) {
        Actions.getDirectories();
      }
    },
    render () {
      return <Article article={this.props.article} directories={this.props.directories} directory={this.props.directory} />
    },

    componentDidUpdate() {
      console.log('updated with props ', this.props);
    }
  },
  (state) => {
    return ({
      directory: state.navState.currentDir,
      location: state.routing.locationBeforeTransitions.pathname,
      article: state.articleState.currentArticle,
      directories: state.articleState.directories,
      currentArticlePath: state.navState.currentArticlePath
    });
  }
)
