import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'
import { Text } from 'react-native'
import { Container, Button, Header, Content } from 'native-base'

const Settings = (props) => {
  return (
    <Container>
      <Header />
      <Content>
        <Button block bordered danger onPress={props.logout}>
          <Text>Log out</Text>
        </Button>
      </Content>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(Settings)
