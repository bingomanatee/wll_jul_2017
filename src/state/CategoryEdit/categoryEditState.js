import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';
import makeAuthHeader from './../../utils/makeAuthHeader';
import {URI_ROOT} from '../../config';

const INITIAL = {directory: false, category: false, edited: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

const categoryUrl = (category) => `${URI_ROOT}/categories/${encodeURIComponent(category.directory)}`;

const categoryEditState = State('categoryEditState', {
  initial: INITIAL,

  setCategoryEditDirectory (state, directory)  {
    return updateState(state, {directory});
  },

  setCategoryEditCategory(state, category) {
    category = _.cloneDeep(category);
    return updateState(state, {category});
  }
});

export default categoryEditState;

Effect('updateCategoryEditCategory', (category) => {
  categoryEditState.setCategoryEditCategory(category);
});

Hook((action, getState) => {
  if (action.type === 'updateCategoryEditCategory') {
    const category = action.payload;
    const headers = makeAuthHeader(getState());
    fetch(new Request(categoryUrl(category),
      {method: 'PUT', body: JSON.stringify(category), headers}))
      .then(() => {
        Actions.getDirectories();
      }).catch((err) => {
      console.log('error:', err);
    })
  }
});

Effect('loadEditCategory', (directory) => {
  fetch(`${URI_ROOT}/categories/${encodeURIComponent(directory)}`)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      categoryEditState.setCategoryEditCategory(json);
    });
});
