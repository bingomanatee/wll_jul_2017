import React from 'react'
import {Hook, State, Actions, Effect} from 'jumpsuit';

export default State({
  // Initial State
  initial: {showNav: false},
  // Actions
  toggleNav: (state) => {
    console.log('toggleNav!');
    return {showNav: !state.showNav};
  },
  displayNav: () => ({showNav: true}),
  hideNav: () => ({showNav: false})
});
