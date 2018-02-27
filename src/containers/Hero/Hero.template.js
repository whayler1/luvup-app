import React from 'react';
import ReactArt from 'ReactNativeART';
import {
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Modal,
  TabBarIOS,
} from 'react-native';
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

const heartImgs = [
  require('../../images/hero/heart-sadest.png'),
  require('../../images/hero/heart-sad.png'),
  require('../../images/hero/heart-happy.png'),
  require('../../images/hero/heart-happiest.png'),
];

export default ({
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
}) => {
  if (!isInRelationship) {
    return (
      <View style={styles.heartView}>
        <View
          style={{
            width: 300,
            height: 275,
            zIndex: 10,
          }}
        >
          <Image
            source={heartImgs[0]}
            style={{
              width: 300,
              height: 275,
            }}
          />
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Icon
              name="ios-send-outline"
              size={190}
              color="white"
            />
          </View>
        </View>
        <View style={{
          marginTop: 32,
          alignItems: 'center',
        }}>
          <Text style={styles.loverRequestText}>Your lover request was sent to</Text>
          <Text style={styles.loverRequestTextLarge}>{loverRequestFirstName + ' ' + loverRequestLastName}</Text>
          <Text style={styles.loverRequestText}>{loverRequestCreatedAtTimeAgo}</Text>
        </View>
        <View style={forms.buttonRow}>
          <View style={[forms.buttonCell2ColLeft, { paddingLeft: 16 }]}>
            <Button
              onPress={cancelLoverRequest}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.secondarySkeletonButton}
              textStyle={buttons.secondarySkeletonText}
              disabled={false}
              title="Cancel"
            />
          </View>
          <View style={[forms.buttonCell2ColRight, { paddingRight: 16 }]}>
            <Button
              onPress={() => {}}
              containerViewStyle={buttons.infoContainer}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              disabled={false}
              title="Resend"
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View
      style={styles.heartView}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          marginBottom: 32,
          opacity: directionsOpacity,
          alignItems: 'center',
        }}
      >
        <Icon
          name="md-arrow-round-up"
          size={30}
          color={vars.p}
        />
        <Text style={styles.directionsText}>Swipe up to</Text>
        <Text style={styles.directionsText}>send a Luvup</Text>
      </Animated.View>
      <Animated.View
        style={{
          width: 300,
          height: 275,
          zIndex: 10,
          transform: [{
            translateY
          }, {
            scaleX: scale
          }, {
            scaleY: scale
          }]
        }}
      >
        <Animated.Image
          source={heartImgs[relationshipScoreQuartile]}
          style={{
            width: 300,
            height: 275,
            transform: [{
              scaleX: scaleBGHeart
            }, {
              scaleY: scaleBGHeart
            }]
          }}
        />
        <View style={{
          position: 'absolute',
          left: 40,
          top: 60
        }}>
          <HeroEye/>
        </View>
        <View style={{
          position: 'absolute',
          right: 40,
          top: 60,
          transform: [{
            scaleX: -1
          }]
        }}>
          <HeroEye/>
        </View>
        <View style={{
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
          transform: [{
            translateY: coinTranslateY
          }]
        }}
      >
        <CoinArt
          recentlySentCoinCount={recentlySentCoinCount}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -38,
          marginBottom: -150,
          opacity: jalapenoOpacity,
          transform: [{
            translateY: jalapenoTranslateY
          }]
        }}
      >
        <JalapenoArt
          recentlySentJalapenoCount={recentlySentJalapenoCount}
        />
      </Animated.View>
      <Animated.View
        style={{
          marginTop: 32,
          opacity: directionsOpacity,
          alignItems: 'center',
        }}
      >
        <Text style={styles.directionsText}>Swipe down to</Text>
        <Text style={styles.directionsText}>send a Jalapeno</Text>
        <Icon
          name="md-arrow-round-down"
          size={30}
          color={vars.p}
        />
      </Animated.View>
    </View>
  );
};
