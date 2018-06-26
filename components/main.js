import React, { Component } from 'react';
import { View } from 'react-native';
import { createRootNavigator } from './router'
import { connect } from 'react-redux';
import { me } from '../store'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      checkSignedIn: false,
    };
  }

  componentDidMount() {
    this.props.loadInitialData()
      .then(() => this.setState({checkSignedIn: true}))
  }

  render() {
    const { checkSignedIn } = this.state
    if (!checkSignedIn) return <View />
    const userType = this.props.user.id ? this.props.user.type : null
    const RootNav = createRootNavigator(this.props.isLoggedIn, userType)

    return (
      <RootNav />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      return dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
