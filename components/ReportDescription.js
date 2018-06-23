import React, {Component} from 'react'
import { StyleSheet, View, Image } from 'react-native'
import ReportForm from './ReportForm'
import { connect } from 'react-redux'
import { createPostReportThunk } from '../store/report';

class ReportDescription extends Component {
  static navigationOptions = {title: 'Add Details'}
  render () {
    return (
      <View style={styles.container}>
        { !!this.props.report.image && <Image
          style={{width: 100, height: 100}}
          source={{uri: this.props.report.image}}
        />}
        <ReportForm navigation={this.props.navigation} report={this.props.report} handleSubmit={this.props.submitReport}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'white',
  }
})

const mapStateToProps = (state) => {
  return {
    report: state.report,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitReport(report) {
      dispatch(createPostReportThunk(report))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDescription)
