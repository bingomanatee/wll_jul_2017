import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import ArticleList from '../../component/ArticleList/ArticleList';

const articleListTitle = (directory, location) => {
  if (location === '/') {
    return 'Top Articles';
  }
  return _((directory)
    .split('_'))
    .map(_.capitalize)
    .join(' ');
}

export default Component(
  {
    componentDidMount() {
      if (this.props.params && this.props.params.hasOwnProperty('directory')) {
        Actions.navState.setCurrentDir(this.props.params.directory);
      }
    },
    render () {
      const directory = this.props.directory || '';
      // todo: replace with axios to get articles from directory
      const articles = _.filter(this.props.articles, (article) => article.published && (directory === article.directory));

      return <ArticleList articles={articles} directory={directory} title={articleListTitle(directory, this.props.location)}/>
    }
  },
  (state) => ({
    directory: state.navState.currentDir,
    location: state.routing.locationBeforeTransitions.pathname,
    articles: state.articleState.articles
  })
)
