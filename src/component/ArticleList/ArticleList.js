import React from 'react';
import './ArticleList.css';
import SortIcon from './../../component/SortIcon/SortIcon';
import articleDate from './../../utils/articleDate';
import _ from 'lodash';
import pathToInitial from '../../utils/pathToInitial';
import dirTitle from '../../utils/dirTitle';
import {Actions} from 'jumpsuit';

const SORTCOL_PATH = 'path';
const SORTCOL_DATE = 'date';
const SORTCOL_CONTENT = 'content';

const DEFAULT_SORT_ORDER = {
    [SORTCOL_PATH]: 'a',
    [SORTCOL_CONTENT]: 'a',
    [SORTCOL_DATE]: 'd'
};

const dateToTime = _.memoize((dateString) => {
    if (!dateString) {
        return 0;
    }
    return Date.parse(dateString);
});

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortColumn: SORTCOL_DATE, realSortColumn: SORTCOL_DATE, sortOrder: 'd'
        };
    }

    advanceSort(column, next) {
        if (column !== this.state.sortColumn) {
            // initialize with default sort column
            this.setState({
                sortColumn: column,
                realSortColumn: column,
                sortOrder: DEFAULT_SORT_ORDER[column]
            });
        } else if (next === 'n') {
            // initialize with default sort column
            switch (column) {
                case SORTCOL_PATH:
                    this.setState({
                        sortColumn: column,
                        realSortColumn: SORTCOL_DATE,
                        sortOrder: DEFAULT_SORT_ORDER[SORTCOL_DATE]
                    });
                    break;
                case SORTCOL_CONTENT:
                    this.setState({
                        sortColumn: column,
                        realSortColumn: SORTCOL_DATE,
                        sortOrder: DEFAULT_SORT_ORDER[SORTCOL_DATE]
                    });
                    break;
                case SORTCOL_DATE:
                    this.setState({
                        sortColumn: column,
                        realSortColumn: SORTCOL_CONTENT,
                        sortOrder: DEFAULT_SORT_ORDER[SORTCOL_CONTENT]
                    });
                    break;
            }
        } else {
            // cycle normally
            this.setState({
                sortColumn: column,
                realSortColumn: column,
                sortOrder: next
            });
        }
    }

    sortOrder(column) {
        if (!column) {
            column = this.state.realSortColumn;
        }
        if (column === this.state.realSortColumn) {
            return this.state.sortOrder;
        } else {
            return 'n';
        }
    }

    sortArticles(articles) {
        let sortedArticles;
        switch (this.state.realSortColumn) {
            case SORTCOL_PATH:
                sortedArticles = _.sortBy(articles, (article) => pathToInitial(article.path), 'title');
                break;

            case SORTCOL_CONTENT:
                sortedArticles = _.sortBy(articles, 'title', (article) => dateToTime(article.fileRevised));
                break;

            case SORTCOL_DATE:
                sortedArticles = _.sortBy(articles, (article) => dateToTime(article.fileRevised));
                break;

            default:
                sortedArticles = _.sortBy(articles, (article) => dateToTime(article.fileRevised));
        }

        sortedArticles = _.filter(sortedArticles, 'published');
        if (this.props.directories) {
            const dirFilter = this.dirFilter();
            sortedArticles = _.filter(sortedArticles, (article) => {
                return dirFilter.hasOwnProperty(article.directory) ? dirFilter[article.directory] : true;
            });
        }

        return this.sortOrder() === 'd' ? sortedArticles.reverse() : sortedArticles;
    }

    dirFilter() {
       return _.reduce(this.props.directories, (memo, dir) => {
            memo[dir.directory] = !!dir.published;
            return memo;
        }, {});
    }

    render() {
        let title = this.props.title;
        const directory = this.props.directory;
        if (directory) title = 'Articles in "' + _.capitalize(dirTitle(directory)) + '"';
        const titlePath = this.props.titlePath || '';
        const advanceSort = (sortColumn) => {
            return (next) => this.advanceSort(sortColumn, next)
        };
        const articles = _.filter(this.props.articles, 'published');
        return <div className="ArticleList">
            <div className="ArticleList__row">
                {directory ? (<div className="ArticleList__rowCell ArticleList__rowCell-dir"></div>) : (<div className="ArticleList__rowCell ArticleList__rowCell-path dark">
                    <div className="ArticleList__rowCellPathInner ArticleList__rowCellPathInner-path">{titlePath}</div>
                </div>)}
                <div className="ArticleList__rowCell articleList__rowCell-content ArticleList__rowCell-title">
                    <h2 className="pageHeader">{title}</h2>
                </div>
            </div>
            <div className="ArticleList__row articleList__row-sort">
                {directory ? (<div className="ArticleList__rowCell ArticleList__rowCell-dir"></div>) : (<div className="ArticleList__rowCell ArticleList__rowCell-sort ArticleList__rowCell-path dark">
                    <div className="ArticleList__rowCellInner">
                        <SortIcon color="dark" direction={this.sortOrder(SORTCOL_PATH)}
                                  setSort={advanceSort(SORTCOL_PATH)}/>
                    </div>
                </div>)}
                <div className="ArticleList__rowCell ArticleList__rowCell-sort articleList__rowCell-content">
                    <div className="ArticleList__rowCellInner">
                        <SortIcon color="light" direction={this.sortOrder(SORTCOL_CONTENT)}
                                  setSort={advanceSort(SORTCOL_CONTENT)}/>
                    </div>
                </div>
                <div className="ArticleList__rowCell ArticleList__rowCell-sort  ArticleList__rowCell-date">
                    <div className="ArticleList__rowCellInner ArticleList__rowCellInner-date">
                        <SortIcon color="light" direction={this.sortOrder(SORTCOL_DATE)}
                                  setSort={advanceSort(SORTCOL_DATE)}/>
                    </div>
                </div>
            </div>
            {this.sortArticles(articles).map((article, i) => (
                <div className="ArticleList__row ArticleList___row-article" key={'article_' + article.path + _ + 'i'}>
                    {directory ? '' : (<div className="ArticleList__rowCell ArticleList__rowCell-path dark">
                        <div className="ArticleList__rowCellInner ArticleList__rowCellInner-path">
                            <div>{pathToInitial(dirTitle(article.directory))}</div>
                        </div>
                    </div>)}
                    <div className="ArticleList__rowCell articleList__rowCell-content"
                         onClick={() => Actions.goArticle(article.path)}>
                        <div className="ArticleList__rowCellInner">
                            <h3>{directory ? (<span style={({color: 'rgba(0,0,0,0)'})}>...</span>) :(<span
                                className="path-secondary">{pathToInitial(dirTitle(article.directory), true)}:</span>)} {article.title}
                            </h3>
                            <p>{article.description || ''} <span
                                className="ArticleList__dateInline">{articleDate(article)}</span></p>
                        </div>
                    </div>
                    <div className="ArticleList__rowCell ArticleList__rowCell-date">
                        <div className="ArticleList__rowCellInner ArticleList__rowCellInner-date">
                            {articleDate(article)}
                        </div>
                    </div>
                </div>
            ))
            }

            <div className="ArticleList__row ArticleList__row-last">
                <div className="ArticleList__rowCell ArticleList__rowCell-path dark">
                    <div className="ArticleList__rowCellPathInner ArticleList__rowCellPathInner-path">&nbsp;</div>
                </div>
                <div className="ArticleList__rowCell articleList__rowCell-content">
                    &nbsp;
                </div>
            </div>
        </div>
    }
}
