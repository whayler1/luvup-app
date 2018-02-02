import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import { buttons, forms, scene } from '../../styles';

const keyExtractor = item => item.id;

export default ({
  sentCoinsCount,
  sentJalapenosCount,
  userEvents,
  goToDashboard,
}) => (
  <View style={scene.container}>
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingTop: 40,
      }}
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
        marginTop: 100,
      }}
    >
      <Text>Timeline {sentCoinsCount}, { sentJalapenosCount}</Text>
      <FlatList
        style={{
          marginTop: 8,
        }}
        data={userEvents}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <View>
            <Text>{item.createdAt}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  </View>
);
