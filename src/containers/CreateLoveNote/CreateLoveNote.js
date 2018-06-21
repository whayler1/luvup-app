import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Vibration } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { createLoveNote as createLoveNoteAction } from '../../redux/loveNote/loveNote.actions';
import Template from './CreateLoveNote.template';

const getLoveNotePlaceholder = (loverFirstName) => {
  const placeholders = [
    `Share your feelings with ${ loverFirstName }…`,
    `Maybe ${ loverFirstName } just needs a little nudge to get the message accross?`,
    `Tell ${ loverFirstName } what's on your mind…`,
    `Don't be afraid to open up to ${ loverFirstName }…`,
    `It all starts with communication…`,
  ];

  return placeholders[Math.floor(Math.random() * placeholders.length)];
}

const maxTokens = 5;
const addToken = (state, key) => {
  if (state[key] + 1 > maxTokens) {
    Vibration.vibrate();
    return maxTokens;
  } else {
    return state[key] + 1;
  }
};
const removeToken = (state, key) => state[key] - 1 > -1 ? state[key] - 1 : 0;

class CreateLoveNote extends PureComponent {
  static propTypes = {
    loverFirstName: PropTypes.string.isRequired,
    createLoveNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      note: '',
      numLuvups: 0,
      numJalapenos: 0,
      placeholder: getLoveNotePlaceholder(props.loverFirstName),
    };
  }

  onNoteChange = note => this.setState({ note });
  addLuvup = () => this.setState({ numLuvups: addToken(this.state, 'numLuvups') });
  removeLuvup = () => this.setState({ numLuvups: removeToken(this.state, 'numLuvups') });
  addJalapeno = () => this.setState({ numJalapenos: addToken(this.state, 'numJalapenos') });
  removeJalapeno = () => this.setState({ numJalapenos: removeToken(this.state, 'numJalapenos') });

  render() {
    const props = {
      ...this.state,
      ..._.pick(this, [
        'onNoteChange',
        'addLuvup',
        'removeLuvup',
        'addJalapeno',
        'removeJalapeno',
      ]),
    }
    return (
      <Template {...props} />
    );
  }
}

export default connect(
  state => ({
    loverFirstName: state.lover.firstName,
  }),
  {
    createLoveNote: createLoveNoteAction,
  },
)(CreateLoveNote);
