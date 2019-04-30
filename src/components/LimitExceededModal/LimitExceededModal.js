import React from 'react';
import { View, Text, Modal } from 'react-native';

import { modal } from '../../styles';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import Button from '../../components/Button';
import config from '../../config';

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
    transparent>
    <View style={modal.outerContainer}>
      <View style={modal.innerContainer}>
        <View>
          {modalContent === 'coin' && (
            <CoinArt recentlySentCoinCount={config.maxItemsPerHour} />
          )}
          {modalContent === 'jalapeno' && (
            <JalapenoArt recentlySentJalapenoCount={config.maxItemsPerHour} />
          )}
        </View>
        <View
          style={{
            marginTop: 16,
            alignItems: 'center',
          }}>
          <Text style={modal.title}>
            {modalContent === 'coin' && 'Hourly Luvup\nLimit Exceeded'}
            {modalContent === 'jalapeno' && 'Hourly Jalapeño\nLimit Exceeded'}
          </Text>
          <Text style={modal.copy}>
            {modalContent === 'coin' &&
              (coinCopy ||
                `Wow! ${loverFirstName} must be on fire right now. You've sent the max hourly limit of ${
                  config.maxItemsPerHour
                } luvups. You'll have the opportunity to send another luvup ${coinsAvailableTime}.`)}
            {modalContent === 'jalapeno' &&
              (jalapenoCopy ||
                `Looks like things are getting spicy with ${loverFirstName} right now. You've sent the max hourly limit of ${
                  config.maxItemsPerHour
                } jalapeños. You'll have the oportunity to send another jalapeño ${jalapenosAvailableTime}.`)}
          </Text>
        </View>
        <View style={modal.buttonContainer}>
          <Button onPress={closeModal} title="Dismiss" />
        </View>
      </View>
    </View>
  </Modal>
);

export default LimitExceededModal;
