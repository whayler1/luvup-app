import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './Dashboard.styles';
import DashboardTopNav from '../../components/DashboardTopNav';
import QuizArt from '../../components/Art/QuizArt';
import LoveNoteArt from '../../components/LoveNoteArt';
import LimitExceededModal from '../../components/LimitExceededModal';
import Hero from '../Hero';

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
  onCreateQuizPress,
  relationshipScore,
}) => (
  <View style={styles.wrapper}>
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
      unreadReceivedLoveNoteCount={unreadReceivedLoveNoteCount}
    />
    <Hero openModal={openModal} />
    {loverFirstName && (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tabsItem}
          onPress={onLoveNoteWritePress}>
          <LoveNoteArt scale={0.8} />
          <Text style={styles.tabsText}>Write Love Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabsItem} onPress={onCreateQuizPress}>
          <QuizArt scale={0.85} />
          <Text style={styles.tabsText}>Create a Quiz</Text>
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
