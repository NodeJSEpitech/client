import React, { Component } from 'react';
import logo from './../../logo.svg';
import './signin.css';

class Signin extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SIGNIN</h1>
        </header>
        <p className="App-intro">
          Ici on va faire la page signin
        </p>
      </div>
    );
  }
}

export default Signin;