import React from 'react'
import {Component, Actions} from 'jumpsuit';
import ArticleList from '../../component/ArticleList/ArticleList';

export default Component(
    {
        componentDidMount() {
            if (!this.props.homepageArticlesLoaded) {
                Actions.getHomepageArticles();
            }
            Actions.navState.setCurrentDir(null);
        },
        render () {
            const homepageArticles = this.props.homepageArticles || [];
            const directories = this.props.directories || [];
            return <ArticleList title="Top Stories" directories={directories}
                                articles={homepageArticles}/>
        }
    },
    (state) => (
        {
            homepageArticles: state.articleState.homepageArticles,
            homepageArticlesLoaded: state.articleState.homepageArticlesLoaded,
            directories: state.articleState.directories
        }
    )
)