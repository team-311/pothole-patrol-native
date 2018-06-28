import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'
import { auth } from '../store'
import { connect } from 'react-redux'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                autoFocus
                autoCapitalize='none'
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}/>
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}/>
            </Item>
            { this.state.error &&
              <Item>
                <Text style={styles.error}>Incorrect username or password</Text>
              </Item>
            }
            <Button primary block onPress={() => {
              this.props.handleSubmit(this.state.username, this.state.password, 'login')
                .then((res) => {
                  if(res.error) this.setState({error: res.error})
                }).catch((error) => console.error(error))
            }}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = {
  buttonText: {
    color: 'white'
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    margin: 20,
    padding: 10,
    flex: 1,
    borderRadius: 3,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(username, password, method) {
      return dispatch(auth(username, password, method))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
