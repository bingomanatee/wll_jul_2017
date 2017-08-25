import React from 'react';
import './Article.css';
import ArticleInner from './ArticleInner';

export default  (props) => {
  return (<div className="Article">
    <div className="Article__frame">
      {props.article && (
        <ArticleInner article={props.article} />
      )}
      {(!props.article) &&
      <article><h1>Loading ...</h1></article>
      }
    </div>
  </div>)
}