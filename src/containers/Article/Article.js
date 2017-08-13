import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import cleanDirectory from '../../utils/cleanDirectory';
import Article from '../../component/Article/Article';

export default Component(
  {
    componentDidMount() {
      if (!this.props.path) {
        let currentArticlePath = decodeURIComponent(this.props.location.replace(/^\/article\//, ''));
        Actions.navState.setCurrentArticlePath(currentArticlePath);
        Actions.getArticle(currentArticlePath);
      }
    },
    render () {
      return <Article article={this.props.article} directory={this.props.directory} />
    }
  },
  (state) => ({
    directory: state.navState.currentDir,
    location: state.routing.locationBeforeTransitions.pathname,
    article: state.articleState.currentArticle,
    currentArticlePath: state.navState.currentArticlePath
  })
)