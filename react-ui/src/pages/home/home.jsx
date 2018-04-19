import React, { Component } from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PostMiniature from './post_miniature';
import ChatWindow from '../../components/chat_window';
const style = require('./index.js').default;

class Home extends Component {
  constructor() {
    super();

    this.state = {
      posts: [{
        id: 1,
        name: "Lorem ipsum dolor sit ame",
        description: "consectetur adipiscing elit",
        content: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }, {
        id: 2,
        name: "Lorem ipsum dolor sit ame",
        description: "consectetur adipiscing elit",
        content: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }, {
        id: 3,
        name: "Lorem ipsum dolor sit ame",
        description: "consectetur adipiscing elit",
        content: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }, {
        id: 4,
        name: "Lorem ipsum dolor sit ame",
        description: "consectetur adipiscing elit",
        content: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }, {
        id: 5,
        name: "Lorem ipsum dolor sit ame",
        description: "consectetur adipiscing elit",
        content: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }]
    }
  }

  componentWillMount() {
    // on fera notre dispatch() ici
  }

  componentWillReceiveProps(nextProps) {
  }

  _renderPosts(posts, history) {
    if (!posts || posts.length === 0) {
      return (
        <div> no posts founds </div>
      )
    }
    const children = posts.map((post, index) => {
      return (
        <PostMiniature
          post={post}
          handleViewPress={this._handlePostView.bind(this, post.id, history)}
          key={`PostMiniature_${index}`}
        />
      )
    })
    return children;
  }

  _handlePostView(postId, history) {
    console.log("redirect à l'event : " + postId);

    history.push(`/post/${postId}`);
  }

  render() {
    
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="EpiBlog"
            />
            <Card>
              <CardTitle
                title="Epi Blog"
                subtitle="Liste des posts, enjoy!"
                style={style.headers}
              />
              <CardMedia style={style.inputStyle}>
                {this._renderPosts(this.state.posts, this.props.history)}
              </CardMedia>
            </Card>
          </div>
          <ChatWindow/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Home;
