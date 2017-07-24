import React from 'react';
import pathToInitial from './../../utils/pathToInitial';
import {Actions, Goto} from 'jumpsuit';
import marked from 'marked';
import './Article.css';

export default  (props) => {
  return (<div className="Article">
    <div className="Article__frame">
      {props.article && (
        <article><h1 className="pageHeader">{props.article.title}</h1>
          <div dangerouslySetInnerHTML={{__html: marked(props.article.content)}}/>
        </article>
      )}
      {(!props.article) &&
      <article><h1>Loading ...</h1></article>
      }
    </div>
  </div>)
}