import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

import styles from './Dashboard.styles';
import { buttons, forms, scene, modal, vars } from '../../styles';
import config from '../../config';
import DashboardTopNav from '../../components/DashboardTopNav';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import LoveNoteArt from '../../components/LoveNoteArt';
import Hero from '../Hero';

export default ({
  userFirstName,
  userLastName,
  username,
  loverFirstName,
  loverLastName,
  loverUsername,
  loverRequestUsername,
  loverRequestCreatedAt,
  coinCount,
  jalapenoCount,
  isFontLoaded,
  coinsAvailableTime,
  jalapenosAvailableTime,
  openModal,
  closeModal,
  closePushdown,
  isPushdownVisible,
  isModalOpen,
  modalContent,
  unviewedCoinCount,
  unviewedJalapenoCount,
  onLoveNotePress,
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <DashboardTopNav
      coinCount={coinCount}
      jalapenoCount={jalapenoCount}
      userFirstName={userFirstName}
      userLastName={userLastName}
      loverFirstName={loverFirstName}
      loverLastName={loverLastName}
      closePushdown={closePushdown}
      isPushdownVisible={isPushdownVisible}
      unviewedCoinCount={unviewedCoinCount}
      unviewedJalapenoCount={unviewedJalapenoCount}
    />
    <Hero
      openModal={openModal}
    />
    <View style={{
      flex: 0,
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingBottom: 42,
      paddingTop: 8,
    }}>
      <TouchableOpacity
        onPress={onLoveNotePress}
      >
        <LoveNoteArt />
      </TouchableOpacity>
    </View>
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
              {modalContent === 'coin' && `Wow! ${loverFirstName} must be on fire right now. You've sent the max hourly limit of ${config.maxItemsPerHour} luvups. You'll have the opportunity to send another luvup ${coinsAvailableTime}.`}
              {modalContent === 'jalapeno' && `Looks like things are getting spicy with ${loverFirstName} right now. You've sent the max hourly limit of ${config.maxItemsPerHour} jalapenos. You'll have the oportunity to send another jalapeno ${jalapenosAvailableTime}.`}
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
  </View>
);
