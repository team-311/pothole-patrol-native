import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store'
import { StyleSheet, ImageBackground, Image, Dimensions } from 'react-native'
import { Container, View, Text, Button, Icon } from 'native-base'


const ScreenHeight = Dimensions.get('window').height;

export const LandingPage = (props) => {
  return (
    <Container >
      <View >
        <ImageBackground source={require('../../customStyling/landing-page2.jpg')} style={styles.image}>
          <Button block style={styles.button} onPress={() => props.navigation.navigate('Home')}>
            <Text>Home</Text>
          </Button>
        </ImageBackground>
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
    marginTop: 350,
    alignSelf: 'center',
    backgroundColor: '#FC4C02'
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
    height: ScreenHeight,
    width: '100%',
    marginTop: 0,
    alignSelf: 'center',
  }
})

export default LandingPage
