import React, { Fragment } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import styles from './Hero.styles';
import { buttons, forms, vars } from '../../styles';
import HeroEye from '../../components/HeroEye';
import HeroMouth from '../../components/HeroMouth';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';
import HeartArt from '../../components/Art/HeartArt';
import TearDropArt from '../../components/Art/TearDropArt';

import Well from '../../components/Well';
import heartImg from '../../images/hero/heart-sadest.png';

export default ({
  heartFill,
  tearDropAOpacity,
  tearDropATranslateY,
  tearDropBOpacity,
  tearDropBTranslateY,
  translateY,
  heartTranslateY,
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
            source={heartImg}
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
            <Ionicons name="ios-send" size={190} color={vars.cottonCandy} />
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
        <Ionicons name="md-arrow-round-up" size={30} color={vars.p} />
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
                translateY: heartTranslateY,
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
            <HeartArt animatedFillPct={heartFill} scale={0.3367} />
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              left: 38,
              top: 60,
            }}>
            <HeroEye />
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              left: 105,
              top: 90,
              opacity: tearDropAOpacity,
              transform: [
                {
                  translateY: tearDropATranslateY,
                },
              ],
            }}>
            <TearDropArt fill="white" scale={0.2} />
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              right: 42,
              top: 60,
              transform: [
                {
                  scaleX: -1,
                },
              ],
            }}>
            <HeroEye />
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              left: 181,
              top: 90,
              opacity: tearDropBOpacity,
              transform: [
                {
                  translateY: tearDropBTranslateY,
                },
              ],
            }}>
            <TearDropArt fill="white" scale={0.2} />
          </Animated.View>
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
        <Ionicons name="md-arrow-round-down" size={30} color={vars.p} />
      </Animated.View>
    </View>
  );
};
