import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import {Checkbox, Radio} from 'react-icheck';
import 'icheck/skins/all.css'; // or single skin css

export default Component(
  {
    getInitialState(){
      return {editedCategory: {}, loaded: false, published: false};
    },
    directory() {
      let match = /categories\/(.*)\/edit/.exec(this.props.location);
      return decodeURIComponent(match[1]);
    },
    componentDidMount() {
      Actions.loadEditCategory(this.directory());
    },
    componentDidUpdate() {
      if (this.props.category && !this.state.loaded) {
        this.setState({editedCategory: _.cloneDeep(this.props.category), loaded: true});
      }
    },
    setTitle(title) {
      if (this.state.editedCategory) {
        this.setState({editedCategory: _.extend(_.cloneDeep(this.state.editedCategory), {title: title || ''})});
      }
    },

    reset() {
      this.setState({editedCategory: _.cloneDeep(this.props.category)});
      this.forceUpdate();
    },

    changePublished() {
      if (this.state.editedCategory) {
        this.setState({editedCategory: _.extend(_.cloneDeep(this.state.editedCategory), {published: !this.state.editedCategory.published})});
      }
    },

    update(event) {
      event.preventDefault();
      if (!this.props.apiToken) {
        return Actions.goHome();
      }
      Actions.updateCategoryEditCategory(this.state.editedCategory);
    },

    render () {
      return <div className="Admin">
        <div className="Admin__frame">
          <h1 className="pageHeader"><a onClick={() => Actions.goAdmin()}>Admin</a>:
            <a onClick={() => Actions.goCategories()}>Categories</a>: Edit Category</h1>
          <form className="pure-form pure-form-aligned">
            <fieldset>
              <div className="pure-control-group">
                <label for="name">Directory</label>
                <input id="name" type="text" value={this.state.editedCategory.directory}
                       className="edit-field" disabled={true}/>
              </div>

              <div className="pure-control-group">
                <label for="name">Title</label>
                <input id="name" type="text" placeholder="Title" value={this.state.editedCategory.title}
                       className="edit-field"
                       onChange={(event) => this.setTitle(event.target.value)}/>
              </div>

              <div className="pure-controls">
                <label for="cb" className="pure-checkbox">
                  <Checkbox checkboxClass={'icheckbox_minimal-grey'}
                            checked={this.state.editedCategory.published}
                            onChange={() => this.changePublished()}/> Published
                </label>
              </div>
              <div className="form-buttons">
                <button className="pure-button pure-button-primary" onClick={(event) => this.update(event)}>Update
                </button>
                <button className="pure-button" onClick={() => this.reset()}>Reset</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    }
  },
  (state) => ({
    location: state.routing.locationBeforeTransitions.pathname,
    category: state.categoryEditState.category,
    apiToken: state.authState.apiToken
  })
)