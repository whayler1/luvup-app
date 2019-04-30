import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { forms, scene, vars } from '../../styles';
import Well from '../../components/Well';
import LoveRequestArt from '../../components/LoveRequestArt';
import Button, { BUTTON_STYLES } from '../../components/Button';

export default ({
  currentLoverRequestId,
  senderFirstName,
  senderLastName,
  isInFlight,
  inFlightType,
  error,
  cancelLoverRequest,
  acceptLoverRequest,
  selectedLoverRequestId,
}) => {
  const isSentAndReceivedLoverRequestMatch =
    selectedLoverRequestId === currentLoverRequestId;
  return (
    <SafeAreaView style={scene.container}>
      <View style={scene.content}>
        <View style={scene.contentTop}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 32,
            }}>
            <LoveRequestArt scale={0.15} fill={vars.blueGrey100} />
          </View>
          <Text style={[scene.largeCopy, scene.textCenter]}>
            {isSentAndReceivedLoverRequestMatch
              ? 'How Convenient!'
              : 'You Received a\nLover Request from'}
          </Text>
          <Text style={[scene.titleCopy, scene.textCenter]}>
            {senderFirstName} {senderLastName}
          </Text>
          {isSentAndReceivedLoverRequestMatch && (
            <Text style={[scene.largeCopy, scene.textCenter]}>
              already sent you a lover request
            </Text>
          )}
          {error === 'accept-lover' && (
            <Well text="There was an error accepting your lover request" />
          )}
          {error === 'cancel' && (
            <Well text="There was an error cancelling your lover request" />
          )}
          {error === 'get-received' && (
            <Well text="There was an error updating your lover request" />
          )}
        </View>
        <View style={scene.contentBottom}>
          <View style={forms.buttonRow}>
            <View style={forms.buttonCell2ColLeft}>
              <Button
                onPress={cancelLoverRequest}
                buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
                disabled={isInFlight}
                isInFlight={inFlightType === 'cancel'}
                title="Reject"
              />
            </View>
            <View style={forms.buttonCell2ColRight}>
              <Button
                testID="confirm-user-accept-button"
                onPress={acceptLoverRequest}
                disabled={isInFlight}
                isInFlight={inFlightType === 'accept'}
                title="Accept"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
