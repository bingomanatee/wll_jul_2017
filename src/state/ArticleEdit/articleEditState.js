import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import {URI_ROOT} from '../../config';
import axios from 'axios';
import encodePath from '../../utils/encodePath';
import Article from '../../models/Article';

const INITIAL = {article: false, path: false, edited: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

const articleUrl = (article) => {
  const path = encodePath(article.path);
  return `${URI_ROOT}/articles/${path}.json`;
}

const articleEditState = State('articleEditState', {
  initial: INITIAL,

  setPath (state, path)  {
    return updateState(state, {path});
  },

  setArticle(state, article) {
    article = _.cloneDeep(article);
    return updateState(state, {article});
  }
});

export default articleEditState;

// used to set updated result as opposed to original set
Effect('updateArticleEditArticle', (article) => {
  articleEditState.setArticle(article);
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
        Actions.getHomepageArticles();
        Actions.goEditCategory(article.directory);
      }).catch((err) => {
      console.log('error updating articles:', err);
    });
  }
});

Hook((action, getState) => {
  if (action.type === 'articleEditState_setPath') {
    if (action.payload) {
      Article.load(action.payload)
        .then((article) => {
          Actions.articleEditState.setArticle(article);
          Goto({path: '/admin/articles/' + encodePath(action.payload) + '/edit'});
        });
    } else {
      console.log('no path for editstate');
    }
  }
});
