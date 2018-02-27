import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import { scene, buttons, forms, modal, vars } from '../../styles';
import styles from './Menu.styles';
import ModalContentWrap from '../../components/ModalContentWrap';
import ChangePasswordModalContent from '../ChangePasswordModalContent';

export default ({
  userFirstName,
  userLastName,
  userEmail,
  loverFirstName,
  loverLastName,
  goToDashboard,
  relationshipCreatedAt,
  relationshipCreatedAtFormatted,
  onLogout,
  isModalVisible,
  modalType,
  onChangePasswordClick,
  closeModal,
}) => (
  <View style={scene.container}>
    <View
      style={scene.topNav}
    >
      <View style={scene.topNavContent}>
        <TouchableOpacity
          onPress={goToDashboard}
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
    </View>
    <View style={scene.content}>
      <ScrollView
        contentContainerStyle={{
          alignSelf: 'stretch',
          // paddingTop: 100,
          // backgroundColor: 'pink',
          // flex: 1,
        }}
      >
        <View>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{userFirstName} {userLastName}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userEmail}</Text>
          <Text style={styles.label}>Options</Text>
          <TouchableOpacity
            onPress={onChangePasswordClick}
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{
              color: vars.link,
              fontSize: 20,
            }}>
              Change Password
            </Text>
            <Icon
              name="md-unlock"
              size={22}
              color={vars.link}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{
              color: vars.link,
              fontSize: 20,
            }}>
              Change Email
            </Text>
            <Icon
              name="md-mail"
              size={22}
              color={vars.link}
            />
          </TouchableOpacity>
        </View>
        {relationshipCreatedAt.length > 0 &&
        <View style={styles.group}>
          <Text style={styles.title}>My Relationship</Text>
          <Text style={styles.label}>Lover</Text>
          <Text style={styles.value}>{loverFirstName} {loverLastName}</Text>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>{relationshipCreatedAtFormatted}</Text>
          <Text style={styles.label}>Options</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{
              color: vars.danger,
              fontSize: 20,
            }}>
              End Relationship
            </Text>
            <Icon
              name="md-alert"
              size={22}
              color={vars.danger}
            />
          </TouchableOpacity>
        </View>
        }
        <View style={{
          marginTop: 40,
        }}>
          <Button
            raised
            onPress={onLogout}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={'Log Out'}
          />
        </View>
      </ScrollView>
    </View>
    <ModalContentWrap
      visible={isModalVisible}
    >
      {modalType === 'changePassword' &&
        <ChangePasswordModalContent
          closeModal={closeModal}
        />
      }
    </ModalContentWrap>
  </View>
);
