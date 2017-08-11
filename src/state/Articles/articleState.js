import React from 'react'
import fetch from 'node-fetch';
import {Hook, State, Actions, Effect} from 'jumpsuit'
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';

import {URI_ROOT} from './../../config';

export default State({
  // Initial State
  initial: {
    articles: [],
    directories: [],
    homepageArticles: [],
    chapters: [],
    homepageArticlesLoaded: false,
    articlesLoaded: false,
    currentArticle: null
  },
  // Actions
  setHomepageArticles(state, homepageArticles) {
    let newState = _.cloneDeep(state);
    newState.homepageArticles = homepageArticles;
    newState.homepageArticlesLoaded = true;
    return newState;
  },
  setDirectories(state, directories) {
    let newState = _.cloneDeep(state);
    newState.directories = directories;
    return newState;
  },
  setArticles(state, articles) {
    let newState = _.cloneDeep(state);
    newState.articles = articles;
    newState.articlesLoaded = true;
    return newState;
  },
  setArticle(state, article) {
    let newState = _.cloneDeep(state);
    newState.currentArticle =  article;
    newState.articlesLoaded = true;
    return newState;
  }
});

Effect('getHomepageArticles', () => {
  fetch(`${URI_ROOT}/homepage-articles`)
    .then((res) => res.json())
    .then((articles) => {
        Actions.setHomepageArticles(articles);
      }
    ).catch((err) => {
    console.log('cannot get homepage articles: ', err);
  })
});

Effect('getArticle', (path) => {
  fetch(`${URI_ROOT}/article/articles/${cleanDirectory(path)}`)
    .then((res) => res.json())
    .then((article) => {
        Actions.setArticle(article);
      }
    ).catch((err) => {
    console.log('cannot get article: ', path, err);
  })
});

Effect('getArticles', () => {
  fetch(`${URI_ROOT}/article`)
    .then((res) => res.json())
    .then((articles) => {
        Actions.setArticles(articles);
      }
    ).catch((err) => {
    console.log('cannot get articles: ', err);
  })
});

Effect('getDirectories', () => {
  fetch(`${URI_ROOT}/categories`)
    .then((res) => res.json())
    .then((dirs) => {
        Actions.setDirectories(dirs);
      }
    ).catch((err) => {
    console.log('cannot get dirs: ', err);
  })
});

/*
Hook((action) => {
  if (action.type === 'setArticles') {
    const directories = _(action.payload)
      .map('directory')
      .map(cleanDirectory)
      .uniq()
      .sortBy()
      .value();
    Actions.setDirectories(directories);
  }
}); */