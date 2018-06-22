import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

export default class FormExample extends Component {
  constructor(){
    super()
    this.state = {
      streetAddress: '',
      zipcode: ''
    }
  }

  submitAddress = () => {
    console.log('thanks for submitting your address!')
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
              placeholder="Street Address"
              onChangeText={(text) => this.setState({streetAddress: text})}
              />
            </Item>
            <Item last>
              <Input
              placeholder="Zipcode"
              onChangeText={(text) => this.setState({zipCode: text})}
              />
            </Item>
            <Button onPress={this.submitAddress} primary><Text> Primary </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
