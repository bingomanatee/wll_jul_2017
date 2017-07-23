import './Header.css';
import React from 'react';
import User from '../User/User';
import pathToInitial from './../../utils/pathToInitial';
import homeIcon from './img/homeIcon.svg';
import homeIconSm from './img/homeIcoSm.svg';
import hamburger from './img/Hamburger.svg';
import {Actions, Goto} from 'jumpsuit';

const HeaderDirNav = (props) => (<div className="HeaderDirNav__item"
>{pathToInitial(props.directory)}<span className="pathSuffix">{pathToInitial(props.directory, true)}</span></div>)

const navStyle = (props) => (props.showNav ? {
  display: 'flex',
  flexDirection: 'column'
}: {});

const showIfNav = (props) => (props.showNav ? {
  display: 'block',
}: {});

const goHome = () => Goto({path: '/'});

export default (props) => (<div>
    <div className="Header dark">
      <div className="Header__title">
        <h1 className="Header__titleInner">
          <span className="Header__hamburger ifMedium">
            <img src={hamburger} onClick={() => Actions.toggleNav()} />
          </span>
          <span className="Header__homeLink" onClick={goHome}>
            <img src={homeIcon} className="ifNotMedium"/>
            <img src={homeIconSm} className="ifMedium" />
          </span>
          <span className="ifNotSmall">Wonderland Labs.com</span>
          <span className="ifSmall">WLL</span>
          {props.showNav ? 'nav' : 'no nav'}
          </h1>
      </div>
      <div className="Header__user">
        <User />
      </div>
    </div>
    <div className="HeaderDirNav dark" style={navStyle(props)}>
      {props.directories.map((directory, i) => <HeaderDirNav key={`${directory}_${i}`} directory={directory} />)}
      <div className="HeaderDirNav__close ifMedium" style={showIfNav(props)} onClick={() => Actions.hideNav()}>
        Close
      </div>
    </div>
  </div>
);
