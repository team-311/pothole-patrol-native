import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  Switch,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

export default class ReportDescription extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      placement: '',
      anonymous: false,
    };
  }

  handleSubmit = () => {
    // replace with thunk call to API server once the store is setup for singlePothole
    // console.log('Form submitted', this.state)
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.description}
          autoFocus
          multiline
          placeholder="Enter pothole description"
          maxLength={500}
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
        />
        <Text>Where is the pothole located?</Text>
        <Picker
          selectedValue={this.state.placement}
          onValueChange={itemValue => this.setState({ placement: itemValue })}
          mode="dropdown"
          prompt="Where is the pothole located?"
        >
          <Picker.Item label="--Select an option--" value="" />
          <Picker.Item label="Bike Lane" value="Bike Lane" />
          <Picker.Item label="Crosswalk" value="Crosswalk" />
          <Picker.Item label="Curb Lane" value="Curb Lane" />
          <Picker.Item label="Intersection" value="Intersection" />
          <Picker.Item label="Traffic Lane" value="Traffic Lane" />
        </Picker>
        <View style={styles.switchGroup}>
          <Switch
            onValueChange={value => this.setState({ anonymous: value })}
            value={this.state.anonymous}
          />
          <Text style={{ marginLeft: 10 }}>Remain Anonymous?</Text>
        </View>
        <TouchableHighlight
          style={styles.button}
          accessibilityLabel="Submit pothole service request"
          onPress={this.handleSubmit}
          disabled={!this.state.placement}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 2,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#B3DDF2',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  switchGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
});
