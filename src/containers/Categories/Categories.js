import React from 'react'
import {Component, Actions} from 'jumpsuit';
import _ from 'lodash';
import Categories from '../../component/Categories/Categories';

export default Component(
  {
    componentDidMount() {
    },
    render () {
      return <Categories directories={this.props.directories} />
    }
  },
  (state) => ({
    directories: state.articleState.directories
  })
)