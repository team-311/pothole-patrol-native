import React from 'react';
import { StyleSheet, Dimensions, Image, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createNewCommentThunk } from '../store/comments';
import {
  Form,
  Item,
  Content,
  Label,
  Button,
  Textarea,
  Text
} from 'native-base';

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      commentText: ''
    }
  }


  handleSubmit = async () => {
    this.props.postComment({
      text: this.state.commentText,
      userId: this.props.user.id,
      potholeId: this.props.pothole.id
    }).then(() => {
      this.setState({
        commentText: ''
      })
    })
  }

  render() {
    return (
      <Content>
        <Form>
          <Textarea rowSpan={5} bordered placeholder="Leave Comment Here"
            onChangeText={(text) => this.setState({ commentText: text })}
            value={this.state.commentText}
          />
        </Form>
        <Button block onPress={this.handleSubmit}><Text>Submit</Text></Button>
      </Content>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    postComment: comment => dispatch(createNewCommentThunk(comment)),
  };
};

export default connect(
  null,
  mapDispatch
)(Comments);
