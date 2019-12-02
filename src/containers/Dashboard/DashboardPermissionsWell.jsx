import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

import Well, { WELL_TYPES } from '../../components/Well';
import { vars } from '../../styles';

function handlePress() {
  Linking.openURL('app-settings:');
}

const DashboardPermissionsWell = () => (
  <View style={{ marginHorizontal: vars.gutter }}>
    <Well
      title="You have push notifications disabled."
      text="Push notifications allow you to receive messages and updates in real time. Click here to enable them."
      onPress={handlePress}
      type={WELL_TYPES.INFO_SKELETON}
    />
  </View>
);

export default DashboardPermissionsWell;
