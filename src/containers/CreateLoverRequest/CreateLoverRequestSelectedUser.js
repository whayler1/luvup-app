import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './CreateLoverRequestSelectedUser.styles';
import { forms, scene, vars } from '../../styles';
import Well from '../../components/Well';
import Button, { BUTTON_STYLES } from '../../components/Button';

export default ({
  clearSelectedUser,
  requestLover,
  selectedUser,
  requestLoverIsInFlight,
  error,
}) => (
  <SafeAreaView style={scene.safeAreaView}>
    <View style={scene.container}>
      <View style={scene.content}>
        <View style={scene.contentTop}>
          <View style={styles.sendIconWrapper}>
            <Ionicons name="ios-send" size={80} color={vars.blueGrey100} />
          </View>
          <Text style={[scene.largeCopy, scene.textCenter]}>
            Send Lover Request to
          </Text>
          <Text style={[scene.titleCopy, scene.textCenter]}>
            {`${selectedUser.firstName} ${selectedUser.lastName}?`}
          </Text>
        </View>
        <View style={scene.contentBottom}>
          {error === 'request-lover' && (
            <Well text="There was an error requesting your lover." />
          )}
          <View style={forms.buttonRow}>
            <View style={forms.buttonCell2ColLeft}>
              <Button
                onPress={clearSelectedUser}
                buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
                disabled={requestLoverIsInFlight}
                title="Back"
              />
            </View>
            <View style={forms.buttonCell2ColRight}>
              <Button
                testID="create-lover-request-button"
                onPress={requestLover}
                isInFlight={requestLoverIsInFlight}
                title="Request Lover"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>
);
