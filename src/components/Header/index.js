import React from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';

const Header = () => (
  <header id="header"> 
    <a href="header" id="logo">
      <img src={logoImg} alt="forFPS logo"/>
    </a>
  </header>
);

export default Header;