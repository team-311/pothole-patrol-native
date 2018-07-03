import React, { Component } from 'react'
import { Text, ImageBackground, View, Image, StyleSheet, Dimensions } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'
import { auth } from '../store'
import { connect } from 'react-redux'

const ScreenHeight = Dimensions.get('window').height;

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: '',
      isVisible: true
    }
  }

  // hideSplashScreen = () => {
  //   this.setState({
  //     isVisible: false
  //   })
  // }

  // componentDidMount() {
  //   var that = this
  //   setTimeout(function () {
  //     that.hideSplashScreen()
  //   }, 3000)
  // }

  render() {
    // let splashScreen = (
    //   <View>
    //     <ImageBackground source={require('../customStyling/splash-screen.jpg')} style={styles.image}>
    //     </ImageBackground>
    //   </View>
    // )
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content style={styles.container}>
          <Image source={require('../customStyling/logo5.jpg')} style={styles.image} />
          <View >
            <Form>
              <Item stackedLabel>
                <Label>Username</Label>
                <Input
                  autoFocus
                  autoCapitalize='none'
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })} />
              </Item>
              <Item stackedLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })} />
              </Item>
              {!!this.state.error &&
                <Item>
                  <Text style={styles.error}>Incorrect username or password</Text>
                </Item>
              }
              <Button primary block style={styles.button} onPress={() => {
                this.props.handleSubmit(this.state.username, this.state.password, 'login')
                  .then((res) => {
                    if (res.error) this.setState({ error: res.error })
                  }).catch((error) => console.error(error))
              }}>
                <Text style={styles.text}>Login</Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#FC4C02',
    //color: 'white'
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  message: {
    color: 'gray',
    margin: 10,
    textAlign: 'center',
  },
  image: {
    //height: ScreenHeight,
    //width: '10%',
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    color: 'white'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(username, password, method) {
      return dispatch(auth(username, password, method))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
