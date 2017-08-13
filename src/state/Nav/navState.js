import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import encodePath from '../../utils/encodePath';

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
    newState.currentDir = currentDir;
    return newState;
  },
  setCurrentArticlePath: (state, currentArticlePath) => {
    let newState = _.cloneDeep(state);
    newState.toggleNav = false;
    newState.currentArticlePath = currentArticlePath;
    newState.currentDir = currentArticlePath.replace(/\/[^\/]+\.md$/, '');
    return newState;
  }
});

export default navState;

Effect('goCategories', () => {
  navState.setCurrentDir(false);
  Goto({path: '/admin/categories/'});
});

Effect('goEditCategory', (directory) => {
  navState.setCurrentDir(directory);
  Goto({path: '/admin/categories/' + encodePath(directory) + '/edit'});
});

Effect('goEditArticle', (path) => {
  navState.setCurrentDir(encodePath(path.replace(/\/[^\/]+\.md$/, '')));
  Goto({path: '/admin/articles/' + encodePath(path) + '/edit'});
});

Effect('goDirectory', (directory) => {
  navState.setCurrentDir(directory);
  Goto({path: '/directory/' + encodePath(directory)});
});

Effect('goArticle', (currentArticlePath) => {
  navState.setCurrentDir(currentArticlePath);
  Actions.getArticle(currentArticlePath);
  Goto({path: '/article/' + encodePath(currentArticlePath)});
});

Effect('goHome', () => {
  navState.setCurrentDir(false);
  Goto({path: '/', hash: null, query: null});
});

Effect('goAdmin', () => {
  navState.setCurrentDir(false);
  Goto({path: '/admin', hash: null, query: null});
});