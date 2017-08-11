import React from 'react'
import {Hook, Goto, State, Actions, Effect} from 'jumpsuit';
import _ from 'lodash';
import cleanDirectory from './../../utils/cleanDirectory';
import {URI_ROOT} from '../../config';

const INITIAL = {directory: false, category: false, edited: false};
const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

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
    const state = getState();
    const headers = new Headers();
    headers.append('Auth-token',state.authState.apiToken);
    fetch(new Request(`${URI_ROOT}/categories/${encodeURIComponent(category.directory)}`,
      {method: 'PUT', body: JSON.stringify(category), headers: headers}))
      .then((response) => {
      response.json();
      }).then((data) => {
      console.log('update data:', data);
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
