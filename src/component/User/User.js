import React from 'react'
import {Component, Actions, Link} from 'jumpsuit'
import userIcon from './img/user_icon.svg';
import userIconLoggedOut from './img/user_icon_logged_out.svg';
import './User.css';

export default Component({
    render() {
      const identity = this.props.identity;
      return (
        <div className="User">
          {
            this.props.loggedIn && (
              <div className="User__row"> <div className="User__label">{identity.name}</div>
                <div onClick={() => Actions.logout()} className="User__label link">Log Out</div> <img src={userIcon}/>
              </div>
            )
          }
          {
            !this.props.loggedIn && (
              <div className="User__row"
                 style={{cursor: 'pointer'}}
                 onClick={() => Actions.login()}
              >
                <div className="User__label link">Sign In</div>
                <img src={userIconLoggedOut}/>
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
      loggedIn: state.authState.loggedIn
    }
  }
);