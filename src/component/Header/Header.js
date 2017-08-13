import './Header.css';
import React from 'react';
import User from '../User/User';
import homeIcon from './img/homeIcon.svg';
import homeIconSm from './img/homeIcoSm.svg';
import hamburger from './img/Hamburger.svg';
import {Actions} from 'jumpsuit';
import _ from 'lodash';

const HeaderDirNav = (props) => (
  <div className={`HeaderDirNav__item ${props.active ? 'HeaderDirNav__item-active' : ''}`}
       onClick={() => Actions.goDirectory(props.directory.directory)}
  >{props.directory.title.substr(0, 3)}<span className="pathSuffix">{props.directory.title.substr(3)}</span> </div>)

const navStyle = (props) => (props.showNav ? {
  display: 'flex',
  flexDirection: 'column'
} : {});

const showIfNav = (props) => (props.showNav ? {
  display: 'block',
} : {});

export default (props) => (<div>
    <div className="Header dark">
      <div className="Header__title">
        <h1 className="Header__titleInner">
          <span className="Header__hamburger ifMedium">
            <img src={hamburger} onClick={() => Actions.navState.toggleNav()}/>
          </span>
          <span className="Header__homeLink" onClick={() => Actions.goHome()}>
            <img src={homeIcon} className="ifNotMedium"/>
            <img src={homeIconSm} className="ifMedium"/>
          </span>
          {props.authlevel >= 100 && (<span className="Header__authLink link" onClick={() => Actions.goAdmin()}>
            Administer</span> ) }&nbsp;
          <span className="ifNotSmall">Wonderland Labs.com</span>
          <span className="ifSmall">WLL</span>
        </h1>
      </div>
      <div className="Header__user">
        <User />
      </div>
    </div>
    <div className="HeaderDirNav dark" style={navStyle(props)}>
      <div className="HeaderDirNav__close ifMedium" style={showIfNav(props)} onClick={() => Actions.goHome()}>
        <img src={homeIconSm}/> Home {props.currentDir}
      </div>
      {_(props.directories).sortBy('sequence').filter('published').map((directory, i) => <HeaderDirNav
        active={directory.directory === props.currentDir}
        key={`${directory}_${i}`} directory={directory}/>).reverse().value()}
      <div className="HeaderDirNav__close ifMedium" style={showIfNav(props)} onClick={() => Actions.hideNav()}>
        Close
      </div>
    </div>
  </div>
);
