import React, { PureComponent, Fragment } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import { isStringWithLength } from '../../helpers';
import analytics from '../../services/analytics';
import { scene, forms, modal, vars } from '../../styles';
import styles from './Menu.styles';
import ModalContentWrap from '../../components/ModalContentWrap';
import HeartArt from '../../components/Art/HeartArt';
import Well, { WELL_TYPES } from '../../components/Well';
import Button, { BUTTON_STYLES } from '../../components/Button';
import MenuLink, { LINK_TYPE } from './MenuLink';
import ChangePasswordModalContent from '../ChangePasswordModalContent';
import { logout as logoutAction } from '../../redux/user/user.actions';
import { endRelationship as endRelationshipAction } from '../../redux/relationship/relationship.actions';
import { getUserInvite } from '../../redux/userInvite/userInvite.actions';
import { cancelSentLoverRequestAndRelationship as cancelLoverRequestAction } from '../../redux/loverRequest/loverRequest.actions';
import { store } from '../../redux';

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
    userInviteId: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    loverId: PropTypes.string,
    loverIsPlaceholder: PropTypes.bool,
    relationshipCreatedAt: PropTypes.string,
    logout: PropTypes.func.isRequired,
    endRelationship: PropTypes.func.isRequired,
    loverRequestId: PropTypes.string,
    cancelLoverRequest: PropTypes.func.isRequired,
    isCancelLoverRequestInFlight: PropTypes.bool.isRequired,
    cancelLoverRequestError: PropTypes.string.isRequired,
  };

  static async onEnter() {
    const {
      lover: { isPlaceholder },
      userInvite: { id: userInviteId },
    } = store.getState();
    if (isPlaceholder && !isStringWithLength(userInviteId)) {
      await store.dispatch(getUserInvite());
    }
  }

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

    Actions.reset('login');
  };

  goToCreateLoverRequest = () => {
    Actions.createloverrequest();
  };
  goToResendLoverRequest = () => {
    Actions.resendLoverRequest();
  };
  handleResendInvitePress = () => {
    //
  };
  handleCancelLoverRequest = () => {
    this.props.cancelLoverRequest();
  };

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

  renderUnacceptedLoverRequestUi = () => {
    const {
      props: {
        userInviteId,
        loverFirstName,
        isCancelLoverRequestInFlight,
        cancelLoverRequestError,
      },
      goToResendLoverRequest,
      handleCancelLoverRequest,
      handleResendInvitePress,
    } = this;
    return (
      <Fragment>
        {isStringWithLength(userInviteId) ? (
          <Fragment>
            <MenuLink
              onPress={handleResendInvitePress}
              iconName="md-send"
              text="Resend Invite"
              disabled={isCancelLoverRequestInFlight}
            />
            <MenuLink
              onPress={handleCancelLoverRequest}
              linkType={LINK_TYPE.DANGER}
              iconName="md-alert"
              text={
                isCancelLoverRequestInFlight ? 'Canceling…' : 'Cancel Invite'
              }
              disabled={isCancelLoverRequestInFlight}
            />
          </Fragment>
        ) : (
          <Fragment>
            <MenuLink
              onPress={goToResendLoverRequest}
              iconName="md-send"
              text="Resend Lover Request"
              disabled={isCancelLoverRequestInFlight}
            />
            <MenuLink
              onPress={handleCancelLoverRequest}
              linkType={LINK_TYPE.DANGER}
              iconName="md-alert"
              text={
                isCancelLoverRequestInFlight
                  ? 'Canceling…'
                  : 'Cancel Lover Request'
              }
              disabled={isCancelLoverRequestInFlight}
            />
          </Fragment>
        )}
        {_.isString(cancelLoverRequestError) &&
          cancelLoverRequestError.length > 0 && (
            <Well text={cancelLoverRequestError} />
          )}
        <Well
          type={WELL_TYPES.INFO}
          styles={{ marginTop: vars.gutterAndHalf }}
          text={`${loverFirstName} has not accepted your lover request yet. We'll let you know when ${loverFirstName} accepts!`}
        />
      </Fragment>
    );
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
        loverIsPlaceholder,
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
    } = this;
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
        <View style={scene.container}>
          <View style={[scene.topNav, styles.topNav]}>
            <View style={scene.topNavContent}>
              <TouchableOpacity onPress={goBack}>
                <HeartArt scale={0.037} fill={vars.blueGrey500} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            testID="menu-scrollview"
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <View>
              <Text style={scene.titleCopy}>Profile</Text>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>
                {userFirstName} {userLastName}
              </Text>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{userEmail}</Text>
              <Text style={styles.label}>Options</Text>
              <MenuLink
                onPress={onChangePasswordClick}
                iconName="md-unlock"
                text="Change Password"
              />
            </View>

            <View style={styles.group}>
              <Text testID="menu-relationship-title" style={scene.titleCopy}>
                Relationship
              </Text>
              {isStringWithLength(loverId) && (
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
                  {loverIsPlaceholder ? (
                    this.renderUnacceptedLoverRequestUi()
                  ) : (
                    <MenuLink
                      onPress={openEndRelationshipModal}
                      linkType={LINK_TYPE.DANGER}
                      iconName="md-alert"
                      text="End Relationship"
                    />
                  )}
                </Fragment>
              )}
              {!isStringWithLength(loverId) &&
                !isStringWithLength(loverRequestId) && (
                  <Fragment>
                    <Well
                      type={WELL_TYPES.INFO}
                      text="You are not currently in a relationship. Send a lover request to get things started."
                    />
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
    userInviteId: state.userInvite.id,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    loverId: state.lover.id,
    loverIsPlaceholder: state.lover.isPlaceholder,
    relationshipCreatedAt: state.relationship.createdAt,
    loverRequestId: state.loverRequest.id,
    isCancelLoverRequestInFlight:
      state.loverRequest.isCancelSentLoverRequestAndRelationshipInFlight,
    cancelLoverRequestError:
      state.loverRequest.cancelSentLoverRequestAndRelationshipError,
  }),
  {
    logout: logoutAction,
    endRelationship: endRelationshipAction,
    cancelLoverRequest: cancelLoverRequestAction,
  }
)(Menu);
