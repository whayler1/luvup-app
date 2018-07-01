import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Template from './LoveNotes.template';
import {
  getReceivedLoveNotes as getReceivedLoveNotesAction,
  setLoveNotesReadWithCreatedAt as setLoveNotesReadWithCreatedAtAction,
} from '../../redux/loveNote/loveNote.actions';

const limit = 20;

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
    getReceivedLoveNotes: PropTypes.func.isRequired,
    setLoveNotesReadWithCreatedAt: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.getReceivedLoveNotes();

    this.state = {
      offset: 0,
    };
  }

  getReceivedLoveNotes = async () => {
    const {
      setLoveNotesReadWithCreatedAt,
      getReceivedLoveNotes,
    } = this.props;
    await getReceivedLoveNotes({
      isRead: null,
      limit,
      offset: 0,
    });
    const { receivedLoveNotes } = this.props;

    if (receivedLoveNotes.length > 0) {
      const { createdAt } = receivedLoveNotes[0];
      setLoveNotesReadWithCreatedAt(createdAt);
    }
  };

  appendReceivedLoveNotes = () => {
    this.props.getReceivedLoveNotes({
      isRead: null,
      limit,
      offset: this.state.offset,
      shouldAppend: true,
    });
  };

  onEndReached = () => {
    const { receivedLoveNoteCount, receivedLoveNotes } = this.props;

    if (receivedLoveNotes.length < receivedLoveNoteCount) {
      this.setState({
        offset: this.state.offset += limit,
      }, this.appendReceivedLoveNotes);
    }
  };

  render() {
    const props = {
      ...this.props,
      ..._.pick(this, [
        'onEndReached',
      ]),
    };
    return (
      <Template {...props} />
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
    setLoveNotesReadWithCreatedAt: setLoveNotesReadWithCreatedAtAction,
  },
)(LoveNotes);
