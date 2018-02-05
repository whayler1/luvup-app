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
  ART,
} from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

import styles from './Hero.styles';
import { buttons, forms, scene } from '../../styles';
import config from '../../config';
const {
    Group,
    Shape,
    Surface,
    Transform,
} = ReactArt;

class Circle extends React.Component {
  render() {
    const {radius, ...rest} = this.props

    const circle = ART.Path()
      .move(radius, 0)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)

    return <ART.Shape {...rest} d={circle} />
  }
}

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
      <Surface
        width={143}
        height={61}
      >
        <Group>
          <Shape
            stroke="blue"
            strokeWidth={4}
            d={"M23.5,45.5 C39.0677083,27.8020833 57.5677083,18.953125 79,18.953125 C100.432292,18.953125 118.932292,27.8020833 134.5,45.5"}
          />
          <Shape
            stroke="blue"
            strokeWidth={4}
            d={"M18.5,38.5 L0.5,26.5"}
          />
          <Shape
            stroke="blue"
            strokeWidth={4}
            d={"M32.5,25.5 L13,4"}
          />
          <Shape
            stroke="blue"
            strokeWidth={4}
            d={"M46.5,17.5 L37,0"}
          />
        </Group>
        <Group x={70} y={30}>
          <Circle radius={10} fill={'blue'} />
        </Group>
      </Surface>
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
