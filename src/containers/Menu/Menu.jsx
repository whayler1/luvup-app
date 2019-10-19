import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import MenuLink from './MenuLink';
import Button, { BUTTON_STYLES } from '../../components/Button';
import ChangePasswordModalContent from '../ChangePasswordModalContent';
import MenuReceivedLoverRequests from './MenuReceivedLoverRequests';
import MenuRelationship from './MenuRelationship';
import { logout as logoutAction } from '../../redux/user/user.actions';
import { endRelationship as endRelationshipAction } from '../../redux/relationship/relationship.actions';
import { getUserInvite } from '../../redux/userInvite/userInvite.actions';
import { store } from '../../redux';

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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
    logout: PropTypes.func.isRequired,
    endRelationship: PropTypes.func.isRequired,
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

  handleBackPress = () => {
    Actions.pop();
  };

  handleChangePasswordPress = () => {
    this.setState({
      isModalVisible: true,
      modalType: 'changePassword',
    });
  };
  openEndRelationshipModal = () => {
    this.setState({
      isModalVisible: true,
      modalType: 'endRelationship',
    });
  };
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  handleLogout = async () => {
    await this.props.logout();

    Actions.reset('login');
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

  componentDidMount() {
    analytics.screen({
      userId: this.props.userId,
      name: 'Menu',
    });
  }

  render() {
    const {
      props: { userFirstName, userLastName, userEmail },
      state: { isModalVisible, modalType, isInFlight },
      handleBackPress,
      handleLogout,
      handleChangePasswordPress,
      openEndRelationshipModal,
      closeModal,
      endRelationship,
    } = this;

    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
        <View style={scene.container}>
          <View style={[scene.topNav, styles.topNav]}>
            <View style={scene.topNavContent}>
              <TouchableOpacity onPress={handleBackPress}>
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
                onPress={handleChangePasswordPress}
                iconName="md-unlock"
                text="Change Password"
              />
            </View>

            <MenuRelationship
              openEndRelationshipModal={openEndRelationshipModal}
            />
            <MenuReceivedLoverRequests />
            <View style={styles.menuLogoutWrap} testID="menu-logout">
              <Button onPress={handleLogout} title="Log Out" />
            </View>
          </ScrollView>
          <ModalContentWrap visible={isModalVisible}>
            {modalType === 'changePassword' && (
              <ChangePasswordModalContent closeModal={closeModal} />
            )}
            {modalType === 'endRelationship' && (
              <View style={styles.endRelationshipWrap}>
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
  }),
  {
    logout: logoutAction,
    endRelationship: endRelationshipAction,
  }
)(Menu);
