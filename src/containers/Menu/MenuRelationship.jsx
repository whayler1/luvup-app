import moment from 'moment';
import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { isStringWithLength } from '../../helpers';
import styles from './Menu.styles';
import { scene, vars } from '../../styles';
import MenuLink, { LINK_TYPE } from './MenuLink';
import Well, { WELL_TYPES } from '../../components/Well';
import { cancelSentLoverRequestAndRelationship } from '../../redux/loverRequest/loverRequest.actions';

const handleSendLoverRequestPress = () => {
  Actions.createloverrequest();
};
const handleInviteLoverPress = () => {
  Actions.createInvite();
};
const handleResendInvitePress = () => {
  Actions.resendInvite();
};
const handleResendLoverRequestPress = () => {
  Actions.resendLoverRequest();
};

const MenuRelationship = ({ openEndRelationshipModal }) => {
  const {
    loverFirstName,
    loverLastName,
    loverUsername,
    loverEmail,
    loverId,
    loverIsPlaceholder,
    relationshipCreatedAt,
    loverRequestId,
    userInviteId,
    isCancelLoverRequestInFlight,
    cancelLoverRequestError,
  } = useSelector(
    (state) => ({
      loverFirstName: state.lover.firstName,
      loverLastName: state.lover.lastName,
      loverEmail: state.lover.email,
      loverUsername: state.lover.username,
      loverId: state.lover.id,
      loverIsPlaceholder: state.lover.isPlaceholder,
      relationshipCreatedAt: state.relationship.createdAt,
      loverRequestId: state.loverRequest.id,
      userInviteId: state.userInvite.id,
      isCancelLoverRequestInFlight:
        state.loverRequest.isCancelSentLoverRequestAndRelationshipInFlight,
      cancelLoverRequestError:
        state.loverRequest.cancelSentLoverRequestAndRelationshipError,
    }),
    shallowEqual,
  );

  const relationshipCreatedAtFormatted = moment(
    new Date(+relationshipCreatedAt),
  ).format('MMM DD, YYYY');

  const dispatch = useDispatch();

  function handleCancelLoverRequest() {
    dispatch(cancelSentLoverRequestAndRelationship());
  }

  return (
    <View style={styles.group}>
      <Text testID="menu-relationship-title" style={scene.titleCopy}>
        Relationship
      </Text>
      {isStringWithLength(loverId) && (
        <>
          <Text style={styles.label}>Lover</Text>
          <Text style={styles.value}>
            {loverFirstName} {loverLastName}
          </Text>
          {!loverIsPlaceholder && (
            <Text style={[styles.value, styles.valueSmall]}>
              {loverUsername}
            </Text>
          )}
          <Text style={[styles.value, styles.valueSmall]}>{loverEmail}</Text>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>{relationshipCreatedAtFormatted}</Text>
          <Text style={styles.label}>Options</Text>
          {loverIsPlaceholder ? (
            <>
              {isStringWithLength(userInviteId) ? (
                <>
                  <MenuLink
                    onPress={handleResendInvitePress}
                    iconName="md-send"
                    text="Resend Invite"
                    disabled={isCancelLoverRequestInFlight}
                  />
                  <MenuLink
                    onPress={handleCancelLoverRequest}
                    linkType={LINK_TYPE.DANGER}
                    iconName="md-alert"
                    text={
                      isCancelLoverRequestInFlight
                        ? 'Canceling…'
                        : 'Cancel Invite'
                    }
                    disabled={isCancelLoverRequestInFlight}
                  />
                </>
              ) : (
                <>
                  <MenuLink
                    onPress={handleResendLoverRequestPress}
                    iconName="md-send"
                    text="Resend Lover Request"
                    disabled={isCancelLoverRequestInFlight}
                  />
                  <MenuLink
                    onPress={handleCancelLoverRequest}
                    linkType={LINK_TYPE.DANGER}
                    iconName="md-alert"
                    text={
                      isCancelLoverRequestInFlight
                        ? 'Canceling…'
                        : 'Cancel Lover Request'
                    }
                    disabled={isCancelLoverRequestInFlight}
                  />
                </>
              )}
              {isStringWithLength(cancelLoverRequestError) && (
                <Well text={cancelLoverRequestError} />
              )}
              <Well
                type={WELL_TYPES.INFO}
                styles={{ marginTop: vars.gutterAndHalf }}
                text={`${loverFirstName} has not accepted your lover request yet. We'll let you know when ${loverFirstName} accepts!`}
              />
            </>
          ) : (
            <MenuLink
              onPress={openEndRelationshipModal}
              linkType={LINK_TYPE.DANGER}
              iconName="md-alert"
              text="End Relationship"
            />
          )}
        </>
      )}
      {!isStringWithLength(loverId) && !isStringWithLength(loverRequestId) && (
        <>
          <Well
            type={WELL_TYPES.INFO}
            text="You are not currently in a relationship. Send a lover request to get things started."
          />
          <Text style={styles.label}>Options</Text>
          <MenuLink
            onPress={handleSendLoverRequestPress}
            iconName="md-send"
            text="Search for Your Lover"
          />
          <MenuLink
            onPress={handleInviteLoverPress}
            iconName="md-send"
            text="Invite Lover"
          />
        </>
      )}
    </View>
  );
};

export default MenuRelationship;
