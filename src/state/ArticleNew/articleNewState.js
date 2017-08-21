import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import {URI_ROOT} from '../../config';
import axios from 'axios';
import encodePath from '../../utils/encodePath';
import Article from '../../models/Article';

const INITIAL = {article: {}, path: false, saved: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

const articleUrl = (article) => {
  const path = encodePath(article.path);
  return `${URI_ROOT}/articles/${path}.json`;
}

const articleNewState = State('articleNewState', {
  initial: INITIAL,

  setDirectory (state, directory)  {
    return updateState(state, {directory});
  },

  setArticle(state, article) {
    article = _.cloneDeep(article);
    return updateState(state, {article});
  }
});

export default articleNewState;

// used to set updated result as opposed to original set
Effect('updateArticleNewArticle', (article) => {
  articleNewState.setArticle(article);
});

// needed to get permission
Hook((action, getState) => {
  if (action.type === 'articleNewState_setDirectory') {
    const article = getState().articleNewState.article;
    article.directory = action.payload;
    articleNewState.setArticle(article);
  }

  if (action.type === 'updateArticleNewArticle') {
    const article = action.payload;
    const apiToken = getState().authState.apiToken;
    Article.create(article, apiToken)
      .then(() => {
        Actions.goEditCategory(article.directory);
      })
  }
});