import React, {Component} from 'react'
import { StyleSheet, View } from 'react-native'
import ReportForm from './ReportForm'

export default class ReportDescription extends Component {
  static navigationOptions = {title: 'Add Details'}
  render () {
    return (
      <View style={styles.container}>
        <ReportForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  }
})
