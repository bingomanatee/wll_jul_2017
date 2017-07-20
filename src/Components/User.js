import React from 'react'
import {Component, Actions, Link} from 'jumpsuit'

export default Component({
        render() {
            const identity = this.props.identity;
            return (
                <div className="container">
                    {
                        this.props.loggedIn && (
                            <h4>
                                You are logged in as {identity.name}! <a style={{cursor: 'pointer'}} onClick={() => Actions.logout()}>Log Out</a>
                            </h4>
                        )
                    }
                    {
                        !this.props.loggedIn && (
                            <h4>
                                You are not logged in! Please{' '}
                                <a
                                    style={{cursor: 'pointer'}}
                                    onClick={() => Actions.login()}
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
    },
    (state) => {
        return {
            identity: state.authState.identity,
            loggedIn: state.authState.loggedIn
        }
    }
);