import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import {URI_ROOT} from '../../config';
import axios from 'axios';
import encodePath from '../../utils/encodePath';

const INITIAL = {article: false, path: false, edited: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

const articleUrl = (article) => {
  const path = encodePath(article.path);
  return `${URI_ROOT}/articles/${path}.json`;
}

const articleEditState = State('articleEditState', {
  initial: INITIAL,

  setArticleEditPath (state, path)  {
    return updateState(state, {path});
  },

  setArticleEditArticle(state, article) {
    article = _.cloneDeep(article);
    return updateState(state, {article});
  }
});

export default articleEditState;

// used to set updated result as opposed to original set
Effect('updateArticleEditArticle', (article) => {
  articleEditState.setArticleEditArticle(article);
});

// needed to get permission
Hook((action, getState) => {
  if (action.type === 'updateArticleEditArticle') {
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
        Actions.getArticles();
        Actions.getHomepageArticles();
       setTimeout(() =>  Actions.goEditCategory(article.directory), 2000);
      }).catch((err) => {
      console.log('error updating articles:', err);
    });
  }
});

Hook((action, getState) => {
  if (action.type === 'articleEditState_setArticleEditPath') {
    axios(articleUrl({path: action.payload}))
      .then((result) => {
      console.log('loaded article edit article: ', result.data);
        Actions.articleEditState.setArticleEditArticle(result.data);
      });
  }
});