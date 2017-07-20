import React from 'react'
import './App.css'
import {Component, Actions} from 'jumpsuit';
import Header from '../Header/Header';

export default Component({

    componentDidMount() {
        Actions.initAuth();
    },

    render() {
        return (
            <div className='App'>
                <Header />
                {this.props.children}
            </div>
        )
    }
})
