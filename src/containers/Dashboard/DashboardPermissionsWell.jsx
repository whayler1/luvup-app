import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Linking } from 'expo';
import * as Permissions from 'expo-permissions';

import Well, { WELL_TYPES } from '../../components/Well';
import { vars } from '../../styles';

function handlePress() {
  Linking.openURL('app-settings:');
}

const DashboardPermissionsWell = () => {
  const [isPresent, setIsPresent] = useState(false);
  function handleDismissPress() {
    setIsPresent(false);
  }
  useEffect(() => {
    const setIsPresentWithPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        setIsPresent(true);
      }
      // re-check when app comes back into focus
    };
    setIsPresentWithPermissions();
  }, []);
  if (!isPresent) {
    return false;
  }
  return (
    <View style={{ marginHorizontal: vars.gutter }}>
      <Well
        title="You have push notifications disabled."
        text="Push notifications allow you to receive messages and updates in real time. Click here to enable them."
        onPress={handlePress}
        onDismissPress={handleDismissPress}
        type={WELL_TYPES.INFO_SKELETON}
      />
    </View>
  );
};

export default DashboardPermissionsWell;
