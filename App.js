import React from 'react';
import * as Expo from 'expo'
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './store';
import { Icon } from 'native-base'
if (process.env.NODE_ENV !== 'production') require('./secrets');
import Main from './components/main'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
    }
  }

  componentWillMount() {
    this.loadFonts();
  }

  // Android doesn't natively have the fonts that native-base uses...
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state
    if (!isReady) return <View />
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
