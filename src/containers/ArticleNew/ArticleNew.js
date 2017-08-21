import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import {Checkbox, Radio} from 'react-icheck';
import 'icheck/skins/all.css'; // or single skin css
import articleDate from '../../utils/articleDate';
import sanitize from "sanitize-filename";

export default Component(
  {
    getInitialState(){
      const state = {
        article: this.initialArticle(),
        directory: '',
        filename: 'new_file',
        loaded: false,
        published: false
      };
      state.article.path = this.path('new_file');
      return state;
    },

    initialArticle() {
      return {
        title: 'Untitled',
        path: this.props.directory,
        directory: this.props.directory,
        content: '',
        published: false,
        on_homepage: false,
      };
    },

    componentWillMount() {
    },

    componentDidMount() {
      if (!this.state.directory) {
        Actions.articleNewState.setDirectory(this.props.params.directory);
        this.setState({directory: this.props.params.directory});
        this.updateArticle({path: `${this.props.params.directory}/${this.state.filename}.md`})
      }
    },

    componentDidUpdate() {
      if (this.props.directory && (this.state.article.directory !== this.props.directory)) {
        this.updateArticle({directory: this.props.directory});
      }
      if (this.props.directory && (this.state.directory != this.props.directory)) {
        this.setState({directory: this.props.directory});
      }
    },

    setTitle(title) {
      this.updateArticle({title});
    },

    setFilename(filename) {
      filename = sanitize(filename.replace(/\.md$/i, ''));
      this.setState({filename});
      this.updateArticle({path: this.path(filename)});
    },

    path(filename){
      return `${this.props.directory}/${filename || this.state.filename}.md`;
    },

    updateArticle(params) {
      if (!this.state.article) {
        return;
      }
      const article = _.extend({}, this.state.article, {directory: this.state.directory}, params);
      if (JSON.stringify(article) !== JSON.stringify(this.state.article)) {
        this.setState({article});
      }
    },

    reset() {
      this.setState({article: this.initialArticle()});
      this.forceUpdate();
    },

    changeContent(content) {
      this.updateArticle({content});
    },

    changePublished() {
      this.updateArticle({published: !this.state.article.published});
    },

    changeOnHomepage() {
      this.updateArticle({on_homepage: !this.state.article.on_homepage})
    },

    update(event) {
      event.preventDefault();
      if (!this.props.apiToken) {
        return Actions.goHome();
      }
      Actions.updateArticleNewArticle(this.state.article);
    },

    render() {
      return <div className="Admin">
        <div className="Admin__frame">
          <h1 className="pageHeader"><a onClick={() => Actions.goAdmin()}>Admin</a>:
            <a onClick={() => Actions.goCategories()}>Categories</a>: New Article in &quot;{this.state.directory}&quot;
          </h1>
          { this.state.article && (<form className="pure-form pure-form-aligned">
            <fieldset>
              <div className="pure-control-group">
                <label for="filename">Filename</label>
                <input id="filename" type="text" placeholder="Filename" value={this.state.filename}
                       className="edit-field"
                       onChange={(event) => this.setFilename(event.target.value)}/>
              </div>

              <div className="pure-control-group">
                <label for="name">Path</label>
                <input id="name" type="text" value={this.state.article.path}
                       className="edit-field" disabled={true}/>
              </div>

              <div className="pure-control-group">
                <label for="name">Title</label>
                <input id="name" type="text" placeholder="Title" value={this.state.article.title}
                       className="edit-field"
                       onChange={(event) => this.setTitle(event.target.value)}/>
              </div>

              <div className="pure-control-group">
                <label for="cb">&nbsp;
                </label>
                <span onClick={() => this.changePublished()}>
            <Checkbox checkboxClass={'icheckbox_minimal-grey'}
                      checked={this.state.article.published}
                      onChange={() => this.changePublished()}/> &nbsp;
                  Published
                </span>
              </div>

              <div className="pure-control-group">
                <label for="cb"> &nbsp;
                </label>
                <span onClick={() => this.changeOnHomepage()}>
                  <Checkbox checkboxClass={'icheckbox_minimal-grey'}
                            checked={this.state.article.on_homepage}
                            onChange={() => this.changeOnHomepage()}
                  />
                  &nbsp; Show On Homepage
                </span>
              </div>

              <div className="pure-control-group">
                <h2>Content</h2>
                <textarea style={({height: '60vh', 'min-height': '20rem', width: '100%'})}
                          onChange={(event) => this.changeContent(event.target.value)}
                          value={this.state.article.content}>
                </textarea>
              </div>
              <div className="form-buttons">
                <button className="pure-button pure-button-primary" onClick={(event) => this.update(event)}>Update
                </button>
                <button className="pure-button" onClick={() => this.reset()}>Reset</button>
              </div>
            </fieldset>
          </form>)}
        </div>
      </div>
    }
  },
  (state) => ({
    location: state.routing.locationBeforeTransitions.pathname,
    article: state.articleNewState.article,
    directory: state.articleNewState.directory,
    apiToken: state.authState.apiToken
  })
)