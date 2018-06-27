import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base'
import { connect } from 'react-redux'

class Home extends Component {
  static navigationOptions = { title: 'Home' }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>{`Welcome, ${this.props.user.firstName}!`}</Text>
        <Button block primary onPress={() => navigate('SingleOrder')}>
          <Text>View Today's Order</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Home)
