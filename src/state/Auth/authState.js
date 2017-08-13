import Auth from './Auth';
import React from 'react'
import {Render, State, Actions, Hook, Effect} from 'jumpsuit'
import {URI_ROOT} from '../../config';
import _ from 'lodash';

const INITIAL = {identity: false, loggedIn: false, apiToken: false, authLevel: 0};
const auth = new Auth();
const API_TOKEN = 'apiToken';
const USER_AUTH_LEVEL = 'authLevel';

const updateState = (state, update) => _.extend({}, INITIAL, state || {}, update || {});

// Create a state with some actions
const authState = State('authState', {
  // Initial State
  initial: updateState(INITIAL, {
    apiToken: (localStorage && localStorage.getItem(API_TOKEN)) || false,
    authLevel: (localStorage && localStorage.getItem(USER_AUTH_LEVEL)) || 0
  }),
  // Actions
  setUser(state, identity) {
    return updateState(state, {identity, loggedIn: !!identity});
  },
  setUserAuth(state, authLevel) {
    return updateState(state, {authLevel})
  },
  resetUser() {
    if (localStorage) {
      localStorage.removeItem(API_TOKEN);
      localStorage.removeItem(USER_AUTH_LEVEL);
    }
    return updateState();
  },
  setApiToken(state, apiToken) {
    return updateState(state, {apiToken});
  }
});

export default authState;

Hook((action) => {
  if (action.type === 'authState_setApiToken') {
    if (localStorage) {
      localStorage.setItem(API_TOKEN, action.payload);
    }
  }
});

Hook((action) => {
  if (action.type === 'authState_setUserAuth') {
    if (localStorage) {
      localStorage.setItem(USER_AUTH_LEVEL, action.payload);
    }
  }
});

Hook((action) => {
  if (action.type === 'authState_setUser') {
    const user = action.payload;
    if (user) {
      fetch(`${URI_ROOT}/user/${user.sub}`, {method: 'PUT', body: JSON.stringify(user)})
        .then((response) => {
          return response.json();
        }).then((data) => {
        authState.setUserAuth(data.auth || 0);
        const idToken = localStorage.getItem('access_token');
        return fetch(`${URI_ROOT}/auth`, {
          method: 'POST',
          body: JSON.stringify({sid: user.sub, usertoken: idToken})
        })
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            authState.setApiToken(data.token);
          }
        });
    }
  }
})

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