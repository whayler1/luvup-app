import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

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
  loverId,
  goBack,
  relationshipCreatedAtFormatted,
  onLogout,
  isModalVisible,
  isInFlight,
  modalType,
  onChangePasswordClick,
  openEndRelationshipModal,
  closeModal,
  endRelationship,
  goToCreateLoverRequest,
  goToDashboard,
  loverRequestId,
}) => (
  <View style={scene.container}>
    <View style={scene.topNav}>
      <View style={scene.topNavContent}>
        <TouchableOpacity onPress={goBack}>
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
        }}>
        <View>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {userFirstName} {userLastName}
          </Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userEmail}</Text>
          <Text style={styles.label}>Options</Text>
          <TouchableOpacity
            onPress={onChangePasswordClick}
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: vars.link,
                fontSize: 20,
              }}>
              Change Password
            </Text>
            <Ionicons name="md-unlock" size={22} color={vars.link} />
          </TouchableOpacity>
          {/* <TouchableOpacity
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
            <Ionicons
              name="md-mail"
              size={22}
              color={vars.link}
            />
          </TouchableOpacity> */}
        </View>

        <View style={styles.group}>
          <Text style={styles.title}>Relationship</Text>
          {_.isString(loverId) && loverId.length > 0 && (
            <Fragment>
              <Text style={styles.label}>Lover</Text>
              <Text style={styles.value}>
                {loverFirstName} {loverLastName}
              </Text>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{relationshipCreatedAtFormatted}</Text>
              <Text style={styles.label}>Options</Text>
              <TouchableOpacity
                onPress={openEndRelationshipModal}
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: vars.danger,
                    fontSize: 20,
                  }}>
                  End Relationship
                </Text>
                <Ionicons name="md-alert" size={22} color={vars.danger} />
              </TouchableOpacity>
            </Fragment>
          )}
          {_.isString(loverId) &&
            loverId.length < 1 &&
            _.isString(loverRequestId) &&
            loverRequestId.length < 1 && (
              <Fragment>
                <Text style={styles.label}>Options</Text>
                <TouchableOpacity
                  onPress={goToCreateLoverRequest}
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: vars.link,
                      fontSize: 20,
                    }}>
                    Send Lover Request
                  </Text>
                  <Ionicons name="md-send" size={22} color={vars.link} />
                </TouchableOpacity>
              </Fragment>
            )}
          {_.isString(loverId) &&
            loverId.length < 1 &&
            _.isString(loverRequestId) &&
            loverRequestId.length > 0 && (
              <Fragment>
                <Text style={styles.label}>Options</Text>
                <TouchableOpacity
                  onPress={goToDashboard}
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: vars.link,
                      fontSize: 20,
                    }}>
                    View Pending Lover Request
                  </Text>
                  <Ionicons name="md-send" size={22} color={vars.link} />
                </TouchableOpacity>
              </Fragment>
            )}
        </View>
        <View
          style={{
            marginTop: 40,
          }}
          testID="menu-logout">
          <Button
            onPress={onLogout}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={'Log Out'}
          />
        </View>
      </ScrollView>
    </View>
    <ModalContentWrap visible={isModalVisible}>
      {modalType === 'changePassword' && (
        <ChangePasswordModalContent closeModal={closeModal} />
      )}
      {modalType === 'endRelationship' && (
        <View
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
          }}>
          <Ionicons name="md-alert" size={60} color={vars.danger} />
          <Text style={modal.title}>End Relationship</Text>
          <Text style={modal.copy}>This can not be undone!</Text>
          <View style={forms.buttonRow}>
            <View style={forms.buttonCell2ColLeft}>
              <Button
                onPress={closeModal}
                containerViewStyle={buttons.container}
                buttonStyle={buttons.secondarySkeletonButton}
                textStyle={buttons.secondarySkeletonText}
                title="Close"
                disabled={isInFlight}
              />
            </View>
            <View style={forms.buttonCell2ColRight}>
              <Button
                onPress={endRelationship}
                containerViewStyle={buttons.container}
                buttonStyle={buttons.dangerButton}
                textStyle={buttons.text}
                title={isInFlight ? 'Ending…' : 'End'}
                disabled={isInFlight}
              />
            </View>
          </View>
        </View>
      )}
    </ModalContentWrap>
  </View>
);
