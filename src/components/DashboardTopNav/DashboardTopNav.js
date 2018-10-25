import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Template from './DashboardTopNav.template';

export default class DashboardTopNav extends Component {
  static props = {
    coinCount: PropTypes.number,
    jalapenoCount: PropTypes.number,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    relationshipScore: PropTypes.number,
    unreadReceivedLoveNoteCount: PropTypes.number,
  };

  handleScoreClick = () => Actions.timeline();
  handleInitialsClick = () => Actions.menu();
  handleRelationshipScoreClick = () => Actions.timelineRelationshipScore();

  render() {
    return (
      <Template
        onScoreClick={this.handleScoreClick}
        onInitialsClick={this.handleInitialsClick}
        onRelationshipScoreClick={this.handleRelationshipScoreClick}
        unreadReceivedLoveNoteCount={this.unreadReceivedLoveNoteCount}
        {...this.props}
      />
    );
  }
}
