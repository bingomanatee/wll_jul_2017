import React from 'react'
import {Component, Actions} from 'jumpsuit';

export default Component(
  {
    componentDidMount() {
      Actions.getHomepageArticles();
    },
    render () {
      console.log('rendering home with props:', this.props);
      const articles = this.props.articles || [];
      return <div>
        <h2>Articles</h2>
        {
          articles.map((article, i) => <div key={`article${i}`}>{article.title}</div>)
        }
      </div>
    }
  },
  (state) => (
    {
      articles: state.articleState.homepageArticles
    }
  )
)