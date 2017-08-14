import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import {Checkbox, Radio} from 'react-icheck';
import 'icheck/skins/all.css'; // or single skin css
import articleDate from '../../utils/articleDate';

export default Component(
  {
    getInitialState(){
      return {category: false, loaded: false, directory: this.props.directory};
    },

    componentWillMount() {
      console.log('will mount');
      if (this.props.category) {
        this.setState({category: _.cloneDeep(this.props.category)});
      }
    },

    componentDidMount() {
      if (!this.props.directory) {
        Actions.categoryEditState.setCategoryEditDirectory(this.props.params.directory);
      }
    },

    componentDidUpdate() {
      console.log('componentDidUpdate with state category: ', this.state.category, 'props category: ', this.props.category);

      if (this.props.category && (!this.state.category)) {
        this.setState({category: _.cloneDeep(this.props.category)});
      }
    },

    setTitle(title) {
      if (this.state.category) {
        this.setState({category: _.extend(_.cloneDeep(this.state.category), {title: title || ''})});
      }
    },

    reset() {
      this.setState({category: _.cloneDeep(this.props.category)});
      this.forceUpdate();
    },

    changePublished() {
      if (this.state.category) {
        this.setState({category: _.extend(_.cloneDeep(this.state.category), {published: !this.state.category.published})});
      }
    },

    update(event) {
      event.preventDefault();
      if (!this.props.apiToken) {
        return Actions.goHome();
      }
      Actions.updateCategoryEditCategory(this.state.category);
    },

    render () {
      console.log('rendering with state category: ', this.state.category, 'props category: ', this.props.category);
      return <div className="Admin">
        <div className="Admin__frame">
          <h1 className="pageHeader"><a onClick={() => Actions.goAdmin()}>Admin</a>:
            <a onClick={() => Actions.goCategories()}>Categories</a>: Edit
            Category &quot;{this.props.directory}&quot;</h1>
          {this.state.category && (<form className="pure-form pure-form-aligned">
            <fieldset>
              <div className="pure-control-group">
                <label for="name">Directory</label>
                <input id="name" type="text" value={this.state.category.directory}
                       className="edit-field" disabled={true}/>
              </div>

              <div className="pure-control-group">
                <label for="name">Title</label>
                <input id="name" type="text" placeholder="Title" value={this.state.category.title}
                       className="edit-field"
                       onChange={(event) => this.setTitle(event.target.value)}/>
              </div>

              <div className="pure-controls">
                <label for="cb" className="pure-checkbox">
                  <Checkbox checkboxClass={'icheckbox_minimal-grey'}
                            checked={this.state.category.published}
                            onChange={() => this.changePublished()}/> Published
                </label>
              </div>
              <div className="form-buttons">
                <button className="pure-button pure-button-primary" onClick={(event) => this.update(event)}>Update
                </button>
                <button className="pure-button" onClick={() => this.reset()}>Reset</button>
              </div>
            </fieldset>
          </form>)}
          {this.state.category && (<h2>Articles</h2>)}
          {this.state.category && (<table className="pure-table">
            <thead>
            <tr>
              <th>Title</th>
              <th className="table-cell-bin">Published?</th>
              <th className="table-cell-date">Revised</th>
              <th className="table-cell-button">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {this.props.category.articles && this.props.category.articles.map((article, i) => (
              <tr key={`article-${article.path}-${i}`}>
                <td>{article.title}</td>
                <td className="table-cell-bin">{article.published ? 'Yes' : 'No'}</td>
                <td className="table-cell-date">{articleDate(article)}</td>
                <td className="table-cell-button">
                  <button onClick={() => Actions.goEditArticle(article.path)} className="pure-button">Edit</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>)}
        </div>
      </div>
    }
  },
  (state) => ({
    category: state.categoryEditState.category,
    directory: state.categoryEditState.directory
  })
)