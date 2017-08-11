import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';

const navState = State('navState', {
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

export default navState;

Effect('goCategories', () => {
  navState.setCurrentDir(false);
  Goto({path: '/admin/categories/'});
});

Effect('goEditCategory', (directory) => {
  navState.setCurrentDir(cleanDirectory(directory));
  Goto({path: '/admin/categories/' + encodeURIComponent(directory) + '/edit'});
});

Effect('goDirectory', (directory) => {
  navState.setCurrentDir(directory);
  Goto({path: '/directory/' + directory});
});

Effect('goArticle', (currentArticlePath) => {
  navState.setCurrentDir(currentArticlePath);
  Actions.getArticle(currentArticlePath);
  Goto({path: '/article/' + encodeURIComponent(cleanDirectory(currentArticlePath))});
});

Effect('goHome', () => {
  navState.setCurrentDir(false);
  Goto({path: '/', hash: null, query: null});
});

Effect('goAdmin', () => {
  navState.setCurrentDir(false);
  Goto({path: '/admin', hash: null, query: null});
});