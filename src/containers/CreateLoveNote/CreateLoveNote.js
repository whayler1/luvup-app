import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  addLuvup = () => this.setState({ numLuvups: this.state.numLuvups + 1 });
  removeLuvup = () => this.setState({ numLuvups: this.state.numLuvups - 1 });
  addJalapeno = () => this.setState({ numLuvups: this.state.numJalapenos + 1 });
  removeJalapeno = () => this.setState({ numLuvups: this.state.numJalapenos - 1 });

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
