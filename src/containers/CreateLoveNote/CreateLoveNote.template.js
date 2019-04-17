import React, { Fragment } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import { forms, buttons, scene, vars } from '../../styles';
import Well from '../../components/Well';
import LoveNoteArtFlying from '../../components/LoveNoteArtFlying';
import LimitExceededModal from '../../components/LimitExceededModal';
import config from '../../config';

const CountText = ({ n, verb }) => (
  <Text
    style={{
      fontFamily: vars.fontRegular,
      color: vars.blueGrey900,
    }}>
    Attach{' '}
    <Text style={{ fontFamily: vars.fontBlack, color: vars.blueGrey900 }}>
      {n > 0 ? n : ''}
    </Text>{' '}
    {verb}
    {n !== 1 ? 's' : ''}
  </Text>
);

const getModalCopy = (n, verb) => {
  const endStr = n < config.maxItemsPerHour ? ` You have ${n} left.` : '';
  return `You can send a maximum of ${
    config.maxItemsPerHour
  } ${verb}s per hour.${endStr}`;
};

export default ({
  note,
  onNoteChange,
  placeholder,
  focusInput = '',
  isInFlight = false,
  numLuvups,
  numJalapenos,
  addLuvup,
  addJalapeno,
  removeLuvup,
  removeJalapeno,
  onSendClick,
  isSending,
  isSuccess,
  isSendError,
  isNoteEmpty,
  back,
  mainUiY,
  mainUiOpacity,
  flyingNoteX,
  flyingNoteOpacity,
  isModalOpen,
  modalContent,
  loverFirstName,
  closeModal,
  coinsAvailableTime,
  jalapenosAvailableTime,
}) => (
  <View style={{ flex: 1 }}>
    {isSending ||
      (isSuccess && (
        <View
          style={{
            position: 'absolute',
            top: 42,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              opacity: flyingNoteOpacity,
              transform: [{ translateX: flyingNoteX }],
            }}>
            <LoveNoteArtFlying />
          </Animated.View>
          {isSending && (
            <Animated.Text
              style={[
                scene.copy,
                {
                  marginTop: 16,
                  opacity: flyingNoteOpacity,
                },
              ]}>
              Sending…
            </Animated.Text>
          )}
          {isSuccess && (
            <Fragment>
              <Animated.Text
                style={[
                  scene.copy,
                  {
                    marginTop: 16,
                    fontFamily: vars.fontBlack,
                    opacity: flyingNoteOpacity,
                  },
                ]}>
                Sent!
              </Animated.Text>
              <View
                style={{
                  marginTop: 32,
                  paddingHorizontal: 16,
                  alignSelf: 'stretch',
                }}>
                <Button
                  testID="create-love-note-success-close-button"
                  onPress={back}
                  containerViewStyle={buttons.container}
                  buttonStyle={buttons.infoSkeletonButton}
                  textStyle={buttons.infoSkeletonText}
                  title="Close"
                />
              </View>
            </Fragment>
          )}
        </View>
      ))}
    <Animated.View
      style={{
        paddingHorizontal: 16,
        opacity: mainUiOpacity,
        transform: [{ translateY: mainUiY }],
      }}>
      <View
        style={{
          paddingTop: 8,
        }}>
        <View style={[forms.formGroup, { marginTop: 8 }]}>
          <TextInput
            testID="create-love-note-input"
            style={[
              forms.multilineInput,
              focusInput === 'currentPassword' && forms.inputFocus,
            ]}
            onChangeText={onNoteChange}
            value={note}
            maxLength={1000}
            editable={!isInFlight}
            placeholder={placeholder}
            placeholderTextColor={vars.blueGrey100}
            multiline
          />
          {isNoteEmpty && <Text style={forms.error}>Write a note to send</Text>}
        </View>
      </View>
      <View
        style={{
          paddingTop: 24,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <CountText n={numLuvups} verb="Luvup" />
        <CountText n={numJalapenos} verb="Jalapeño" />
      </View>
      <View
        style={{
          paddingTop: 8,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={removeLuvup}>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginRight: 8,
              }}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="create-love-note-add-luvup"
            onPress={addLuvup}>
            <Image
              source={require('../../images/coin.png')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={addLuvup}>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginLeft: 8,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={removeJalapeno}>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginRight: 8,
              }}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addJalapeno}>
            <Image
              source={require('../../images/jalapeno.png')}
              style={{
                width: 30.6,
                height: 40,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={addJalapeno}>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginLeft: 8,
              }}>
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
          containerViewStyle={buttons.container}
          buttonStyle={buttons.infoButton}
          textStyle={buttons.infoText}
          title={isSending ? 'Sending…' : 'Send'}
          disabled={isSending}
        />
      </View>
      <View style={{ marginTop: 32 }}>
        <TouchableOpacity onPress={back}>
          <Text style={buttons.secondarySkeletonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
    <LimitExceededModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalContent={modalContent}
      loverFirstName={loverFirstName}
      coinsAvailableTime={coinsAvailableTime}
      jalapenosAvailableTime={jalapenosAvailableTime}
      coinCopy={getModalCopy(numLuvups, 'Luvup')}
      jalapenoCopy={getModalCopy(numJalapenos, 'jalapeño')}
    />
  </View>
);
