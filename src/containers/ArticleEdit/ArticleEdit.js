import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import {Checkbox, Radio} from 'react-icheck';
import 'icheck/skins/all.css'; // or single skin css
import articleDate from '../../utils/articleDate';

export default Component(
  {
    getInitialState(){
      return {article: false, path: '', loaded: false, published: false};
    },
    directory() {
      let match = /articles\/(.*)\/edit/.exec(this.props.location);
      return decodeURIComponent(match[1]);
    },
    componentWillMount() {
      if (this.props.article) {
        this.setState({article: _.cloneDeep(this.props.article)})
      }
    },
    componentDidMount() {
      if (!this.props.path) {
        Actions.articleEditState.setArticleEditPath(this.props.params.path);
      }
    },
    componentDidUpdate() {
      if (this.props.article && !this.state.article) {
        this.setState({article: _.cloneDeep(this.props.article), loaded: true});
      }
    },

    setTitle(title) {
      if (this.state.article) {
        this.setState({article: _.extend(_.cloneDeep(this.state.article), {title: title})});
      }
    },

    reset() {
      this.setState({article: _.cloneDeep(this.props.category)});
      this.forceUpdate();
    },

    changeContent(content) {
      console.log('setting content:', content);
      if (this.state.article) {
        this.setState({article: _.extend(_.cloneDeep(this.state.article), {content})});
      }
    },

    changePublished() {
      if (this.state.article) {
        this.setState({article: _.extend(_.cloneDeep(this.state.article), {published: !this.state.article.published})});
      }
    },

    update(event) {
      event.preventDefault();
      if (!this.props.apiToken) {
        return Actions.goHome();
      }
      Actions.updateArticleEditArticle(this.state.article);
    },

    render () {
      return <div className="Admin">
        <div className="Admin__frame">
          <h1 className="pageHeader"><a onClick={() => Actions.goAdmin()}>Admin</a>:
            <a onClick={() => Actions.goCategories()}>Categories</a>: Edit Article &quot;{this.props.path}&quot;
          </h1>
          { this.state.article && (<form className="pure-form pure-form-aligned">
            <fieldset>
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
                <label for="cb" className="pure-checkbox">
                  <Checkbox checkboxClass={'icheckbox_minimal-grey'}
                            checked={this.state.article.published}
                            onChange={() => this.changePublished()}/> Published
                </label>
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
    article: state.articleEditState.article,
    path: state.articleEditState.path,
    apiToken: state.authState.apiToken
  })
)