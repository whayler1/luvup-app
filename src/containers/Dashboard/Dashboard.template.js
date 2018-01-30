import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Modal,
  TabBarIOS,
} from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';

import styles from './Dashboard.styles';
import { buttons, forms, scene } from '../../styles';
import config from '../../config';
import DashboardTopNav from '../../components/DashboardTopNav';

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
  logout,
  panResponder,
  translateY,
  scale,
  closeModal,
  isModalOpen,
  modalMessage,
  isFontLoaded,
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Modal
      visible={isModalOpen}
      animationType={'slide'}
      onRequestClose={() => this.closeModal()}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <View style={{ alignItems: 'center', }}>
          {modalMessage === 'luvups' && <Text>You are allowed to send {config.maxItemsPerHour} Luvups per hour.</Text>}
          {modalMessage === 'jalapenos' && <Text>You are allowed to send {config.maxItemsPerHour} jalapenos per hour.</Text>}
          <Button
            raised
            onPress={closeModal}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={'Dismiss'}
          />
        </View>
      </View>
    </Modal>
    <DashboardTopNav
      coinCount={coinCount}
      jalapenoCount={jalapenoCount}
      userFirstName={userFirstName}
      userLastName={userLastName}
      loverFirstName={loverFirstName}
      loverLastName={loverLastName}
    />
    {loverRequestUsername.length > 0 && <Text>You sent a loverRequest to {loverRequestUsername} {moment(new Date(loverRequestCreatedAt)).fromNow()}</Text>}
    <View
      style={styles.heartView}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={require('../../images/heart.png')}
        style={{
          width: 300,
          height: 275,
          transform: [{
            translateY
          }, {
            scaleX: scale
          }, {
            scaleY: scale
          }]
        }}
      />
    </View>
    <Button
      raised
      onPress={logout}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      title={'Log Out'}
    />
  </View>
);
