import React from 'react';
import { StyleSheet, Dimensions, Image, View, Alert, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { createNewCommentThunk } from '../store/comments';
import {
  Form,
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
      this.props.getComments(this.props.pothole.id)
      this.setState({
        commentText: ''
      })
    })
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <Form>
          <Textarea rowSpan={5} bordered placeholder="Leave Comment Here"
            onChangeText={(text) => this.setState({ commentText: text })}
            value={this.state.commentText}
          />
        </Form>
        <Button style={{width: '90%', alignSelf: 'center'}} block onPress={this.handleSubmit}><Text>Submit</Text></Button>
      </KeyboardAvoidingView>
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
