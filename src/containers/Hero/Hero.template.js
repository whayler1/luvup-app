import React, { Fragment } from 'react';
import ReactArt from 'ReactNativeART';
import { View, Text, TextInput, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Hero.styles';
import { buttons, forms, scene, vars } from '../../styles';
import config from '../../config';
import HeroEye from '../../components/HeroEye';
import HeroMouth from '../../components/HeroMouth';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import HeartArt from '../../components/Art/HeartArt';
import Well from '../../components/Well';
import getRelationshipScoreFill from '../../helpers/getRelationshipScoreFill';

const heartImgs = [
  require('../../images/hero/heart-sadest.png'),
  require('../../images/hero/heart-sad.png'),
  require('../../images/hero/heart-happy.png'),
  require('../../images/hero/heart-happiest.png'),
];

export default ({
  heartFill,
  translateY,
  scale,
  scaleBGHeart,
  coinTranslateY,
  coinOpacity,
  jalapenoTranslateY,
  jalapenoOpacity,
  panResponder,
  relationshipScoreQuartile,
  dragDirection,
  recentlySentCoinCount,
  recentlySentJalapenoCount,
  directionsOpacity,
  isInRelationship,
  loverRequestFirstName,
  loverRequestLastName,
  loverRequestCreatedAtTimeAgo,
  cancelLoverRequest,
  resendLoverRequestEmail,
  error,
  isCancelInFlight,
  isResendSuccess,
  resendIsInFlight,
}) => {
  if (!isInRelationship) {
    return (
      <View style={styles.heartView}>
        <View
          style={{
            width: 300,
            height: 275,
            zIndex: 10,
          }}>
          <Image
            source={heartImgs[0]}
            style={{
              width: 300,
              height: 275,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="ios-send-outline" size={190} color="white" />
          </View>
        </View>
        <View
          style={{
            marginTop: 32,
            alignItems: 'center',
          }}>
          {loverRequestFirstName ? (
            <Fragment>
              <Text style={styles.loverRequestText}>
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
          <View
            style={{
              alignSelf: 'stretch',
              paddingHorizontal: 16,
              paddingTop: 8,
            }}>
            <Well text="There was an error cancelling your lover request. If the problem persists please contact justin@luvup.io" />
          </View>
        )}
        {error === 'resend-error' && (
          <View
            style={{
              alignSelf: 'stretch',
              paddingHorizontal: 16,
              paddingTop: 8,
            }}>
            <Well text="There was an error resending your lover request. If the problem persists please contact justin@luvup.io" />
          </View>
        )}
        {isResendSuccess && (
          <View
            style={{
              alignSelf: 'stretch',
              paddingHorizontal: 16,
              paddingTop: 8,
            }}>
            <Well type="success" text="Your lover request was resent!" />
          </View>
        )}
        <View style={forms.buttonRow}>
          <View style={[forms.buttonCell2ColLeft, { paddingLeft: 16 }]}>
            <Button
              onPress={cancelLoverRequest}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.secondarySkeletonButton}
              textStyle={buttons.secondarySkeletonText}
              disabled={isCancelInFlight || resendIsInFlight}
              title={isCancelInFlight ? 'Cancelling…' : 'Cancel'}
            />
          </View>
          <View style={[forms.buttonCell2ColRight, { paddingRight: 16 }]}>
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
  }
  return (
    <View style={styles.heartView} {...panResponder.panHandlers}>
      <Animated.View
        style={{
          marginBottom: 32,
          opacity: directionsOpacity,
          alignItems: 'center',
        }}>
        <Icon name="md-arrow-round-up" size={30} color={vars.p} />
        <Text style={styles.directionsText}>Swipe up to</Text>
        <Text style={styles.directionsText}>send a Luvup</Text>
      </Animated.View>
      <Animated.View
        style={{
          width: 300,
          height: 275,
          zIndex: 10,
          transform: [
            {
              translateY,
            },
            {
              scaleX: scale,
            },
            {
              scaleY: scale,
            },
          ],
        }}>
        <Animated.View
          style={{
            width: 300,
            height: 275,
            transform: [
              {
                scaleX: scaleBGHeart,
              },
              {
                scaleY: scaleBGHeart,
              },
            ],
          }}>
          <HeartArt fill={heartFill} scale={0.3367} />
        </Animated.View>
        <View
          style={{
            position: 'absolute',
            left: 40,
            top: 60,
          }}>
          <HeroEye />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 40,
            top: 60,
            transform: [
              {
                scaleX: -1,
              },
            ],
          }}>
          <HeroEye />
        </View>
        <View
          style={{
            position: 'absolute',
            left: 110,
            top: 170,
          }}>
          <HeroMouth
            relationshipScoreQuartile={relationshipScoreQuartile}
            dragDirection={dragDirection}
          />
        </View>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          left: '50%',
          top: '50%',
          marginLeft: -40,
          marginTop: -100,
          opacity: coinOpacity,
          transform: [
            {
              translateY: coinTranslateY,
            },
          ],
        }}>
        <CoinArt recentlySentCoinCount={recentlySentCoinCount} />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -38,
          marginBottom: -150,
          opacity: jalapenoOpacity,
          transform: [
            {
              translateY: jalapenoTranslateY,
            },
          ],
        }}>
        <JalapenoArt recentlySentJalapenoCount={recentlySentJalapenoCount} />
      </Animated.View>
      <Animated.View
        style={{
          marginTop: 32,
          opacity: directionsOpacity,
          alignItems: 'center',
        }}>
        <Text style={styles.directionsText}>Swipe down to</Text>
        <Text style={styles.directionsText}>send a Jalapeño</Text>
        <Icon name="md-arrow-round-down" size={30} color={vars.p} />
      </Animated.View>
    </View>
  );
};
