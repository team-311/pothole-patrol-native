import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import {Button} from 'react-native'

export default class FormExample extends Component {
  constructor(){
    super()
    this.state = {
      streetAddress: '',
      zipcode: ''
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Street Address" />
            </Item>
            <Item last>
              <Input placeholder="Zipcode" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
