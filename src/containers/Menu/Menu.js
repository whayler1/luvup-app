import React, { PureComponent, Fragment } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import analytics from '../../services/analytics';
import { scene, forms, modal, vars } from '../../styles';
import styles from './Menu.styles';
import ModalContentWrap from '../../components/ModalContentWrap';
import Button, { BUTTON_STYLES } from '../../components/Button';
import ChangePasswordModalContent from '../ChangePasswordModalContent';
import { logout as logoutAction } from '../../redux/user/user.actions';
import { endRelationship as endRelationshipAction } from '../../redux/relationship/relationship.actions';

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      relationshipCreatedAtFormatted: moment(
        new Date(props.relationshipCreatedAt)
      ).format('MMM DD, YYYY'),
      isModalVisible: false,
      modalType: '',
      isInFlight: false,
      error: '',
    };
  }

  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userEmail: PropTypes.string,
    userId: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    loverId: PropTypes.string,
    relationshipCreatedAt: PropTypes.string,
    logout: PropTypes.func.isRequired,
    endRelationship: PropTypes.func.isRequired,
    loverRequestId: PropTypes.string,
  };

  goBack = () => {
    Actions.pop();
  };

  onChangePasswordClick = () =>
    this.setState({
      isModalVisible: true,
      modalType: 'changePassword',
    });
  openEndRelationshipModal = () =>
    this.setState({
      isModalVisible: true,
      modalType: 'endRelationship',
    });
  closeModal = () => this.setState({ isModalVisible: false });

  onLogout = async () => {
    await this.props.logout();

    Actions.login();
  };

  goToCreateLoverRequest = () => Actions.createloverrequest();
  goToDashboard = () => Actions.dashboard();

  endRelationship = async () => {
    this.setState({ isInFlight: true });
    const res = await this.props.endRelationship();
    const relationship = _.at(res, 'body.data.endRelationship.relationship')[0];
    if (_.isObject(relationship) && relationship.id) {
      this.setState(
        {
          isModalVisible: false,
        },
        () => Actions.createloverrequest()
      );
    } else {
      this.setState({
        error: 'end-relationship',
        isInFlight: false,
      });
    }
  };

  componentDidMount() {
    analytics.screen({
      userId: this.props.userId,
      name: 'Menu',
    });
  }

  render() {
    const {
      props: {
        userFirstName,
        userLastName,
        userEmail,
        loverFirstName,
        loverLastName,
        loverId,
        loverRequestId,
      },
      state: {
        relationshipCreatedAtFormatted,
        isModalVisible,
        modalType,
        isInFlight,
      },
      goBack,
      onLogout,
      onChangePasswordClick,
      openEndRelationshipModal,
      closeModal,
      endRelationship,
      goToCreateLoverRequest,
      goToDashboard,
    } = this;
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
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
          <ScrollView
            style={{
              alignSelf: 'stretch',
              paddingVertical: vars.gutter,
              paddingHorizontal: vars.gutter,
              flex: 1,
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
                  <Text style={styles.value}>
                    {relationshipCreatedAtFormatted}
                  </Text>
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
              <Button onPress={onLogout} title="Log Out" />
            </View>
          </ScrollView>
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
                      buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
                      title="Close"
                      disabled={isInFlight}
                    />
                  </View>
                  <View style={forms.buttonCell2ColRight}>
                    <Button
                      onPress={endRelationship}
                      buttonStyles={BUTTON_STYLES.DANGER}
                      title="End"
                      isInFlight={isInFlight}
                    />
                  </View>
                </View>
              </View>
            )}
          </ModalContentWrap>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    userId: state.user.id,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    loverId: state.lover.id,
    relationshipCreatedAt: state.relationship.createdAt,
    loverRequestId: state.loverRequest.id,
  }),
  {
    logout: logoutAction,
    endRelationship: endRelationshipAction,
  }
)(Menu);
