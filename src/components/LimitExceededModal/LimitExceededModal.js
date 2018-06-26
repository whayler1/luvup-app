import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import { buttons, forms, scene, modal, vars } from '../../styles';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
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
    transparent={true}
  >
    <View style={modal.outerContainer}>
      <View style={modal.innerContainer}>
        <View>
          {modalContent === 'coin' && <CoinArt
            recentlySentCoinCount={config.maxItemsPerHour}
          />}
          {modalContent === 'jalapeno' && <JalapenoArt
            recentlySentJalapenoCount={config.maxItemsPerHour}
          />}
        </View>
        <View style={{
          marginTop: 16,
          alignItems: 'center',
        }}>
          <Text style={modal.title}>
            {modalContent === 'coin' && 'Hourly Luvup\nLimit Exceeded'}
            {modalContent === 'jalapeno' && 'Hourly Jalapeno\nLimit Exceeded'}
          </Text>
          <Text style={modal.copy}>
            {modalContent === 'coin' && (coinCopy || `Wow! ${loverFirstName} must be on fire right now. You've sent the max hourly limit of ${config.maxItemsPerHour} luvups. You'll have the opportunity to send another luvup ${coinsAvailableTime}.`)}
            {modalContent === 'jalapeno' && (jalapenoCopy || `Looks like things are getting spicy with ${loverFirstName} right now. You've sent the max hourly limit of ${config.maxItemsPerHour} jalapenos. You'll have the oportunity to send another jalapeno ${jalapenosAvailableTime}.`)}
          </Text>
        </View>
        <View style={modal.buttonContainer}>
          <Button
            raised
            onPress={closeModal}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title='Dismiss'
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default LimitExceededModal;
