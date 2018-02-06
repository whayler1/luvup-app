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


const heartImgs = [
  require('../../images/hero/heart-sadest.png'),
  require('../../images/hero/heart-sad.png'),
  require('../../images/hero/heart-happy.png'),
  require('../../images/hero/heart-happiest.png'),
];

export default ({
  translateY,
  scale,
  coinTranslateY,
  coinOpacity,
  jalapenoTranslateY,
  jalapenoOpacity,
  panResponder,
  isModalOpen,
  modalMessage,
  closeModal,
  relationshipScoreQuartile,
}) => (
  <View
    style={styles.heartView}
    {...panResponder.panHandlers}
  >
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
      <Image
        source={heartImgs[relationshipScoreQuartile]}
        style={{
          width: 300,
          height: 275,
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
        marginLeft: -30,
        marginTop: -100,
        opacity: coinOpacity,
        transform: [{
          translateY: coinTranslateY
        }]
      }}
    >
      <Image
        source={require('../../images/coin.png')}
        style={{
          width: 60,
          height: 60,
        }}
      />
    </Animated.View>
    <Animated.View
      style={{
        position: 'absolute',
        width: 46,
        height: 60,
        left: '50%',
        top: '50%',
        marginLeft: -23,
        marginBottom: -150,
        opacity: jalapenoOpacity,
        transform: [{
          translateY: jalapenoTranslateY
        }]
      }}
    >
      <Image
        source={require('../../images/jalapeno.png')}
        style={{
          width: 46,
          height: 60,
        }}
      />
    </Animated.View>
    <Modal
      visible={isModalOpen}
      animationType={'slide'}
      onRequestClose={() => this.closeModal()}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <View style={{ alignItems: 'center', }}>
          {modalMessage === 'luvups' && <Text>You are allowed to send {config.maxItemsPerHour} Luvups per hour.</Text>}
          {modalMessage === 'jalapenos' && <Text>You are allowed to send {config.maxItemsPerHour} jalapenos per hour.</Text>}
          <Button
            raised
            onPress={closeModal}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={'Dismiss'}
          />
        </View>
      </View>
    </Modal>
  </View>
);
