import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';



export default class IndividualPothole extends React.Component {
  static navigationOptions = { title: 'Potholes' }
  render() {
    const { navigate } = this.props.navigation
    //const pothole = this.props.selectedPothole
    return (
      <View style={styles.container}>
        <Text>pothole.id, pothole.status</Text>
        <Text>Map Here</Text>
        <Text>pothole.address</Text>
        <Text>pothole.upvotes</Text>
        <Text>pothole.description</Text>
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
  button: {
    backgroundColor: '#B3DDF2',
    width: 200,
    height: 93,
    resizeMode: Image.resizeMode.contain
  }
});

// const mapDispatch = (dispatch) => {
//   return {
//     selectedPothole: () => dispatch(getSelectedPothole())
//   }
// }

// export default connect(null, mapDispatch)(IndividualPothole)
