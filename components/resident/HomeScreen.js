import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import { View, Text, Button, Content } from 'native-base'


const ScreenHeight = Dimensions.get('window').height;


export default class HomeScreen extends React.Component {

  static navigationOptions = { title: 'HOME' }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        <ImageBackground source={require('../../customStyling/home5.jpg')} style={styles.image} >
          <Button block style={styles.button} onPress={() => navigate('ReportPothole')}>
            <Text >Report a Pothole</Text>
          </Button>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    marginTop: 380,
    alignSelf: 'center',
    backgroundColor: '#FC4C02',
    color: 'white'
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
  },
  text: {
    color: 'white'
  }
})
