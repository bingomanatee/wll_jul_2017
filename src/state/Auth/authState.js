import Auth from './Auth';
import React from 'react'
import { Render, State, Actions, Effect } from 'jumpsuit'

const auth = new Auth();

// Create a state with some actions
export default State({
  // Initial State
  initial: { identity: false, loggedIn: false},
  // Actions
  setUser(state, user) {
    return {identity: user, loggedIn: !!user}
  },
  resetUser() { return { identity: false, loggedIn: false} }
});

Effect('login', () => {
  auth.login();
});

Effect('logout', () => {
  auth.logout();
});

Effect('parseAuth', () => {
  auth.handleAuthentication();
});

Effect('initAuth', () => {
  auth.loadUser();
});