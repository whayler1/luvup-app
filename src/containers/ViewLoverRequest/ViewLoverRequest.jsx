import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Text, View } from 'react-native';
import distanceInWords from 'date-fns/distance_in_words';

import Button, { BUTTON_STYLES } from '../../components/Button';
import FormScene from '../../components/FormScene';
import Well from '../../components/Well';
import ViewLoverRequestAcceptModal from './ViewLoverRequestAcceptModal';
import { scene, forms } from '../../styles';
import {
  acceptLoverRequest,
  cancelReceivedLoverRequest,
} from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';

const ViewLoverRequest = ({ loverRequest: { id, createdAt, sender } }) => {
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const {
    loverId,
    isAcceptLoverRequestInFlight,
    acceptLoverRequestError,
    isCancelReceivedLoverRequestInFlight,
    cancelReceivedLoverRequestError,
  } = useSelector(
    state => ({
      loverId: state.lover.id,
      isAcceptLoverRequestInFlight:
        state.receivedLoverRequests.isAcceptLoverRequestInFlight,
      acceptLoverRequestError:
        state.receivedLoverRequests.acceptLoverRequestError,
      isCancelReceivedLoverRequestInFlight:
        state.receivedLoverRequests.isCancelReceivedLoverRequestInFlight,
      cancelReceivedLoverRequest:
        state.receivedLoverRequests.cancelReceivedLoverRequestError,
    }),
    shallowEqual
  );
  const isDisabled =
    isAcceptLoverRequestInFlight || isCancelReceivedLoverRequestInFlight;
  const error = acceptLoverRequestError || cancelReceivedLoverRequestError;
  const dispatch = useDispatch();
  function handleDenyPress() {
    dispatch(cancelReceivedLoverRequest(id, { popOnSuccess: true }));
  }
  function dispatchAcceptLoverRequest() {
    dispatch(acceptLoverRequest(id, { popOnSuccess: true }));
  }
  function handleAcceptPress() {
    if (loverId) {
      setIsAcceptModalVisible(true);
      return;
    }
    dispatchAcceptLoverRequest();
  }
  function handleAcceptOverLayDismissed() {
    setIsAcceptModalVisible(false);
  }
  function handleAcceptOverlayAccepted() {
    setIsAcceptModalVisible(false);
    dispatchAcceptLoverRequest();
  }
  return (
    <>
      <FormScene>
        <>
          <Text style={[scene.titleCopy, scene.textCenter]}>
            Lover Request Received
          </Text>
          <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
            {sender.firstName} {sender.lastName} ({sender.email}) sent you a
            Lover Request{' '}
            {distanceInWords(new Date(), new Date(+createdAt), {
              addSuffix: true,
            })}
          </Text>
          <View style={[forms.row, scene.gutterDoubleTop]}>
            <View style={forms.buttonCell2ColLeft}>
              <Button
                buttonStyles={BUTTON_STYLES.DANGER_SKELETON}
                title="Deny"
                onPress={handleDenyPress}
                disable={isDisabled}
                isInFlight={isCancelReceivedLoverRequestInFlight}
              />
            </View>
            <View style={forms.buttonCell2ColRight}>
              <Button
                title="Accept"
                onPress={handleAcceptPress}
                disable={isDisabled}
                isInFlight={isAcceptLoverRequestInFlight}
              />
            </View>
          </View>
          {error && (
            <View style={scene.gutterTop}>
              <Well text={error} />
            </View>
          )}
        </>
      </FormScene>
      <ViewLoverRequestAcceptModal
        visible={isAcceptModalVisible}
        onAccepted={handleAcceptOverlayAccepted}
        onDismissed={handleAcceptOverLayDismissed}
      />
    </>
  );
};

export default ViewLoverRequest;
