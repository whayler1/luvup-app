import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import styles from './CreateLoverRequestSelectedUser.styles';
import { forms, buttons, scene, vars } from '../../styles';
import Well from '../../components/Well';

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
                containerViewStyle={buttons.container}
                buttonStyle={buttons.secondarySkeletonButton}
                textStyle={buttons.secondarySkeletonText}
                disabled={requestLoverIsInFlight}
                title="Back"
              />
            </View>
            <View style={forms.buttonCell2ColRight}>
              <Button
                testID="create-lover-request-button"
                onPress={requestLover}
                containerViewStyle={buttons.infoContainer}
                buttonStyle={buttons.infoButton}
                textStyle={buttons.infoText}
                disabled={requestLoverIsInFlight}
                title={requestLoverIsInFlight ? 'Requesting…' : 'Request Lover'}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>
);
