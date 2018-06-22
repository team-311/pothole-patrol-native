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
  Card,
  CardItem
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

    return (
      <Container>
        <Card>
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
        </Card>
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
