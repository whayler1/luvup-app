import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  Header,
  Modal,
} from 'react-native';
import { Button } from 'react-native-elements';

import styles from './Timeline.styles';
import { buttons, forms, scene, modal, vars } from '../../styles';
import renderItem from './Timeline.renderItem.template';
import renderSectionHeader from './Timeline.renderSectionHeader.template';
import ListHeaderComponent from './Timeline.ListHeaderComponent.template';
import ListFooterComponent from './Timeline.ListFooterComponent.template';
import ListEmptyComponent from './Timeline.ListEmptyComponent.template';
import Preloader from '../../components/Preloader';

const keyExtractor = item => item.id;

export default ({
  coinCount,
  jalapenoCount,
  sentCoinsCount,
  sentJalapenosCount,
  userEvents,
  goBack,
  sections,
  placeholderSections,
  isSectionsLoaded,
  userInitials,
  loverInitials,
  onEndReached,
  isModalVisible,
  closeModal,
  isAtEndOfList,
  isGetUserEventsInFlight,
  getUserEventsError,
}) => (
  <View style={{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    backgroundColor: 'white',
  }}>
    <View
      style={scene.topNav}
    >
      <TouchableOpacity
        onPress={goBack}
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Image
          source={require('../../images/heart.png')}
          style={{
            width: 32,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
    <View
      style={{
        paddingTop: 83,
        alignSelf: 'stretch',
      }}
    >
      <SectionList
        style={styles.sectionList}
        ListEmptyComponent={(
          <ListEmptyComponent
            isInFlight={isGetUserEventsInFlight}
            error={getUserEventsError}
          />
        )}
        ListHeaderComponent={(
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
        )}
        ListFooterComponent={(
          <ListFooterComponent isPreloaderVisible={isGetUserEventsInFlight && isSectionsLoaded} />
        )}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        sections={sections}
        onEndReached={onEndReached}
      />
    </View>
    <Modal
      visible={isModalVisible}
      animationType={'fade'}
      transparent={true}
    >
      <View style={modal.outerContainer}>
        <View style={modal.innerContainer}>
          <Text style={modal.title}>
            Error
          </Text>
          <Text style={modal.copy}>
            There was an error loading your timeline. Most likely this is due to network conectivity.
          </Text>
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
