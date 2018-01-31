import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { getUserEvents as getUserEventsAction } from '../../redux/userEvents/userEvents.actions';

import Template from './Timeline.template';

class Timeline extends Component {
  static propTypes = {
    userEvents: PropTypes.array,
    getUserEvents: PropTypes.func.isRequired,
  };

  goToDashboard = () => Actions.dashboard();

  componentWillMount() {
    this.props.getUserEvents(100, 0);
  }

  render() {
    return <Template
      userEvents={this.props.userEvents}
      goToDashboard={this.goToDashboard}
    />;
  }
}

export default connect(
  state => ({
    userEvents: state.userEvents.rows,
  }),
  {
    getUserEvents: getUserEventsAction
  }
)(Timeline);
