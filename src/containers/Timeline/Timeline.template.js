import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Modal,
  RefreshControl,
} from 'react-native';
import { Button } from 'react-native-elements';

import styles from './Timeline.styles';
import { buttons, scene, modal } from '../../styles';
import renderItem from './Timeline.renderItem.template';
import renderSectionHeader from './Timeline.renderSectionHeader.template';
import ListHeaderComponent from './Timeline.ListHeaderComponent.template';
import ListFooterComponent from './Timeline.ListFooterComponent.template';
import ListEmptyComponent from './Timeline.ListEmptyComponent.template';
import HeartArt from '../../components/Art/HeartArt';

export default ({
  coinCount,
  jalapenoCount,
  sentCoinsCount,
  sentJalapenosCount,
  goBack,
  sections,
  isSectionsLoaded,
  isRefreshing,
  userInitials,
  loverInitials,
  onRefresh,
  onEndReached,
  isModalVisible,
  closeModal,
  isGetUserEventsInFlight,
  getUserEventsError,
}) => (
  <View style={styles.wrapper}>
    <View style={[scene.topNav, styles.topNav]}>
      <TouchableOpacity onPress={goBack} style={styles.heartBtn}>
        <HeartArt scale={0.037} fill="rgba(0,0,0,0.5)" />
      </TouchableOpacity>
    </View>
    <View style={styles.sectionListWrapper}>
      <SectionList
        style={styles.sectionList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent
            isInFlight={isGetUserEventsInFlight}
            error={getUserEventsError}
          />
        }
        ListHeaderComponent={
          <ListHeaderComponent
            {...{
              coinCount,
              jalapenoCount,
              userInitials,
              loverInitials,
              sentCoinsCount,
              sentJalapenosCount,
            }}
          />
        }
        ListFooterComponent={
          <ListFooterComponent
            isPreloaderVisible={isGetUserEventsInFlight && isSectionsLoaded}
          />
        }
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        sections={sections}
        onEndReached={onEndReached}
      />
    </View>
    <Modal visible={isModalVisible} animationType={'fade'} transparent>
      <View style={modal.outerContainer}>
        <View style={modal.innerContainer}>
          <Text style={modal.title}>Error</Text>
          <Text style={modal.copy}>
            There was an error loading your timeline. Most likely this is due to
            network conectivity.
          </Text>
          <View style={modal.buttonContainer}>
            <Button
              raised
              onPress={closeModal}
              containerViewStyle={buttons.infoContainer}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title="Dismiss"
            />
          </View>
        </View>
      </View>
    </Modal>
  </View>
);
