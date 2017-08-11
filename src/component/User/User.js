import React from 'react'
import {Component, Actions, Link} from 'jumpsuit'
import userIcon from './img/user_icon.svg';
import userIconLoggedOut from './img/user_icon_logged_out.svg';
import userIconSm from './img/user_icon_sm.svg';
import userIconLoggedOutSm from './img/user_icon_logged_out_sm.svg'
import './User.css';

export default Component({
    render() {
      const identity = this.props.identity;
      const authLevel = this.props.authLevel;

      return (
        <div className="User">
          {
            this.props.loggedIn && (
              <div className="User__row">
                <div className="User__label ifNotSmall">{identity.name} ({authLevel})</div>
                <div onClick={() => Actions.logout()} className="User__label link"><span className="logoutX">X</span><span
                  className="ifNotSmall">Log Out</span></div>
                <img src={userIcon} className="ifNotSmall"/>
                <img src={userIconSm} className="ifSmall"/>
              </div>
            )
          }
          {
            !this.props.loggedIn && (
              <div className="User__row"
                   style={{cursor: 'pointer'}}
                   onClick={() => Actions.login()}
              >
                <div className="User__label link ifNotSmall">Sign In</div>
                <img src={userIconLoggedOut} className="ifNotSmall"/>
                <img src={userIconLoggedOutSm} className="ifSmall"/>
              </div>
            )
          }
        </div>
      );
    }
  },
  (state) => {
    return {
      identity: state.authState.identity,
      loggedIn: state.authState.loggedIn,
      authLevel: state.authState.authLevel
    }
  }
);