import React from 'react';
import './ArticleList.css';
import SortIcon from './../../component/SortIcon/SortIcon';
import moment from 'moment';
import _ from 'lodash';
import pathToInitial from '../../utils/pathToInitial';
import {Actions} from 'jumpsuit';

const SORTCOL_PATH = 'path';
const SORTCOL_DATE = 'date';
const SORTCOL_CONTENT = 'content';

const DEFAULT_SORT_ORDER =  {
  [SORTCOL_PATH]: 'a',
  [SORTCOL_CONTENT]: 'a',
  [SORTCOL_DATE]: 'd'
}

const dateToTime = _.memoize((dateString) => {
  if (!dateString) {
    return 0;
  }
  return Date.parse(dateString);
});

const articleDate = (date) => {
  let articleDate = moment(date);
  if (!articleDate.isValid) {
    return '??';
  }
  return articleDate.format('MMM D YY');
}

export default class ArticleList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sortColumn: SORTCOL_DATE, realSortColumn: SORTCOL_DATE, sortOrder: 'd'
    };
  }

  advanceSort (column, next) {
    console.log('advance: ', column, next);
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

  sortOrder (column) {
    if (!column) {
      column = this.state.realSortColumn;
    }
    if (column === this.state.realSortColumn) {
      return this.state.sortOrder;
    } else {
      return 'n';
    }
  }

  sortArticles (articles) {
    let sortedArticles;
    switch (this.state.realSortColumn) {
      case SORTCOL_PATH:
        sortedArticles = _.sortBy(articles, (article) => pathToInitial(article.path), 'title');
        break;

      case SORTCOL_CONTENT:
        sortedArticles = _.sortBy(articles, 'title', (article) => dateToTime(article.file_revised));
        break;

      case SORTCOL_DATE:
        sortedArticles = _.sortBy(articles, (article) => dateToTime(article.file_revised));
        break;

      default:
        sortedArticles = _.sortBy(articles, (article) => dateToTime(article.file_revised));
    }

    return this.sortOrder() === 'd' ? sortedArticles.reverse() : sortedArticles;
  }

  render () {
    const title = this.props.title;
    const titlePath = this.props.titlePath || '';
    const advanceSort = (sortColumn) => {
      return (next) => this.advanceSort(sortColumn, next)
    }
    const articles = _.filter(this.props.articles, 'published');
    return <div className="ArticleList">
      <div className="ArticleList__row">
        <div className="ArticleList__rowCell ArticleList__rowCell-path dark">
          <div className="ArticleList__rowCellPathInner ArticleList__rowCellPathInner-path">{titlePath}</div>
        </div>
        <div className="ArticleList__rowCell articleList__rowCell-content">
          <h2 className="pageHeader">{title}</h2>
        </div>
      </div>
      <div className="ArticleList__row articleList__row-sort">
        <div className="ArticleList__rowCell ArticleList__rowCell-sort ArticleList__rowCell-path dark">
          <div className="ArticleList__rowCellInner">
            <SortIcon color="dark" direction={this.sortOrder(SORTCOL_PATH)}
                      setSort={advanceSort(SORTCOL_PATH)}/>
          </div>
        </div>
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
          <div className="ArticleList__rowCell ArticleList__rowCell-path dark">
            <div className="ArticleList__rowCellInner ArticleList__rowCellInner-path">
              <div>{pathToInitial(article.path)}</div>
            </div>
          </div>
          <div className="ArticleList__rowCell articleList__rowCell-content" onClick={() => Actions.goArticle(article.path)}>
            <div className="ArticleList__rowCellInner">
              <h3>{article.title}</h3>
              <p>{article.description || ''} <span
                className="ArticleList__dateInline">  {articleDate(article.file_revised)}</span></p>
            </div>
          </div>
          <div className="ArticleList__rowCell ArticleList__rowCell-date">
            <div className="ArticleList__rowCellInner ArticleList__rowCellInner-date">
              {articleDate(article.file_revised)}
            </div>
          </div>
        </div>
      ))
      }
    </div>
  }
}