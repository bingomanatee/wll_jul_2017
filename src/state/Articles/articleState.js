import React from 'react'
import fetch from 'node-fetch';
import {Hook, State, Actions, Effect} from 'jumpsuit'
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';

const URI_ROOT = 'http://wonderlandlabs.com/api';

// const URI_ROOT = 'http://localhost:3000/api';

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
        console.log('homepage articles:', articles);
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
        console.log('article:', article);
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
        console.log('articles:', articles);
        Actions.setArticles(articles);
      }
    ).catch((err) => {
    console.log('cannot get articles: ', err);
  })
});

Hook((action) => {
  if (action.type === 'setArticles') {
    console.log('setting directories');
    const directories = _(action.payload)
      .map('directory')
      .map(cleanDirectory)
      .uniq()
      .sortBy()
      .value();
    Actions.setDirectories(directories);
  }
});