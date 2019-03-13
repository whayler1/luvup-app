import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Text,
  TextInput,
  FlatList,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import styles from './CreateLoverRequest.styles';
import { forms, scene, modal, vars } from '../../styles';
import CreateLoverRequestRenderItem from './CreateLoverRequestRenderItem';

import analytics from '../../services/analytics';
import config from '../../config.js';
// import Template from './CreateLoverRequest.template';
import TemplateSelectedUser from './CreateLoverRequest.template.selectedUser';
import HeartArt from '../../components/Art/HeartArt';
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
        <KeyboardAvoidingView>
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
          <ScrollView style={scene.content}>
            <View style={[scene.formGroup, styles.loverSearchContainer]}>
              <Text style={forms.label}>Search for your lover</Text>
              <TextInput
                testID="create-lover-request-input"
                style={forms.input}
                onChangeText={handleSearchChange}
                value={search}
                maxLength={100}
                autoCapitalize={'none'}
                spellCheck={false}
                placeholder={'email, name or username'}
                placeholderTextColor={vars.placeholder}
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
                    <Text style={modal.copy}>
                      Use the search box above to find your lover. Once you and
                      your lover are linked you can begin to use Luvup!
                    </Text>
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
      );
    }
    return (
      <TemplateSelectedUser
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
