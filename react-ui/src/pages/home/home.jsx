import React, { Component } from 'react';
import logo from '../../logo.svg';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Page d'acceuil</h1>
        </header>
        <p className="App-intro">
          Page principale du projet
        </p>
      </div>
    );
  }
}

export default Home;