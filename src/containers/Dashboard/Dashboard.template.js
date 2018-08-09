import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './Dashboard.styles';
import DashboardTopNav from '../../components/DashboardTopNav';
import LoveNoteReadArt from '../../components/LoveNoteReadArt';
import LoveNoteWriteArt from '../../components/LoveNoteWriteArt';
import LimitExceededModal from '../../components/LimitExceededModal';
import Hero from '../Hero';
import NotificationDot from '../../components/NotificationDot';

export default ({
  userFirstName,
  userLastName,
  loverFirstName,
  loverLastName,
  coinCount,
  jalapenoCount,
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
  onLoveNoteWritePress,
  onLoveNoteReadPress,
  relationshipScore,
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
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
      relationshipScore={relationshipScore}
    />
    <Hero openModal={openModal} />
    {loverFirstName && (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tabsItem}
          onPress={onLoveNoteWritePress}>
          <LoveNoteWriteArt scale={0.8} />
          <Text style={styles.tabsText}>Write Love Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabsItem} onPress={onLoveNoteReadPress}>
          {unreadReceivedLoveNoteCount > 0 && (
            <NotificationDot
              style={{
                right: 19,
                top: -1,
              }}
            />
          )}
          <LoveNoteReadArt scale={0.7} />
          <Text style={styles.tabsText}>Read Love Notes</Text>
        </TouchableOpacity>
      </View>
    )}
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
