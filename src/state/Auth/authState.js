import Auth from './Auth';

const auth = new Auth();

import React from 'react'
import { Render, State, Actions, Component } from 'jumpsuit'

// Create a state with some actions
export default State({
  // Initial State
  initial: { identity: false, loggedIn: false},
  // Actions
  setUser(state, user) {
    return {identity: user, loggedIn: !!user}
  },
  reset() { return { identity: false, loggedIn: false} }
});