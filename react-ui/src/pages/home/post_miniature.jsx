import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class PostMiniature extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const post = this.props.post;
        return (
            <Card style={{margin: "10px"}}>
                <CardTitle
                    title={post.name}
                    subtitle={post.description}
                />
                <CardText>
                    {post.content}
                </CardText>
                <CardActions >
                    <RaisedButton label="View" primary={true} onClick={this.props.handleViewPress.bind(this, post.id)}/>
                </CardActions>
            </Card>
        );
    }
}

export default PostMiniature;