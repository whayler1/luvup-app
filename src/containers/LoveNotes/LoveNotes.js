import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Template from './LoveNotes.template';
import { getReceivedLoveNotes as getReceivedLoveNotesAction } from '../../redux/loveNote/loveNote.actions';

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
  };

  constructor(props) {
    super(props);
    props.getReceivedLoveNotes({
      isRead: null,
      limit,
      offset: 0,
    });

    this.state = {
      offset: 0,
    };
  }

  appendReceivedLoveNotes = () => {
    this.props.getReceivedLoveNotes({
      isRead: null,
      limit,
      offset: this.state.offset,
      shouldAppend: true,
    });
  };

  onEndReached = () => {
    console.log('\n\n onEndReached\n----');
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
  },
)(LoveNotes);
