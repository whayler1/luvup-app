import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import styles from './CreateLoverRequest.styles';
import { scene, modal, vars } from '../../styles';
import CreateLoverRequestRenderItem from './CreateLoverRequestRenderItem';

import analytics from '../../services/analytics';
import config from '../../config.js';
// import Template from './CreateLoverRequest.template';
import CreateLoverRequestSelectedUser from './CreateLoverRequestSelectedUser';
import HeartArt from '../../components/Art/HeartArt';
import SearchArt from '../../components/Art/SearchArt';
import Input from '../../components/Input';
import { requestLover as requestLoverAction } from '../../redux/loverRequest/loverRequest.actions';
import { getReceivedLoverRequests as getReceivedLoverRequestsAction } from '../../redux/receivedLoverRequests/receivedLoverRequests.actions';

const keyExtractor = item => item.id;

const getRenderItem = onPress => ({ item }) => (
  <CreateLoverRequestRenderItem item={item} onPress={onPress} />
);

class CreateLoverRequest extends Component {
  static propTypes = {
    relationshipId: PropTypes.string,
    requestLover: PropTypes.func.isRequired,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userId: PropTypes.string,
    getReceivedLoverRequests: PropTypes.func.isRequired,
    receivedLoverRequests: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      error: '',
      users: [],
      selectedUser: null,
      isInFlight: false,
      requestLoverIsInFlight: false,
    };
  }

  clearSelectedUser = () => this.setState({ selectedUser: null });

  handleListItemClick = selectedUserId =>
    this.setState({
      selectedUser: this.state.users.find(user => user.id === selectedUserId),
    });

  getExistingLoverRequest = async () => {
    await this.props.getReceivedLoverRequests();
    const existingRequest = this.props.receivedLoverRequests.find(
      loverRequest => loverRequest.sender.id === this.state.selectedUser.id
    );
    return existingRequest;
  };

  requestLover = async () => {
    this.setState({ requestLoverIsInFlight: true });

    const existingRequest = await this.getExistingLoverRequest();

    if (existingRequest) {
      Actions.confirmLoverRequest({
        selectedLoverRequestId: existingRequest.id,
      });
      return;
    }

    const res = await this.props.requestLover(this.state.selectedUser.id);

    if (!_.at(res, 'body.data.requestLover.id')) {
      this.setState({ requestLoverIsInFlight: false, error: 'request-lover' });
    } else {
      Actions.dashboard();
    }
  };

  getUsers = async () => {
    const { search } = this.state;
    try {
      const res = await superagent.post(config.graphQlUrl, {
        query: `{
          users (
            search: "${search}"
            limit: 10
          ) {
            rows {
              id username firstName lastName
            }
          }
        }`,
      });

      this.setState({
        error: '',
        users: res.body.data.users.rows,
        isInFlight: false,
      });
    } catch (err) {
      this.setState({ error: 'response', isInFlight: false });
    }
  };

  searchDebounce = _.debounce(() => {
    const { search } = this.state;
    if (search.length > 2) {
      this.getUsers();
    } else {
      this.setState({ error: '', users: [], isInFlight: false });
    }
  }, 500);

  handleSearchChange = search => {
    this.setState({ search, isInFlight: true }, this.searchDebounce);
  };

  handleMenuNavPress = () => {
    Actions.menu();
  };

  handleGoBack = () => {
    Actions.dashboard();
  };

  componentDidMount() {
    analytics.screen({
      userId: this.props.userId,
      name: 'CreateLoverRequest',
    });
  }

  render() {
    const {
      handleSearchChange,
      handleListItemClick,
      handleMenuNavPress,
      handleGoBack,
      props: { userFirstName, userLastName },
      state: { search, users, selectedUser, isInFlight },
    } = this;
    if (!selectedUser) {
      return (
        <SafeAreaView style={scene.safeAreaView}>
          <KeyboardAvoidingView style={scene.container}>
            <View style={scene.topNav}>
              <View style={scene.topNavContent}>
                <TouchableOpacity onPress={handleGoBack}>
                  <HeartArt scale={0.037} fill={vars.blueGrey500} />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="create-lover-request-menu-button"
                  onPress={handleMenuNavPress}
                  style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>
                    {_.isString(userFirstName) &&
                      userFirstName.substr(0, 1).toUpperCase()}
                    {_.isString(userLastName) &&
                      userLastName.substr(0, 1).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={scene.content}
              contentContainerStyle={styles.content}>
              <View>
                <Input
                  label="Search for your lover"
                  placeholder="name or email address"
                  onChangeText={handleSearchChange}
                  value={search}
                  formGroupStyles={[styles.loverSearchContainer]}
                  inputProps={{
                    testID: 'create-lover-request-input',
                    autoCapitalize: 'none',
                    maxLength: 100,
                    spellCheck: false,
                  }}
                />
              </View>
              {users.length > 0 && (
                <FlatList
                  style={styles.flatList}
                  data={users}
                  keyExtractor={keyExtractor}
                  renderItem={getRenderItem(handleListItemClick)}
                />
              )}
              {isInFlight && !users.length && (
                <Text style={[modal.copy, { color: vars.blue500 }]}>
                  Searching…
                </Text>
              )}
              {!isInFlight &&
                !users.length &&
                (() => {
                  if (search.length < 2) {
                    return (
                      <View style={styles.directionsContainer}>
                        <SearchArt fill={vars.blueGrey100} scale={3} />
                        <Text
                          style={[
                            scene.largeCopy,
                            scene.textCenter,
                            scene.gutterDoubleTop,
                          ]}>
                          Use the search box above to find your lover.
                        </Text>
                      </View>
                    );
                  }
                  return (
                    <Text style={[modal.copy, { color: vars.red500 }]}>
                      There are no users who match that username, email or full
                      name. Please double check your spelling.
                    </Text>
                  );
                })()}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
    return (
      <CreateLoverRequestSelectedUser
        clearSelectedUser={this.clearSelectedUser}
        requestLover={this.requestLover}
        {...this.state}
      />
    );
  }
}

export default connect(
  state => ({
    relationshipId: state.relationship.id,
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userId: state.user.id,
    receivedLoverRequests: state.receivedLoverRequests.rows,
  }),
  {
    requestLover: requestLoverAction,
    getReceivedLoverRequests: getReceivedLoverRequestsAction,
  }
)(CreateLoverRequest);
