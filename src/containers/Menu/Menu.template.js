import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import _ from 'lodash';

import { scene } from '../../styles';

const data = _.times(100, (n) => ({
  title: `I am ${n} item`,
  key: n,
}));
console.log('data', data);

export default ({
  goToDashboard,
}) => (
  <View style={scene.container}>
    <View
      style={scene.topNav}
    >
      <View style={scene.topNavContent}>
        <TouchableOpacity
          onPress={goToDashboard}
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
    </View>
    <View
      style={scene.content}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (<View><Text>boo</Text></View>)}
      />
    </View>
  </View>
);
