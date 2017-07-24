import React from 'react'
import './App.css'
import {Component, Actions} from 'jumpsuit';
import Header from '../Header/Header';

export default Component({

    componentDidMount() {
        Actions.initAuth();
        if (!this.props.articlesLoaded) {
          Actions.getArticles();
        }
    },

    render() {
        return (
            <div className='App'>
                <Header />
                <div className="App__content">
                {this.props.children}
                </div>
            </div>
        )
    }
}, (state) => ({articlesLoaded: state.articleState.articlesLoaded})
)