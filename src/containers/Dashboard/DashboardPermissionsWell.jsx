import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Linking } from 'expo';
import * as Permissions from 'expo-permissions';

import Well, { WELL_TYPES } from '../../components/Well';
import { vars } from '../../styles';
import {
  addOnActiveListener,
  removeOnActiveListener,
} from '../../services/appStateListener';

function handlePress() {
  Linking.openURL('app-settings:');
}

const ON_ACTIVE_LISTENER_ID = 'dashboard-well';

const DashboardPermissionsWell = () => {
  const [isPresent, setIsPresent] = useState(false);
  const setIsPresentWithPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      setIsPresent(true);
    }
    // re-check when app comes back into focus
  };
  useEffect(() => {
    setIsPresentWithPermissions();
    addOnActiveListener(ON_ACTIVE_LISTENER_ID, setIsPresentWithPermissions);
    return () => removeOnActiveListener(ON_ACTIVE_LISTENER_ID);
  }, []);
  function handleDismissPress() {
    setIsPresent(false);
  }
  if (!isPresent) {
    return false;
  }
  return (
    <View style={{ marginHorizontal: vars.gutter, zIndex: 10 }}>
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
