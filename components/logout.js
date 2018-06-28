import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'

class Logout extends Component {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return null // work around for completing an action in the drawer menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
