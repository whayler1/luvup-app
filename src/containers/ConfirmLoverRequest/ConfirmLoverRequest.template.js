import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements';

import { buttons, forms, scene, modal, vars } from '../../styles';
import config from '../../config';

export default ({
  currentLoverRequestId,
  senderFirstName,
  senderLastName,
  isInFlight,
  cancelLoverRequest,
}) => (
  <View style={scene.container}>
    <View style={scene.content}>
      <Text style={[modal.title, { fontFamily: vars.fontRegular }]}>{'You Received a\nLover Request from'}</Text>
      <Text style={modal.title}>{senderFirstName} {senderLastName}</Text>
      <View style={forms.buttonRow}>
        <View style={forms.buttonCell2ColLeft}>
          <Button
            onPress={cancelLoverRequest}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.secondarySkeletonButton}
            textStyle={buttons.secondarySkeletonText}
            disabled={isInFlight}
            title="Reject"
          />
        </View>
        <View style={forms.buttonCell2ColRight}>
          <Button
            onPress={() => {}}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            disabled={isInFlight}
            title="Accept"
          />
        </View>
      </View>
    </View>
  </View>
);
