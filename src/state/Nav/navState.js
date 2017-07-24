import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';

export default State({
  // Initial State
  initial: {showNav: false, currentDir: false, currentArticlePath: false},
  // Actions
  toggleNav: (state) => {
    let newState = _.cloneDeep(state);
    newState.showNav = !newState.showNav;
    return newState;
  },
  displayNav: (state) => {
    let newState = _.cloneDeep(state);
    newState.showNav = true;
    return newState;
  },
  displayNav: (state) => {
    let newState = _.cloneDeep(state);
    newState.showNav = false;
    return newState;
  },
  setCurrentDir: (state, currentDir) => {
    let newState = _.cloneDeep(state);
    newState.showNav = false;
    newState.currentDir = cleanDirectory(currentDir);
    return newState;
  },
  setCurrentArticlePath: (state, currentArticlePath) => {
    let newState = _.cloneDeep(state);
    newState.toggleNav = false;
    newState.currentArticlePath = cleanDirectory(currentArticlePath);
    newState.currentDir = newState.currentArticlePath.split('/').pop();
    return newState;
  }
});

Effect('goDirectory', (directory) => {
  Actions.setCurrentDir(directory);
  Goto({path: '/directory/' + directory});
});

Effect('goArticle', (currentArticlePath) => {
  Actions.setCurrentArticlePath(currentArticlePath);
  Actions.getArticle(currentArticlePath);
  Goto({path: '/article/' + encodeURIComponent(cleanDirectory(currentArticlePath))});
});

Effect('goHome', () => {
  Goto({path: '/', hash: null, query: null});
})