import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  Header,
} from 'react-native';

import styles from './Timeline.styles';
import { buttons, forms, scene, vars } from '../../styles';
import renderItem from './Timeline.renderItem.template';
import renderSectionHeader from './Timeline.renderSectionHeader.template';
import ListHeaderComponent from './Timeline.ListHeaderComponent.template';

const keyExtractor = item => item.id;

export default ({
  coinCount,
  jalapenoCount,
  sentCoinsCount,
  sentJalapenosCount,
  userEvents,
  goToDashboard,
  sections,
  userInitials,
  loverInitials,
}) => (
  <View style={{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  }}>
    <View
      style={scene.topNav}
    >
      <TouchableOpacity
        onPress={goToDashboard}
        style={{
          paddingRight: 10,
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
        style={styles.sectionLists}
        ListHeaderComponent={<ListHeaderComponent
          {...{
            coinCount,
            jalapenoCount,
            userInitials,
            loverInitials,
            sentCoinsCount,
            sentJalapenosCount,
          }}
        />}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        sections={sections}
      />
    </View>
  </View>
);
