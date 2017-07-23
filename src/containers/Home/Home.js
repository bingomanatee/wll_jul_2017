import React from 'react'
import {Component, Actions} from 'jumpsuit';
import ArticleList from '../../component/ArticleList/ArticleLiist';

export default Component(
  {
    componentDidMount() {
      if (!this.props.homepageArticlesLoaded) {
        Actions.getHomepageArticles();
      }
    },
    render () {
      console.log('rendering home with props:', this.props);
      const homepageArticles = this.props.homepageArticles || [];
      return <ArticleList title="Top Stories" articles={homepageArticles}/>
    }
  },
  (state) => (
    {
      homepageArticles: state.articleState.homepageArticles,
      homepageArticlesLoaded: state.articleState.homepageArticlesLoaded
    }
  )
)