import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { scene, buttons, forms } from '../../styles';

export default ({
  goToDashboard,
  logout,
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
      <Button
        raised
        onPress={logout}
        containerViewStyle={buttons.infoContainer}
        buttonStyle={buttons.infoButton}
        textStyle={buttons.infoText}
        title={'Log Out'}
      />
    </View>
  </View>
);
