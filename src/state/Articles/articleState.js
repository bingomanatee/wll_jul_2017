import React from 'react'
import fetch from 'node-fetch';
import {Render, State, Actions, Effect} from 'jumpsuit'
const URI_ROOT = 'http://wonderlandlabs.com';

const cloneState = (state) => ({
  articles: state.articles.slice(),
  homepageArticles: state.homepageArticles.slice(),
  homepageArticlesLoaded: state.homepageArticlesLoaded
});

export default State({
  // Initial State
  initial: {articles: [], homepageArticles: [], chapters: [], homepageArticlesLoaded: false},
  // Actions
  setHomepageArticles(state, homepageArticles) {
    let newState = cloneState(state);
    newState.homepageArticles = homepageArticles;
    newState.homepageArticlesLoaded = true;
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
    console.log('ghpa: ', err);
  })
});