import React from 'react';
import { Text, View } from 'react-native';
import distanceInWords from 'date-fns/distance_in_words';

import Button, { BUTTON_STYLES } from '../../components/Button';
import FormScene from '../../components/FormScene';
import { scene, forms } from '../../styles';

const ViewLoverRequest = ({ loverRequest: { createdAt, sender } }) => {
  function handleDeny() {
    //
  }
  function handleAccept() {
    //
  }
  return (
    <FormScene>
      <>
        <Text style={[scene.titleCopy, scene.textCenter]}>
          Lover Request Received
        </Text>
        <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
          {sender.firstName} {sender.lastName} ({sender.email}) sent you a Lover
          Request{' '}
          {distanceInWords(new Date(), new Date(+createdAt), {
            addSuffix: true,
          })}
        </Text>
        <View style={[forms.row, scene.gutterDoubleTop]}>
          <View style={forms.buttonCell2ColLeft}>
            <Button
              buttonStyles={BUTTON_STYLES.DANGER_SKELETON}
              title="Deny"
              onPress={handleDeny}
            />
          </View>
          <View style={forms.buttonCell2ColRight}>
            <Button title="Accept" onPress={handleAccept} />
          </View>
        </View>
      </>
    </FormScene>
  );
};

export default ViewLoverRequest;
