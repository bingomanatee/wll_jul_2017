import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import makeAuthHeader from './../../utils/makeAuthHeader';
import {URI_ROOT} from '../../config';
import axios from 'axios';
import encodePath from './../../utils/encodePath';
import DirectoryModel from './../../models/Directory';

const INITIAL = {directory: false, category: false, edited: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

const categoryUrl = (category) => `${URI_ROOT}/categories/${encodePath(category.directory)}.json`;

const categoryEditState = State('categoryEditState', {
  initial: INITIAL,

  setDirectory (state, directory)  {
    return updateState(state, {directory});
  },

  setCategory(state, category) {
    category = _.cloneDeep(category);
    console.log('edit category set to ', category);
    return updateState(state, {category});
  },

  reset(state) {
    return updateState();
  }
});

export default categoryEditState;

// setting revision as opposed to initial population
Effect('updateCategoryEditCategory', (category) => {
  categoryEditState.setCategory(category);
});

// need hook to get auth header
Hook((action, getState) => {
  if (action.type === 'updateCategoryEditCategory') {
    const category = action.payload;
    axios({url: categoryUrl(category),
      method: 'PUT', data: category, headers: {
        'Auth-token': getState().authState.apiToken
    }})
      .then(() => {
        Actions.getDirectories();
        Actions.goCategories();
      }).catch((err) => {
      console.log('error:', err);
    })
  }
});

Hook((action, getState) => {
  console.log('hook for setDirectory', action.type);

  if (action.type === 'categoryEditState_setDirectory') {
    DirectoryModel.get()
      .then((directory) => {
        categoryEditState.setCategory(directory);
      })
  }
});