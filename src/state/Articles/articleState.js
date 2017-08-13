import React from 'react'
import fetch from 'node-fetch';
import {Hook, State, Actions, Effect} from 'jumpsuit'
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';
import makeAuthHeader from './../../utils/makeAuthHeader';
import {URI_ROOT} from './../../config';
import axios from 'axios';
import encodePath from '../../utils/encodePath';
const categoryUrl = (category) => `${URI_ROOT}/categories/${encodePath(category.directory)}`;

const INITIAL_STATE = {
  articles: [],
  directories: [],
  homepageArticles: [],
  chapters: [],
  homepageArticlesLoaded: false,
  articlesLoaded: false,
  currentArticle: null
};

const updateState = (state, update) => {
  return _.extend({}, INITIAL_STATE, state || {}, update || {});
}
export default State('articleState', {
  // Initial State
  initial: INITIAL_STATE,
  // Actions
  setHomepageArticles(state, homepageArticles) {
    return updateState(state, {
      homepageArticles,
      homepageArticlesLoaded: true
    });
  },
  setDirectories(state, directories) {
    return updateState(state, {directories})
  },
  setArticles(state, articles) {
    return updateState(state, {
      articles,
      articlesLoaded: true
    });
  },
  setArticle(state, currentArticle) {
    return updateState(state, {currentArticle});
  },
  setCategorySequence(state, manifest) {
    let newState = updateState(state);

    const sequence = manifest.sequence;
    const category = manifest.category;
    if (!category) {
      return state;
    }

    newState.directories.forEach((currentCategory) => {
      if (currentCategory.directory === category.directory) {
        currentCategory.sequence = sequence;
      }
    });

    return newState;
  }
});

Hook((action, getState) => {
  if (action.type === 'articleState_setCategorySequence') {
    const category = action.payload.category;
    axios({
      method: 'PUT',
      url: categoryUrl(category) + '/res.json',
      headers: {
        'Auth-token': getState().authState.apiToken
      },
      data: category
    })
      .then((data) => {
        Actions.getDirectories();
      }).catch((err) => {
      console.log('error updating sequence:', err);
    });
  }
});

Effect('getHomepageArticles', () => {
  axios.get(`${URI_ROOT}/homepage-articles`)
    .then((response) => {
        Actions.articleState.setHomepageArticles(response.data);
      }
    ).catch((err) => {
    console.log('cannot get homepage articles: ', err);
  })
});

Effect('getArticle', (path) => {
  path = encodePath(path);
  axios({
    url: `${URI_ROOT}/articles/${path}.json`,
    headers: {'Content-Type': ' application/json'}
  })
    .then((article) => {
        Actions.articleState.setArticle(article.data);
      }
    ).catch((err) => {
    console.log('cannot get article: ', path, err);
  })
});

Effect('getArticles', () => {
  fetch(`${URI_ROOT}/articles`)
    .then((res) => res.json())
    .then((articles) => {
        Actions.articleState.setArticles(articles);
      }
    ).catch((err) => {
    console.log('cannot get articles: ', err);
  })
});

Effect('getDirectories', () => {
  fetch(`${URI_ROOT}/categories`)
    .then((res) => res.json())
    .then((dirs) => {
        Actions.articleState.setDirectories(dirs);
      }
    ).catch((err) => {
    console.log('cannot get dirs: ', err);
  })
});
