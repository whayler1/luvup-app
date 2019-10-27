import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Button, { BUTTON_STYLES } from '../../components/Button';
import ModalContentWrap from '../../components/ModalContentWrap';
import { scene, forms, vars } from '../../styles';

const ViewLoverRequestAcceptModal = ({ visible, onAccepted, onDismissed }) => {
  const { loverFirstName, loverLastName } = useSelector(
    state => ({
      loverFirstName: state.lover.firstName,
      loverLastName: state.lover.lastName,
    }),
    shallowEqual
  );
  return (
    <ModalContentWrap visible={visible}>
      <>
        <View style={scene.textCenter}>
          <Ionicons name="md-alert" size={60} color={vars.danger} />
        </View>
        <Text style={[scene.bodyCopy, scene.textCenter]}>
          Accepting this lover request will cancel your current relationship
          with {loverFirstName} {loverLastName}.
        </Text>
        <View style={[forms.row, scene.gutterDoubleTop]}>
          <View style={forms.buttonCell2ColLeft}>
            <Button
              buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
              title="Dismiss"
              onPress={onDismissed}
            />
          </View>
          <View style={forms.buttonCell2ColRight}>
            <Button
              buttonStyles={BUTTON_STYLES.DANGER}
              title="Accept"
              onPress={onAccepted}
            />
          </View>
        </View>
      </>
    </ModalContentWrap>
  );
};

export default ViewLoverRequestAcceptModal;
