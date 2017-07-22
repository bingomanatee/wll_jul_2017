import React from 'react';
import './ArticleList.css';

const pathToArticle = (path) => {
  return path.split('/').reduce((memo, item) => {
    if (item === 'articles') return '';
    if (!item || /\.md/.test(item)) {
      return memo;
    }
  return item.substr(0, 2);
  }, '');
}
export default class ArticleList extends React.Component {
  render () {
    return <div className="ArticleList">
      {this.props.articles.map((article) => (
        <div className="ArticleList__row">
          <div className="ArticleList__rowCell ArticleList__rowCell-path dark">
            {pathToArticle(article.path)}
          </div>
          <div className="ArticleList__rowCell articleList__rowCell-content">
            {article.title}
          </div>
        </div>
      ))
      }
    </div>
  }
}