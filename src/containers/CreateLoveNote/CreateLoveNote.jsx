import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import {
  Vibration,
  Animated,
  Easing,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { createLoveNote as createLoveNoteAction } from '../../redux/loveNote/loveNote.actions';
import { refreshSentCoinCount as refreshSentCoinCountAction } from '../../redux/coin/coin.actions';
import { refreshSentJalapenoCount as refreshSentJalapenoCountAction } from '../../redux/jalapeno/jalapeno.actions';
import { forms, buttons, scene, vars } from '../../styles';
import Well from '../../components/Well';
import LoveNoteArtFlying from '../../components/LoveNoteArtFlying';
import LimitExceededModal, {
  MODAL_CONTENT_TYPES,
} from '../../components/LimitExceededModal';
import Button, { BUTTON_STYLES } from '../../components/Button';

const getLoveNotePlaceholder = (loverFirstName) => {
  const placeholders = [
    `Send ${loverFirstName} a nice message, like "Hey boo, I need them Luvups"`,
    `Share your feelings with ${loverFirstName}…`,
    `Maybe ${loverFirstName} just needs a little nudge to get the message accross?`,
    `Tell ${loverFirstName} what's on your mind…`,
    `Don't be afraid to open up to ${loverFirstName}…`,
    'It all starts with communication…',
  ];

  return placeholders[Math.floor(Math.random() * placeholders.length)];
};

const maxTokens = 5;

const modalCopy = (numTokens, noun) => {
  const string = `You may only send ${maxTokens} ${noun}s per hour.`;
  if (numTokens === maxTokens) {
    return string;
  }
  return `${string} That means you can only attach ${numTokens} to this love note.`;
};

const CountText = ({ n, verb }) => (
  <Text
    style={{
      fontFamily: vars.fontRegular,
      color: vars.blueGrey900,
    }}
  >
    Attach{' '}
    <Text style={{ fontFamily: vars.fontBlack, color: vars.blueGrey900 }}>
      {n > 0 ? n : ''}
    </Text>{' '}
    {verb}
    {n !== 1 ? 's' : ''}
  </Text>
);

class CreateLoveNote extends PureComponent {
  static propTypes = {
    loverFirstName: PropTypes.string.isRequired,
    createLoveNote: PropTypes.func.isRequired,
    refreshSentCoinCount: PropTypes.func.isRequired,
    refreshSentJalapenoCount: PropTypes.func.isRequired,
    /* eslint-disable-next-line react/no-unused-prop-types */
    recentlySentCoinCount: PropTypes.number.isRequired,
    /* eslint-disable-next-line react/no-unused-prop-types */
    recentlySentJalapenoCount: PropTypes.number.isRequired,
  };

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
      isModalOpen: false,
      modalContent: '',
      coinsAvailableTime: null,
      jalapenosAvailableTime: null,
    };
    props.refreshSentCoinCount();
    props.refreshSentJalapenoCount();
  }

  onNoteChange = (note) =>
    this.setState({
      note,
      isNoteEmpty: false,
    });

  openModal = (modalContent) => {
    this.setState({
      isModalOpen: true,
      modalContent,
    });
  };

  addToken = (key, recentlySentKey, modalContent) => {
    const { state } = this;
    const recentlySentCount = this.props[recentlySentKey];
    if (!state.isSending) {
      const keyPlus1 = state[key] + 1;

      if (keyPlus1 + recentlySentCount > maxTokens) {
        Vibration.vibrate();
        this.openModal(modalContent);
      } else {
        this.setState({ [key]: keyPlus1 });
      }
    }
  };

  removeToken = (key) => {
    const { state } = this;
    if (!state.isSending) {
      const n = state[key] - 1 > -1 ? state[key] - 1 : 0;
      this.setState({ [key]: n });
    }
  };

  addLuvup = () =>
    this.addToken(
      'numLuvups',
      'recentlySentCoinCount',
      MODAL_CONTENT_TYPES.COIN,
    );
  removeLuvup = () => this.removeToken('numLuvups');
  addJalapeno = () =>
    this.addToken(
      'numJalapenos',
      'recentlySentJalapenoCount',
      MODAL_CONTENT_TYPES.JALAPENO,
    );
  removeJalapeno = () => this.removeToken('numJalapenos');

  closeModal = () => this.setState({ isModalOpen: false });

  mainUiY = new Animated.Value(0);
  mainUiOpacity = new Animated.Value(1);
  flyingNoteX = new Animated.Value(-150);
  flyingNoteOpacity = new Animated.Value(0);

  showFlyingNote = () => {
    Animated.parallel([
      Animated.spring(this.flyingNoteX, {
        toValue: 0,
        delay: 250,
        friction: 5,
        tension: 20,
      }),
      Animated.timing(this.flyingNoteOpacity, {
        toValue: 1,
        duration: 100,
        delay: 250,
        easing: Easing.inOut(Easing.linear),
      }),
    ]).start();
  };

  hideContent = () => {
    Animated.parallel([
      Animated.timing(this.mainUiY, {
        toValue: 500,
        duration: 250,
        easing: Easing.inOut(Easing.linear),
      }),
      Animated.timing(this.mainUiOpacity, {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.linear),
      }),
    ]).start();
  };

  showContent = () => {
    Animated.parallel([
      Animated.timing(this.mainUiY, {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.linear),
      }),
      Animated.timing(this.mainUiOpacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.inOut(Easing.linear),
      }),
    ]).start();
  };

  onSendClick = async () => {
    const isValid = this.validate();

    if (isValid) {
      const { note, numLuvups, numJalapenos } = this.state;
      await this.setState({ isSending: true, isSendError: false });

      this.hideContent();
      this.showFlyingNote();

      const res = await this.props.createLoveNote(note, {
        numLuvups,
        numJalapenos,
      });
      const loveNoteId = _.get(res, 'createLoveNote.loveNote.id');

      if (!loveNoteId) {
        this.setState(
          {
            isSending: false,
            isSendError: true,
          },
          () => this.showContent(),
        );
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

  isRenderInFlightOrSuccess = () =>
    this.state.isSuccess || this.state.isSending;

  renderInflightOrSuccess() {
    const {
      back,
      flyingNoteX,
      flyingNoteOpacity,
      state: { isSending, isSuccess },
    } = this;
    return (
      <View
        style={{
          position: 'absolute',
          top: 42,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            opacity: flyingNoteOpacity,
            transform: [{ translateX: flyingNoteX }],
          }}
        >
          <LoveNoteArtFlying />
        </Animated.View>
        {isSending && (
          <Animated.Text
            style={[scene.copy, { marginTop: 16, opacity: flyingNoteOpacity }]}
          >
            Sending…
          </Animated.Text>
        )}
        {isSuccess && (
          <>
            <Animated.Text
              style={[
                scene.copy,
                {
                  marginTop: 16,
                  fontFamily: vars.fontBlack,
                  opacity: flyingNoteOpacity,
                },
              ]}
            >
              Sent!
            </Animated.Text>
            <View
              style={{
                marginTop: 32,
                paddingHorizontal: 16,
                alignSelf: 'stretch',
              }}
            >
              <Button
                testID="create-love-note-success-close-button"
                onPress={back}
                buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                title="Close"
              />
            </View>
          </>
        )}
      </View>
    );
  }

  render() {
    const {
      onNoteChange,
      addLuvup,
      removeLuvup,
      addJalapeno,
      removeJalapeno,
      onSendClick,
      back,
      mainUiY,
      mainUiOpacity,
      closeModal,
      props: { loverFirstName },
      state: {
        note,
        numLuvups,
        numJalapenos,
        isSendError,
        isNoteEmpty,
        placeholder,
        isModalOpen,
        modalContent,
        coinsAvailableTime,
        jalapenosAvailableTime,
      },
    } = this;
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
        <KeyboardAvoidingView style={scene.container}>
          <ScrollView style={[scene.content, { background: 'blue' }]}>
            {this.isRenderInFlightOrSuccess() && this.renderInflightOrSuccess()}
            <Animated.View
              style={{
                opacity: mainUiOpacity,
                transform: [{ translateY: mainUiY }],
                paddingBottom: 32,
              }}
            >
              <View style={{ paddingTop: 8 }}>
                <View style={[forms.formGroup, { marginTop: 8 }]}>
                  <TextInput
                    testID="create-love-note-input"
                    style={[forms.multilineInput]}
                    onChangeText={onNoteChange}
                    value={note}
                    maxLength={1000}
                    placeholder={placeholder}
                    placeholderTextColor={vars.blueGrey100}
                    multiline
                  />
                  {isNoteEmpty && (
                    <Text style={forms.error}>Write a note to send</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  paddingTop: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <CountText n={numLuvups} verb="Luvup" />
                <CountText n={numJalapenos} verb="Jalapeño" />
              </View>
              <View
                style={{
                  paddingTop: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={removeLuvup}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 40,
                        color: vars.blueGrey500,
                        marginRight: 8,
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="create-love-note-add-luvup"
                    onPress={addLuvup}
                  >
                    <Image
                      source={require('../../images/coin.png')}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addLuvup}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 40,
                        color: vars.blueGrey500,
                        marginLeft: 8,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={removeJalapeno}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 40,
                        color: vars.blueGrey500,
                        marginRight: 8,
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addJalapeno}>
                    <Image
                      source={require('../../images/jalapeno.png')}
                      style={{ width: 30.6, height: 40, marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addJalapeno}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 40,
                        color: vars.blueGrey500,
                        marginLeft: 8,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {isSendError && (
                <Well text="There was an error sending your Love Note. Make sure you are connected to wifi or data." />
              )}
              <View style={{ marginTop: 32 }}>
                <Button
                  testID="create-love-note-submit"
                  onPress={onSendClick}
                  title="Send"
                />
              </View>
              <View style={{ marginTop: 32 }}>
                <TouchableOpacity onPress={back}>
                  <Text style={buttons.secondarySkeletonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
        <LimitExceededModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalContent={modalContent}
          loverFirstName={loverFirstName}
          coinCopy={modalCopy(numLuvups, 'luvup')}
          jalapenoCopy={modalCopy(numJalapenos, 'jalapeño')}
          coinsAvailableTime={coinsAvailableTime}
          jalapenosAvailableTime={jalapenosAvailableTime}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    loverFirstName: state.lover.firstName,
    recentlySentCoinCount: state.coin.recentlySentCoinCount,
    recentlySentJalapenoCount: state.jalapeno.recentlySentJalapenoCount,
  }),
  {
    createLoveNote: createLoveNoteAction,
    refreshSentCoinCount: refreshSentCoinCountAction,
    refreshSentJalapenoCount: refreshSentJalapenoCountAction,
  },
)(CreateLoveNote);
