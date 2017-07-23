import React from 'react'
import fetch from 'node-fetch';
import {Hook, State, Actions, Effect} from 'jumpsuit'
import _ from 'lodash';
const URI_ROOT = 'http://wonderlandlabs.com';

const cloneState = (state) => ({
  articles: state.articles.slice(),
  articlesLoaded: state.articlesLoaded,
  homepageArticles: state.homepageArticles.slice(),
  homepageArticlesLoaded: state.homepageArticlesLoaded,
  directories: state.directories.slice()
});

export default State({
  // Initial State
  initial: {articles: [], directories: [], homepageArticles: [], chapters: [], homepageArticlesLoaded: false, articlesLoaded: false},
  // Actions
  setHomepageArticles(state, homepageArticles) {
    let newState = cloneState(state);
    newState.homepageArticles = homepageArticles;
    newState.homepageArticlesLoaded = true;
    return newState;
  },
  setDirectories(state, directories) {
    let newState = cloneState(state);
    newState.directories = directories;
    return newState;
  },
  setArticles(state, articles) {
    let newState = cloneState(state);
    newState.articles = articles;
    newState.articlesLoaded = true;
    return newState;
  }
});

Effect('getHomepageArticles', () => {
  fetch(`${URI_ROOT}/homepage-articles`)
    .then((res) => res.json())
    .then((articles) => {
        console.log('articles:', articles);
        Actions.setHomepageArticles(articles);
      }
    ).catch((err) => {
    console.log('cannot get homepage articles: ', err);
  })
});

Effect('getArticles', () => {
  fetch(`${URI_ROOT}/articles`)
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
  if (action.type === 'setHomepageArticles') {
    const directories = _(action.payload)
      .map('directory')
      .map((dir) => dir.replace(/^articles(\/)?/, ''))
      .uniq()
      .sortBy()
      .value();
    Actions.setDirectories(directories);
  }
});