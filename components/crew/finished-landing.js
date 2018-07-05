import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store'
import { StyleSheet, Linking } from 'react-native'
import { Container, View, Text, Button, H2, Icon } from 'native-base'

const FinishedLanding = (props) => {
  return (
    <Container style={styles.container}>
      <View style={styles.flex}>
        <Icon type="Feather" name="check-circle" style={styles.icon}/>
        <H2>Thank you!</H2>
        <Text style={styles.message}>Your assignment details were successfully submitted. If you have any questions, please contact <Text style={styles.phone} onPress={() => Linking.openURL(`tel:555-123-5432`).catch(console.log)}>CDOT</Text>.</Text>
        <Button block style={styles.button} onPress={() => props.navigation.navigate('OrderHistory')}>
            <Text style={styles.buttonText}>View All Assignments</Text>
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
    backgroundColor: "#FC4C02",
  },
  buttonText: {
    fontWeight: 'bold',
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
    color: '#36454f',
    fontSize: 100,
  },
  phone: {
    color: '#36454f',
    textDecorationLine: 'underline',
  }
})

export default FinishedLanding
