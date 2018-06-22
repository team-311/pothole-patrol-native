import React, { Component } from 'react';
// import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
// import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';

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
    console.log('address', this.props.address)
    const streetAddress = this.props.address.slice(0,2).join(' ')
    const zipcode = this.props.address[4]
    return (
    //   <Container>
    //   <Header />
    //     <Form>
    //       <Item>
    //         <Input placeholder="Username" />
    //       </Item>
    //       <Item last>
    //         <Input placeholder="Password" />
    //       </Item>
    //     </Form>
    // </Container>

      <View style={styles.formView}>
        <TextInput
          placeholder="Street Address"
          defaultValue={`${streetAddress}`}
          onChangeText={text => {
            this.setState({ streetAddress: text });
          }}
        />
        <TextInput
          placeholder="Zipcode"
          defaultValue={`${zipcode}`}
          onChangeText={text => this.setState({ zipCode: text })}
        />
        <Button
        title="Submit"
        onPress={this.submitAddress} />
      </View>
    );
  }
}

