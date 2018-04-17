import React, { Component } from 'react';
import logo from '../../logo.svg';
import './post_detail.css';

class PostDetail extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DETAILS POST</h1>
        </header>
        <p className="App-intro">
            ici on va faire la page de details des posts
        </p>
      </div>
    );
  }
}

export default PostDetail;