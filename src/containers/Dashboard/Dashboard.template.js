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
import ReactArt, {
  Group,
  Shape,
  Surface,
  Transform,
} from 'ReactNativeART';

import styles from './Dashboard.styles';
import { buttons, forms, scene, modal, vars } from '../../styles';
import config from '../../config';
import DashboardTopNav from '../../components/DashboardTopNav';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import LoveNoteArt from '../../components/LoveNoteArt';
import LimitExceededModal from '../../components/LimitExceededModal';
import Hero from '../Hero';
import Circle from '../../components/Circle';

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
  unreadReceivedLoveNoteCount,
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
        {unreadReceivedLoveNoteCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -6,
              zIndex: 10,
            }}
          >
            <Surface
              width={16}
              height={16}
            >
              <Group>
                <Circle
                  radius={8}
                  fill={vars.red500}
                  stroke="#ffffff"
                  strokeWidth={3}
                />
              </Group>
            </Surface>
          </View>
        )}
        <LoveNoteArt />
      </TouchableOpacity>
    </View>
    <LimitExceededModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalContent={modalContent}
      loverFirstName={loverFirstName}
      coinsAvailableTime={coinsAvailableTime}
      jalapenosAvailableTime={jalapenosAvailableTime}
    />
  </View>
);
