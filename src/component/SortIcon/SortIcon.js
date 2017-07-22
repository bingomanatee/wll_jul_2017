import React from 'react';

import sortADark from './img/sort-a-dark.png';
import sortDDark from './img/sort-d-dark.png';
import sortNDark from './img/sort-n-dark.svg';

import sortALight from './img/sort-a-light.png';
import sortDLight from './img/sort-d-light.png';
import sortNLight from  './img/sort-n-light.svg';

const sortList = {
  dark: {
    a: sortADark,
    d: sortDDark,
    n: sortNDark
  },

  light: {
    a: sortALight,
    d: sortDLight,
    n: sortNLight
  }
};

const advanceCycle = {a: 'd', d: 'n', n: 'a'}
const advanceTo = (direction) => advanceCycle[direction];
export default (props) => (
  <div className="SortIcon" onClick={() => props.setSort(advanceTo(props.direction || 'n'))}>
    <img src={sortList[props.color || 'dark'][props.direction || 'n']}
         className="SortIcon__img"/>
  </div>
);