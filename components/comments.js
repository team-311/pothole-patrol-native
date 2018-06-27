import React from 'react';
import { StyleSheet, Dimensions, Image, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createGetCommentsThunk } from '../store/comments';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
} from 'native-base';

class Comments extends React.Component {

  async componentDidMount() {
    await this.props.getAllComments(this.props.potholeId);
  }

  render() {
    const commentList = this.props.allComments;
    console.log('comment list: ', commentList)
    if (!commentList) return (<View><Text>No Comments</Text></View>);
    return (
      <Content>
        {commentList.map(comment => (
          <Card key={comment.id}>
            <CardItem >
              <Body>
                <Text>{comment.text}</Text>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
                <Text>By: {comment.user.firstName}</Text>
              </Body>
            </CardItem>
          </Card>
        ))
        }
      </Content>
    );
  }
}

const mapState = state => {
  return {
    allComments: state.comments
  };
};

const mapDispatch = dispatch => {
  return {
    getAllComments: id => dispatch(createGetCommentsThunk(id)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(Comments);
