import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Vibration, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { createLoveNote as createLoveNoteAction } from '../../redux/loveNote/loveNote.actions';
import Template from './CreateLoveNote.template';

const getLoveNotePlaceholder = (loverFirstName) => {
  const placeholders = [
    `Send ${ loverFirstName } a nice message, like "Hey boo, I need them Luvups"`,
    `Share your feelings with ${ loverFirstName }…`,
    `Maybe ${ loverFirstName } just needs a little nudge to get the message accross?`,
    `Tell ${ loverFirstName } what's on your mind…`,
    `Don't be afraid to open up to ${ loverFirstName }…`,
    'It all starts with communication…',
  ];

  return placeholders[Math.floor(Math.random() * placeholders.length)];
}

const maxTokens = 5;

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
      isSending: false,
      isSuccess: false,
      isSendError: false,
      isNoteEmpty: false,
      placeholder: getLoveNotePlaceholder(props.loverFirstName),
    };
  }

  onNoteChange = note => this.setState({
    note,
    isNoteEmpty: false,
  });

  addToken = (key) => {
    const { state } = this;
    if (!state.isSending) {
      let n;
      if (state[key] + 1 > maxTokens) {
        Vibration.vibrate();
        n = maxTokens;
      } else {
        n = state[key] + 1;
      }
      this.setState({ [key]: n });
    }
  };

  removeToken = (key) => {
    const { state } = this;
    if (!state.isSending) {
      const n = state[key] - 1 > -1 ? state[key] - 1 : 0;
      this.setState({ [key]: n });
    }
  }

  addLuvup = () => this.addToken('numLuvups');
  removeLuvup = () => this.removeToken('numLuvups');
  addJalapeno = () => this.addToken('numJalapenos');
  removeJalapeno = () => this.removeToken('numJalapenos');

  mainUiY = new Animated.Value(0);
  mainUiOpacity = new Animated.Value(1);
  flyingNoteX = new Animated.Value(-150);
  flyingNoteOpacity = new Animated.Value(0);

  showFlyingNote = () => {
    Animated.parallel([
      Animated.spring(
        this.flyingNoteX,
        {
          toValue: 0,
          delay: 250,
          friction: 5,
          tension: 20,
        },
      ),
      Animated.timing(
        this.flyingNoteOpacity,
        {
          toValue: 1,
          duration: 100,
          delay: 250,
          easing: Easing.inOut(Easing.linear),
        },
      ),
    ]).start();
  }

  hideContent = () => {
    Animated.parallel([
      Animated.timing(
        this.mainUiY,
        {
          toValue: 500,
          duration: 250,
          easing: Easing.inOut(Easing.linear)
        },
      ),
      Animated.timing(
        this.mainUiOpacity,
        {
          toValue: 0,
          duration: 250,
          easing: Easing.inOut(Easing.linear)
        },
      ),
    ]).start();
  }

  onSendClick = async () => {
    const isValid = this.validate();

    if (isValid) {
      const { note, numLuvups, numJalapenos } = this.state;
      this.setState({ isSending: true, isSendError: false }, () => {
        this.hideContent();
        this.showFlyingNote();
      });

      const res = await this.props.createLoveNote(note, { numLuvups, numJalapenos });
      const loveNoteId = _.get(res, 'body.data.createLoveNote.loveNote.id');

      if (!loveNoteId) {
        this.setState({
          isSending: false,
          isSendError: true,
        })
      } else {
        this.setState({
          isSuccess: true,
          isSending: false,
          isSendError: false,
        });
      }
    }
  };

  validate = () => {
    const errorObj = {
      isNoteEmpty: false,
    };
    let isValid = true;

    if (this.state.note.length < 1) {
      errorObj.isNoteEmpty = true;
      isValid = false;
    }

    this.setState(errorObj);
    return isValid;
  };

  back = () => Actions.pop();

  render() {
    const props = {
      ...this.state,
      ..._.pick(this, [
        'onNoteChange',
        'addLuvup',
        'removeLuvup',
        'addJalapeno',
        'removeJalapeno',
        'onSendClick',
        'back',
        'mainUiY',
        'mainUiOpacity',
        'flyingNoteX',
        'flyingNoteOpacity',
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
