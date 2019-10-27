import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import { isStringWithLength } from '../../helpers';
import analytics from '../../services/analytics';
import { scene, forms, modal, vars } from '../../styles';
import styles from './Menu.styles';
import ModalContentWrap from '../../components/ModalContentWrap';
import Button, { BUTTON_STYLES } from '../../components/Button';
import ChangePasswordModalContent from '../ChangePasswordModalContent';
import MenuReceivedLoverRequests from './MenuReceivedLoverRequests';
import MenuHeader from './MenuHeader';
import MenuProfile from './MenuProfile';
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

  renderModalContent() {
    const {
      state: { isModalVisible, modalType, isInFlight },
      closeModal,
      endRelationship,
    } = this;

    return (
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
    );
  }

  render() {
    const {
      handleLogout,
      handleChangePasswordPress,
      openEndRelationshipModal,
    } = this;

    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
        <View style={scene.container}>
          <MenuHeader />
          <ScrollView
            testID="menu-scrollview"
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <MenuProfile
              handleChangePasswordPress={handleChangePasswordPress}
            />
            <MenuRelationship
              openEndRelationshipModal={openEndRelationshipModal}
            />
            <MenuReceivedLoverRequests />
            <View style={styles.menuLogoutWrap} testID="menu-logout">
              <Button onPress={handleLogout} title="Log Out" />
            </View>
          </ScrollView>
          {this.renderModalContent()}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    userId: state.user.id,
    userInviteId: state.userInvite.id,
  }),
  {
    logout: logoutAction,
    endRelationship: endRelationshipAction,
  }
)(Menu);
