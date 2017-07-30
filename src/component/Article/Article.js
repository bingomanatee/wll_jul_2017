import React from 'react';
import pathToInitial from './../../utils/pathToInitial';
import {Actions, Goto} from 'jumpsuit';
import marked from 'marked';
import './Article.css';
import pathToDirectory from '../../utils/pathToDirectory';
import articleDate from './../../utils/articleDate';

export default  (props) => {
  return (<div className="Article">
    <div className="Article__frame">
      {props.article && (
        <article>
          <div className="ArticleTitle">
            <div className="ArticleTitle__row ArticleTitle__row-top">
              <div className="ArticleTitle__rowCell ArticleTitle__rowCell-head">
                {pathToDirectory(props.article.directory)}
              </div>
              <div className="ArticleTitle__rowCell">
                <h1 className="pageHeader">{props.article.title}</h1>
              </div>
            </div>
            <div className="ArticleTitle__row">
              <div className="ArticleTitle__rowCell ArticleTitle__rowCell-head">{articleDate(props.article) }
              </div>
              <div className="ArticleTitle__rowCell ArticleTitle__rowCell-description">
                {props.article.description}
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: marked(props.article.content)}}/>
        </article>
      )}
      {(!props.article) &&
      <article><h1>Loading ...</h1></article>
      }
    </div>
  </div>)
}