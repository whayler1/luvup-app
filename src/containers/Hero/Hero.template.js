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

import styles from './Hero.styles';
import { buttons, forms, scene } from '../../styles';
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
}) => (
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
    </Animated.View>
  </View>
);
