import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'
import { Text } from 'react-native'
import { Container, Button, Header, Content, H1 } from 'native-base'

const Settings = (props) => {
  return (
    <Container>
      <Header style={{justifyContent: 'flex-start'}}>
        <H1>User Settings</H1>
      </Header>
      <Content style={{backgroundColor: 'white'}}>
        <Button block danger style={{width: '80%', marginTop: 40, alignSelf: 'center'}}onPress={props.logout}>
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
