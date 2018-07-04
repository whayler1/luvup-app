import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements';

import { buttons, forms, scene, modal, vars } from '../../styles';
import config from '../../config';
import Well from '../../components/Well';
import LoveRequestArt from '../../components/LoveRequestArt';

export default ({
  currentLoverRequestId,
  senderFirstName,
  senderLastName,
  isInFlight,
  inFlightType,
  error,
  cancelLoverRequest,
  acceptLoverRequest,
}) => (
  <View style={scene.container}>
    <View style={scene.content}>
      <View style={{
        alignItems: 'center',
        marginBottom: 32,
      }}>
        <LoveRequestArt
          scale={0.3}
          fill={vars.pink500}
        />
      </View>
      <Text style={[modal.title, { fontFamily: vars.fontRegular }]}>{'You Received a\nLover Request from'}</Text>
      <Text style={modal.title}>{senderFirstName} {senderLastName}</Text>
      {error === 'accept-lover' && <Well text="There was an error accepting your lover request" />}
      {error === 'cancel' && <Well text="There was an error cancelling your lover request" />}
      {error === 'get-received' && <Well text="There was an error updating your lover request" />}
      <View style={forms.buttonRow}>
        <View style={forms.buttonCell2ColLeft}>
          <Button
            onPress={cancelLoverRequest}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.secondarySkeletonButton}
            textStyle={buttons.secondarySkeletonText}
            disabled={isInFlight}
            title={inFlightType === 'cancel' ? 'Rejecting…' : 'Reject'}
          />
        </View>
        <View style={forms.buttonCell2ColRight}>
          <Button
            onPress={acceptLoverRequest}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            disabled={isInFlight}
            title={inFlightType === 'accept' ? 'Accepting…' : 'Accept'}
          />
        </View>
      </View>
    </View>
  </View>
);
