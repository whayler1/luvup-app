import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  Header,
} from 'react-native';

import { buttons, forms, scene, vars } from '../../styles';

import heartImg from '../../images/heart.png';
import jalapenoImg from '../../images/jalapeno.png';
import jalapenoSentImg from '../../images/jalapeno-sent.png';
import jalapenoReceivedImg from '../../images/jalapeno-received.png';
import coinImg from '../../images/coin.png';
import coinSentImg from '../../images/coin-sent.png';
import coinReceivedImg from '../../images/coin-received.png';

const getEventDisplayName = (eventName, count) => {
  const plur = count > 1 ? 's' : '';

  switch (eventName) {
    case 'coin-sent':
      return `Coin${plur} sent`;
    case 'coin-received':
      return `Coin${plur} received`;
    case 'jalapeno-sent':
      return `Jalapeno${plur} sent`;
    case 'jalapeno-received':
      return `Jalapeno${plur} received`;
    default:
      return eventName;
  }
};
const getEventImage = eventName => {
  switch (eventName) {
    case 'coin-sent':
      return (
        <Image
          style={{
            width: 32,
            height: 25,
          }}
          source={coinSentImg}
        />
      );
    case 'coin-received':
      return (
        <Image
          style={{
            width: 31,
            height: 25,
          }}
          source={coinReceivedImg}
        />
      );
    case 'jalapeno-sent':
    return (
      <Image
        style={{
          width: 24,
          height: 25,
        }}
        source={jalapenoSentImg}
      />
    );
    case 'jalapeno-received':
      return (
        <Image
          style={{
            width: 26,
            height: 25,
          }}
          source={jalapenoReceivedImg}
        />
      );
    default:
      return '';
  }
};

const keyExtractor = item => item.id;

export default ({
  sentCoinsCount,
  sentJalapenosCount,
  userEvents,
  goToDashboard,
  sections,
}) => (
  <View style={scene.container}>
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingTop: 40,
      }}
    >
      <TouchableOpacity
        onPress={goToDashboard}
        style={{
          paddingRight: 10,
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Image
          source={require('../../images/heart.png')}
          style={{
            width: 32,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
    <View
      style={{
        marginTop: 100,
        alignSelf: 'stretch',
      }}
    >
      <Text>Timeline {sentCoinsCount}, { sentJalapenosCount}</Text>
      <SectionList
        style={{
          alignSelf: 'stretch',
        }}
        renderItem={({item}) => (
          <View style={{
            padding:16,
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: vars.blueGrey50,
            borderBottomWidth: 1,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              {getEventImage(item.name)}
              <Text style={{
                color: vars.blueGrey500,
                fontSize: 20,
                paddingLeft: 8,
                fontFamily: vars.fontRegular,
              }}>
                {item.count} {getEventDisplayName(item.name, item.count)}
              </Text>
            </View>
            <View>
              <Text style={{
                color: vars.blueGrey500,
                fontSize: 14,
                fontFamily: vars.fontRegular
              }}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={{
            padding: 16,
            borderBottomColor: vars.blueGrey100,
            borderBottomWidth: 1,
            alignSelf: 'stretch',
            backgroundColor: 'white',
          }}>
            <Text style={{
              color: vars.blueGrey500,
              fontSize: 20,
              fontFamily: vars.fontRegular,
            }}>{section.title}</Text>
          </View>
        )}
        sections={sections}
      />
    </View>
  </View>
);
