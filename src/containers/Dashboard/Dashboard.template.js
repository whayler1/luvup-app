import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';

import styles from './Dashboard.styles';
import { buttons, forms, scene, vars } from '../../styles';
import config from '../../config';
import DashboardTopNav from '../../components/DashboardTopNav';
import CoinArt from '../../components/CoinArt';
import Hero from '../Hero';

export default ({
  userFirstName,
  userLastName,
  username,
  loverFirstName,
  loverLastName,
  loverUsername,
  loverRequestUsername,
  loverRequestCreatedAt,
  coinCount,
  jalapenoCount,
  isFontLoaded,
  coinsAvailableTime,
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <DashboardTopNav
      coinCount={coinCount}
      jalapenoCount={jalapenoCount}
      userFirstName={userFirstName}
      userLastName={userLastName}
      loverFirstName={loverFirstName}
      loverLastName={loverLastName}
    />
    {loverRequestUsername.length > 0 && <Text>You sent a loverRequest to {loverRequestUsername} {moment(new Date(loverRequestCreatedAt)).fromNow()}</Text>}
    <Hero/>
    <Modal
      visible={true}
      animationType={'fade'}
      onRequestClose={() => {}}
      transparent={true}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 16,
      }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 2,
          borderColor: vars.blueGrey100,
          borderWidth: 1,
          padding: 16,
          shadowColor: vars.blueGrey500,
          shadowOpacity: 0.3,
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 2,
        }}>
          <View>
            <CoinArt
              recentlySentCoinCount={15}
            />
          </View>
          <View style={{
            marginTop: 16,
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: vars.fontBlack,
              fontSize: 30,
              textAlign: 'center',
              color: vars.p,
            }}>
              Hourly Luvup Limit Exceeded
            </Text>
            <Text style={{
              fontFamily: vars.fontRegular,
              fontSize: 20,
              marginTop: 16,
              color: vars.p,
            }}>
              Wow! {userFirstName} must be on fire right now. You{"'"}ve sent the max hourly limit of 15 luvups. You{"'"}ll have the opportunity to send more luvups {coinsAvailableTime}.
            </Text>
          </View>
          <View style={{
            marginTop: 32,
            alignSelf: 'stretch'
          }}>
            <Button
              raised
              onPress={() => {}}
              containerViewStyle={buttons.infoContainer}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title='Dismiss'
            />
          </View>
        </View>
      </View>
    </Modal>
  </View>
);
