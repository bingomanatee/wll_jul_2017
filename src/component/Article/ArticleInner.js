import React from 'react';
import marked from 'marked';
import './articleInner.css';
import pathToDirectory from '../../utils/pathToDirectory';
import articleDate from './../../utils/articleDate';

const ArticleInner = (props) => (
  <article>
    <div className="ArticleTitle">
      <div className="ArticleTitle__row ArticleTitle__row-top">
        <div className="ArticleTitle__rowCell ArticleTitle__rowCell-head ArticleTitle__rowCell-directory">
          {pathToDirectory(props.article.directory)}
        </div>
        <div className="ArticleTitle__rowCell">
          <h1 className="pageHeader">{props.article.title}</h1>
        </div>
      </div>
      <div className="ArticleTitle__row">
        <div className="ArticleTitle__rowCell ArticleTitle__rowCell-head ArticleTitle__rowCell-date">{articleDate(props.article) }
        </div>
        <div className="ArticleTitle__rowCell ArticleTitle__rowCell-description">
          {props.article.description}
        </div>
      </div>
    </div>
    <div dangerouslySetInnerHTML={{__html: marked(props.article.content)}}/>
  </article>
)

export default ArticleInner;