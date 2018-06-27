import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import ReportForm from './ReportForm'
import { connect } from 'react-redux'
import { createPostReportThunk } from '../../store/report';
import { Container, Content } from 'native-base'

class ReportDescription extends Component {
  static navigationOptions = { title: 'Add Details' }
  render() {
    return (

      <Container style={styles.container}>
        <Content>
          {!!this.props.report.imageUrl && <View style={styles.thumbnail}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: this.props.report.imageUrl }}
            />
          </View>}
          <ReportForm navigation={this.props.navigation} report={this.props.report} handleSubmit={this.props.submitReport} />
        </Content>
      </Container>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10
  },
  thumbnail: {
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
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
