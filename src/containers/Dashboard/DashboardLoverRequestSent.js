import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './DashboardLoverRequestSent.styles';
import Well from '../../components/Well';
import { forms, buttons } from '../../styles';

const DashboardLoverRequestSent = ({
  loverRequestFirstName,
  loverRequestLastName,
  loverRequestCreatedAtTimeAgo,
  cancelLoverRequest,
  error,
  isResendSuccess,
  isCancelInFlight,
  resendIsInFlight,
  resendLoverRequestEmail,
}) => (
  <View style={styles.heartView}>
    <View style={styles.wrapper}>
      <View style={styles.wrapperInner}>
        <Ionicons name="ios-send" size={190} color="grey" />
      </View>
    </View>
    <View style={styles.contentWrapper}>
      {_.isString(loverRequestFirstName) ? (
        <Fragment>
          <Text
            testID="hero-lover-request-copy"
            style={styles.loverRequestText}>
            Your lover request was sent to
          </Text>
          <Text style={styles.loverRequestTextLarge}>
            {loverRequestFirstName + ' ' + loverRequestLastName}
          </Text>
          <Text style={styles.loverRequestText}>
            {loverRequestCreatedAtTimeAgo}
          </Text>
        </Fragment>
      ) : (
        <Fragment>
          <Text style={styles.loverRequestText}>
            Your lover request has been
          </Text>
          <Text style={styles.loverRequestTextLarge}>Canceled</Text>
        </Fragment>
      )}
    </View>
    {error === 'cancel-error' && (
      <View style={styles.wellWrapper}>
        <Well text="There was an error cancelling your lover request. If the problem persists please contact justin@luvup.io" />
      </View>
    )}
    {error === 'resend-error' && (
      <View style={styles.wellWrapper}>
        <Well text="There was an error resending your lover request. If the problem persists please contact justin@luvup.io" />
      </View>
    )}
    {isResendSuccess && (
      <View style={styles.wellWrapper}>
        <Well type="success" text="Your lover request was resent!" />
      </View>
    )}
    <View style={forms.buttonRow}>
      <View style={[forms.buttonCell2ColLeft, styles.buttonCell2ColLeft]}>
        <Button
          onPress={cancelLoverRequest}
          containerViewStyle={buttons.container}
          buttonStyle={buttons.secondarySkeletonButton}
          textStyle={buttons.secondarySkeletonText}
          disabled={isCancelInFlight || resendIsInFlight}
          title={isCancelInFlight ? 'Cancelling…' : 'Cancel'}
        />
      </View>
      <View style={[forms.buttonCell2ColRight, styles.buttonCell2ColRight]}>
        <Button
          onPress={resendLoverRequestEmail}
          containerViewStyle={buttons.infoContainer}
          buttonStyle={buttons.infoSkeletonButton}
          textStyle={buttons.infoSkeletonText}
          disabled={isCancelInFlight || resendIsInFlight}
          title={resendIsInFlight ? 'Resending…' : 'Resend'}
        />
      </View>
    </View>
  </View>
);

DashboardLoverRequestSent.styles = {
  loverRequestFirstName: PropTypes.string,
  loverRequestLastName: PropTypes.string,
  loverRequestCreatedAt: PropTypes.string,
  cancelLoverRequest: PropTypes.func,
  error: PropTypes.string,
  isResendSuccess: PropTypes.bool,
  isCancelInFlight: PropTypes.bool,
  resendIsInFlight: PropTypes.bool,
  resendLoverRequestEmail: PropTypes.func,
};

export default DashboardLoverRequestSent;
