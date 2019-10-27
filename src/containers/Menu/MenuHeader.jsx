import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity } from 'react-native';

import HeartArt from '../../components/Art/HeartArt';
import { scene, vars } from '../../styles';
import styles from './Menu.styles';

const handleBackPress = () => {
  Actions.pop();
};

const MenuHeader = () => (
  <View style={[scene.topNav, styles.topNav]}>
    <View style={scene.topNavContent}>
      <TouchableOpacity onPress={handleBackPress}>
        <HeartArt scale={0.037} fill={vars.blueGrey500} />
      </TouchableOpacity>
    </View>
  </View>
);

export default MenuHeader;
