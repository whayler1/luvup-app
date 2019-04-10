import React, { Fragment } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { buttons, scene, vars } from '../../styles';
import styles from './DashboardNoRelationship.styles';
import HeartArt from '../../components/Art/HeartArt';
import DashboardNotificationRequestSent from './DashboardNotificationRequestSent';
import DashboardNotificationReceivedLoverRequests from './DashboardNotificationReceivedLoverRequests';
import { LoverRequestType } from '../../types';

const handleLoverRequestPress = () => {
  Actions.createloverrequest();
};

const DashboardNoRelationship = ({
  loverRequestCreatedAt,
  receivedLoverRequests,
}) => {
  const isLoverRequestSent =
    _.isString(loverRequestCreatedAt) && loverRequestCreatedAt.length > 0;
  const isLoverRequestReceived =
    _.isArray(receivedLoverRequests) && receivedLoverRequests.length > 0;
  const isPluralReceivedLoverRequests =
    _.isArray(receivedLoverRequests) && receivedLoverRequests.length > 1;
  const isLoverRequestSentOrReceived =
    isLoverRequestSent || isLoverRequestReceived;
  return (
    <View style={scene.content}>
      <View style={[scene.contentTop, styles.contentTop]}>
        {isLoverRequestSent && <DashboardNotificationRequestSent />}
        {!isLoverRequestSent && isLoverRequestReceived && (
          <Fragment>
            <Text style={[scene.largeCopy, scene.textCenter]}>
              You received {isPluralReceivedLoverRequests ? '' : 'a'} lover
              request{isPluralReceivedLoverRequests ? 's' : ''}!
            </Text>
            <Text
              style={[scene.bodyCopy, scene.textCenter, styles.subPromptCopy]}>
              Accept {isPluralReceivedLoverRequests ? 'a ' : 'your '}lover
              request to start a new relationship. If {"it's"} someone else
              {" you're"} looking for click below to search for your lover.
            </Text>
          </Fragment>
        )}
        {isLoverRequestReceived && (
          <DashboardNotificationReceivedLoverRequests
            receivedLoverRequests={receivedLoverRequests}
          />
        )}
        {!isLoverRequestSentOrReceived && (
          <Fragment>
            <HeartArt fill={vars.blueGrey100} scale={0.1} />
            <Text style={[scene.titleCopy, scene.textCenter, styles.titleCopy]}>
              Welcome to Luvup!
            </Text>
            <Text
              style={[scene.largeCopy, scene.textCenter, styles.sloganCopy]}>
              Reinvest in Your Relationship
            </Text>
            <Text
              style={[scene.largeCopy, scene.textCenter, styles.promptCopy]}>
              The first step is to connect with your lover (digitally)
            </Text>
            <Text
              style={[scene.bodyCopy, scene.textCenter, styles.subPromptCopy]}>
              Choose an option below to get things started
            </Text>
          </Fragment>
        )}
      </View>
      {!isLoverRequestSent && (
        <View style={scene.contentBottom}>
          <Button
            onPress={handleLoverRequestPress}
            containerViewStyle={[buttons.infoContainer, styles.button]}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title="Search for Your Lover"
          />
        </View>
      )}
    </View>
  );
};

DashboardNoRelationship.propTypes = {
  loverRequestCreatedAt: PropTypes.string,
  receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
};

export default DashboardNoRelationship;
