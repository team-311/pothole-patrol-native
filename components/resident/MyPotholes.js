import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { createGetResidentReportsThunk } from '../../store/resident-reports';
import { Container, ListItem, List, Text, Content, H3 } from 'native-base';

class MyPotholes extends React.Component {
  componentDidMount() {
    this.props.getReports(this.props.user.id);
  }

  render() {
    const navigate = this.props.navigate || this.props.navigation.navigate
    const { user, openPotholes } = this.props;
    return (
      <View>
        <View>
          {openPotholes && openPotholes.length > 0 ? (
            <View>
              <H3>Your Reported Potholes:</H3>
              <List>
                {openPotholes.map(pothole => (
                  <ListItem key={pothole.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate('ViewSinglePothole', {
                          id: pothole.id,
                          canUpvote: false,
                        })
                      }
                    >
                      <Text>
                        {pothole.streetAddress} -- {pothole.status}
                      </Text>
                    </TouchableOpacity>
                  </ListItem>
                ))}
              </List>
            </View>
          ) : (
              <Text>Let's get patrolling!...</Text>
            )}
        </View>
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
    resizeMode: Image.resizeMode.contain,
  },
  openPotholes: {
    margin: 20,
    width: 250,
    height: 100,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    openPotholes: state.residentReports.potholes.filter(
      report => report.status.toLowerCase() === 'open'
    ),
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReports: id => dispatch(createGetResidentReportsThunk(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPotholes);
