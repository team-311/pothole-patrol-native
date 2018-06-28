import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store'
import { StyleSheet } from 'react-native'
import { Container, View, Text, Button, H2, Icon } from 'native-base'

const FinishedLanding = (props) => {
  return (
    <Container style={styles.container}>
      <View style={styles.flex}>
        <Icon type="Feather" name="check-circle" style={styles.icon}/>
        <H2>Thank you!</H2>
        <Text style={styles.message}>Your work order has been successfully submitted. If you have any questions, please contact 555-123-5432.</Text>
        <Button block danger style={styles.button} onPress={props.logout}>
            <Text>Log out</Text>
        </Button>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    marginTop: 40,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  message: {
    color: 'gray',
    margin: 10,
    textAlign: 'center',
  },
  icon: {
    margin: 30,
    color: 'green',
    fontSize: 100,
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(FinishedLanding)
