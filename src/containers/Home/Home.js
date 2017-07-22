import React from 'react'
import {Component, Actions} from 'jumpsuit';
import ArticleList from '../../component/ArticleList/ArticleLiist';

export default Component(
  {
    componentDidMount() {
      Actions.getHomepageArticles();
    },
    render () {
      console.log('rendering home with props:', this.props);
      const articles = this.props.articles || [];
      return <div>
        <h2 className="PageHead">Articles</h2>
        <ArticleList articles={articles} />
      </div>
    }
  },
  (state) => (
    {
      articles: state.articleState.homepageArticles
    }
  )
)