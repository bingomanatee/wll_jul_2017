import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import {URI_ROOT} from '../../config';
import axios from 'axios';
import encodePath from '../../utils/encodePath';

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
    axios({
      method: 'PUT',
      url: articleUrl(article),
      headers: {
        'Auth-token': getState().authState.apiToken
      },
      data: article
    })
      .then(() => {
        Actions.getHomepageArticles();
        Actions.goEditCategory(article.directory);
      }).catch((err) => {
      console.log('error updating articles:', err);
    });
  }
});

Hook((action, getState) => {
  if (action.type === 'articleEditState_setPath') {
    axios(articleUrl({path: action.payload}))
      .then((result) => {
        console.log('loaded article edit article: ', result.data);
        Actions.articleEditState.setArticle(result.data);
      });
  }
});