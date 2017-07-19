import React from 'react'
import { Component, Actions, Link } from 'jumpsuit'

export default Component( {
  render() {
     const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              You are logged in! <a style={{cursor: 'pointer'}} onClick={() =>logout()}>Log Out</a>
            </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => login()}
              >
                Log In
              </a>
              &nbsp;to continue.
            </h4>
          )
        }
      </div>
    );
  }
});