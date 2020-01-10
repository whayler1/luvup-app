import React from 'react';
import { View, Text, Modal } from 'react-native';

import { modal, scene } from '../../styles';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import Button from '../../components/Button';
import config from '../../config';

const NEW_RELATIONSHIP_REQUEST = Symbol();
const RELATIONSHIP_REQUEST_ACCEPTED = Symbol();
const COIN = Symbol();
const JALAPENO = Symbol();

export const MODAL_CONTENT_TYPES = {
  NEW_RELATIONSHIP_REQUEST,
  RELATIONSHIP_REQUEST_ACCEPTED,
  COIN,
  JALAPENO,
};

const LimitExceededModal = ({
  isModalOpen,
  closeModal,
  modalContent,
  loverFirstName,
  coinsAvailableTime,
  jalapenosAvailableTime,
  coinCopy,
  jalapenoCopy,
}) => (
  <Modal
    visible={isModalOpen}
    animationType={'fade'}
    onRequestClose={closeModal}
    transparent
  >
    <View style={modal.outerContainer}>
      <View style={modal.innerContainer}>
        <View>
          {modalContent === COIN && (
            <CoinArt
              scale={0.8}
              recentlySentCoinCount={config.maxItemsPerHour}
            />
          )}
          {modalContent === JALAPENO && (
            <JalapenoArt
              scale={0.7}
              recentlySentJalapenoCount={config.maxItemsPerHour}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <Text
            testID="limit-exceeded-modal-title"
            style={[scene.titleCopy, scene.textCenter]}
          >
            {modalContent === NEW_RELATIONSHIP_REQUEST &&
              'Relationship Request Sent'}
            {modalContent === RELATIONSHIP_REQUEST_ACCEPTED &&
              'Relationship Request Accepted'}
            {modalContent === COIN && 'Hourly Luvup\nLimit Exceeded'}
            {modalContent === JALAPENO && 'Hourly Jalapeño\nLimit Exceeded'}
          </Text>
          <Text style={[scene.largeCopy, scene.textCenter, scene.gutterTop]}>
            {(modalContent === NEW_RELATIONSHIP_REQUEST ||
              modalContent === RELATIONSHIP_REQUEST_ACCEPTED) &&
              'You can now begin using Luvup!'}
            {modalContent === COIN &&
              `Wow! ${loverFirstName} must be on fire right now.`}
            {modalContent === JALAPENO &&
              `Looks like things are getting spicy with ${loverFirstName} right now.`}
          </Text>
          <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
            {modalContent === NEW_RELATIONSHIP_REQUEST &&
              `We'll let you know when ${loverFirstName} accepts. Though ${loverFirstName} has not accepted yet, you can use the app. Any actions you take now will be visible on ${loverFirstName}'s profile when they accept.`}
            {modalContent === RELATIONSHIP_REQUEST_ACCEPTED &&
              `Swipe up on the heart to send ${loverFirstName} a Luvup! This is the start of something special.`}
            {modalContent === COIN &&
              (coinCopy ||
                `You've sent the max hourly limit of ${
                  config.maxItemsPerHour
                } luvups. You'll have the opportunity to send another luvup ${coinsAvailableTime}.`)}
            {modalContent === JALAPENO &&
              (jalapenoCopy ||
                `You've sent the max hourly limit of ${
                  config.maxItemsPerHour
                } jalapeños. You'll have the oportunity to send another jalapeño ${jalapenosAvailableTime}.`)}
          </Text>
        </View>
        <View style={modal.buttonContainer}>
          <Button
            testID="dismiss-modal-button"
            onPress={closeModal}
            title="Got it"
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default LimitExceededModal;
