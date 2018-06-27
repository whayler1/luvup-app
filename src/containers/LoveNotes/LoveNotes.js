import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Template from './LoveNotes.template';
import { getReceivedLoveNotes as getReceivedLoveNotesAction } from '../../redux/loveNote/loveNote.actions';

class LoveNotes extends PureComponent {
  static propTypes = {
    isGetReceivedLoveNotesInFlight: PropTypes.bool.isRequired,
    getReceivedLoveNotesError: PropTypes.string.isRequired,
    receivedLoveNoteCount: PropTypes.number.isRequired,
    receivedLoveNotes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      numLuvups: PropTypes.number,
      numJalapenos: PropTypes.number,
    })).isRequired,
  };

  constructor(props) {
    super(props);
    props.getReceivedLoveNotes({
      isRead: null,
      limit: 10,
      offset: 0,
    });
  }

  render() {
    return (
      <Template {...this.props} />
    );
  }
};

export default connect(
  state => ({
    ..._.pick(state.loveNote, [
      'isGetReceivedLoveNotesInFlight',
      'getReceivedLoveNotesError',
      'receivedLoveNoteCount',
      'receivedLoveNotes',
    ]),
  }),
  {
    getReceivedLoveNotes: getReceivedLoveNotesAction,
  },
)(LoveNotes);
