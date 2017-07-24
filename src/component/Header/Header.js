import './Header.css';
import React from 'react';
import User from '../User/User';
import pathToInitial from './../../utils/pathToInitial';
import homeIcon from './img/homeIcon.svg';
import homeIconSm from './img/homeIcoSm.svg';
import hamburger from './img/Hamburger.svg';
import {Actions, Goto} from 'jumpsuit';
import cleanDirectory from '../../utils/cleanDirectory';

const HeaderDirNav = (props) => (<div className={`HeaderDirNav__item ${props.active? 'HeaderDirNav__item-active': ''}`} onClick={() => Actions.goDirectory(props.directory)}
>{pathToInitial(props.directory)}<span className="pathSuffix">{pathToInitial(props.directory, true)}</span></div>)

const navStyle = (props) => (props.showNav ? {
  display: 'flex',
  flexDirection: 'column'
}: {});

const showIfNav = (props) => (props.showNav ? {
  display: 'block',
}: {});

export default (props) => (<div>
    <div className="Header dark">
      <div className="Header__title">
        <h1 className="Header__titleInner">
          <span className="Header__hamburger ifMedium">
            <img src={hamburger} onClick={() => Actions.toggleNav()} />
          </span>
          <span className="Header__homeLink" onClick={() => Actions.goHome()}>
            <img src={homeIcon} className="ifNotMedium"/>
            <img src={homeIconSm} className="ifMedium" />
          </span>
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
        <img src={homeIconSm} />   Home
      </div>
      {props.directories.map((directory, i) => <HeaderDirNav active={cleanDirectory(directory) === cleanDirectory(props.currentDir)}
                                                             key={`${directory}_${i}`} directory={directory} />)}
      <div className="HeaderDirNav__close ifMedium" style={showIfNav(props)} onClick={() => Actions.hideNav()}>
        Close
      </div>
    </div>
  </div>
);
