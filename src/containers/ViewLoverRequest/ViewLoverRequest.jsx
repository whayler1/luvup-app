import React from 'react';
import { Text } from 'react-native';
import distanceInWords from 'date-fns/distance_in_words';

import Button, { BUTTON_STYLES } from '../../components/Button';
import FormScene from '../../components/FormScene';
import { scene } from '../../styles';

const ViewLoverRequest = ({ loverRequest: { createdAt, sender } }) => {
  function handleSubmit() {
    //
  }
  return (
    <FormScene>
      <>
        <Text style={[scene.titleCopy, scene.textCenter]}>
          You Received a Lover Request
        </Text>
        <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
          {sender.firstName} {sender.lastName} ({sender.email}) sent you a Lover
          Request{' '}
          {distanceInWords(new Date(), new Date(+createdAt), {
            addSuffix: true,
          })}
        </Text>
        <Button buttonStyles={BUTTON_STYLES.DANGER_SKELETON} title="Deny" />
        <Button title="Accept" />
      </>
    </FormScene>
  );
};

export default ViewLoverRequest;
