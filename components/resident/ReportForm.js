import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Container, Content, Form, Textarea, Picker, Button, Icon } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation'

export default class ReportForm extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      placement: '',
      anonymous: false,
    };
  }

  handleSubmit = async () => {
    await this.props.handleSubmit({ ...this.props.report, ...this.state })
    const action = StackActions.reset({
      index: 0,
      key: null,
    })
    this.props.navigation.navigate('LandingPage')
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <View style={styles.formGroup}>
              <Textarea style={styles.description}
                rowSpan={5}
                placeholder='Provide additional information (if necessary)'
                bordered
                onChangeText={text => this.setState({ description: text })}
                maxLength={500}
                value={this.state.description}
                autoFocus
              />
            </View>
            <View style={styles.formGroup}>
              <Picker
                mode="dropdown"
                placeholder="Select pothole location"
                placeholderStyle={{ color: "lightgray" }}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.placement}
                onValueChange={text => this.setState({ placement: text })}
              >
                <Picker.Item label="Bike Lane" value="Bike Lane" />
                <Picker.Item label="Crosswalk" value="Crosswalk" />
                <Picker.Item label="Curb Lane" value="Curb Lane" />
                <Picker.Item label="Intersection" value="Intersection" />
                <Picker.Item label="Traffic Lane" value="Traffic Lane" />
              </Picker>
            </View>
            <View style={styles.userDetails}>
              <Switch
                onValueChange={value => this.setState({ anonymous: value })}
                value={this.state.anonymous}
              />
              <Text style={{ marginLeft: 10 }}>Remain Anonymous?</Text>
            </View>
            <Button style={styles.button}
              primary
              block
              disabled={!this.state.placement}
              onPress={this.handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginTop: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
