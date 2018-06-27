import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { createGetResidentReportsThunk } from '../../store/resident-reports';
import { Container, ListItem, Header, List, Card, CardItem, Body, Text } from 'native-base';


class MyPotholes extends React.Component {

  componentDidMount() {
    this.props.getReports(this.props.user.id)
  }

  render() {
    const navigate = this.props.navigate
    const { user, openPotholes } = this.props
    return (
      <View >
        {
          (openPotholes && openPotholes.length > 0) && (
            <View >
              <Text >Your Reported Potholes:</Text>
              <List >
                {
                  openPotholes.map(pothole =>
                    <ListItem key={pothole.id} >
                      <TouchableOpacity onPress={() => navigate('ViewSinglePothole', { id: pothole.id, canUpvote: false })}>
                        <Text>
                          {pothole.status} -- {pothole.streetAddress}
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  )
                }
              </List>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#B3DDF2',
    width: 200,
    height: 93,
    resizeMode: Image.resizeMode.contain
  },
  openPotholes: {
    margin: 20,
    width: 250,
    height: 100
  }
});

const mapStateToProps = (state) => {
  return {
    openPotholes: state.residentReports.potholes.filter(report => report.status.toLowerCase() === 'open'),
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: (id) => dispatch(createGetResidentReportsThunk(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPotholes)
