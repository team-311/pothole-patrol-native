import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
} from 'native-base';
import { Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;

export default class ConfirmAddress extends Component {
  constructor() {
    super();
    this.state = {
      streetAddress: '',
      zipcode: '',
    };
  }

  submitAddress = () => {
    console.log('thanks for submitting your address!');
  };

  render() {
    const streetAddress = this.props.address.slice(0, 2).join(' ');
    const zipcode = this.props.address[4];

    return (
      <Container>
        <Form>
          <Item>
            <Input
              placeholder="Street Address"
              defaultValue={`${streetAddress}`}
              onChangeText={text => {
                this.setState({ streetAddress: text });
              }}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Zipcode"
              defaultValue={`${zipcode}`}
              onChangeText={text => this.setState({ zipCode: text })}
            />
          </Item>
          <Button primary onPress={this.submitAddress}><Text> Primary </Text></Button>
        </Form>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     top: 100
//   },
//   button: {
//     top: 150
//   }
// })
