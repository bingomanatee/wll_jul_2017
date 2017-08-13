import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';


export default Component(
  {
    getInitialState() {
      return {active: false, value: this.props.value || 0}
    },

    updateValue(event) {
      const value = event.target.value;
      this.setState({value});
    },

    activate() {
      this.setState({active: true})
    },

    submit(event) {
      event.preventDefault();
      this.props.updateValue(this.state.value);
      this.setState({active:false})
    },

    render() {

      return this.state.active ? (<div className="ClickEditNumber">
        <form className="pure-form" onSubmit={(event) => this.submit(event)}>
          <fieldset>
            <input type="number" onChange={(event) => this.updateValue(event)} value={this.state.value}/>
          </fieldset>
        </form>
      </div>) : (
        <div className="ClickEditNumber" onClick={() => this.activate()}>
          <span className="ClickEditNumber__value">{this.state.value}</span>
        </div> );

    }
  });