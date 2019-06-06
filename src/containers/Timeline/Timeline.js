import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Modal,
  RefreshControl,
} from 'react-native';

import styles from './Timeline.styles';
import { scene, modal, vars } from '../../styles';
import renderItem from './Timeline.renderItem.template';
import renderSectionHeader from './Timeline.renderSectionHeader.template';
import ListHeaderComponent from './Timeline.ListHeaderComponent.template';
import ListFooterComponent from './Timeline.ListFooterComponent.template';
import ListEmptyComponent from './Timeline.ListEmptyComponent.template';
import HeartArt from '../../components/Art/HeartArt';
import Button from '../../components/Button';
import analytics from '../../services/analytics';
import {
  addOnActiveListener,
  removeOnActiveListener,
} from '../../services/appStateListener';
import {
  getUserEvents as getUserEventsAction,
  clearUserEvents as clearUserEventsAction,
} from '../../redux/userEvents/userEvents.actions';
import { getTimelineData as getTimelineDataAction } from '../../redux/user/user.actions';

const userEventsLimit = 100;
const format = 'ddd, MMM DD, YYYY';
const APP_STATE_LISTENER_ID = 'timeline';

const getSections = userEvents => {
  let currentCreatedDate;
  let currentEventName;
  const today = moment().format(format);
  return userEvents.reduce((val, event) => {
    const eventCreatedDate = moment(new Date(event.createdAt)).format(format);
    if (eventCreatedDate !== currentCreatedDate) {
      currentCreatedDate = eventCreatedDate;
      currentEventName = undefined;
      val.push({
        title: currentCreatedDate === today ? 'Today' : currentCreatedDate,
        data: [],
      });
    }
    if (
      event.name !== currentEventName ||
      /^lovenote/.test(event.name) ||
      /^quiz-item/.test(event.name)
    ) {
      currentEventName = event.name;
      val[val.length - 1].data.push({
        ...event,
        key: event.id,
        time: moment(new Date(event.createdAt)).format('h:mma'),
        count: 1,
      });
    } else {
      const lastVal = val[val.length - 1];
      const lastEvt = lastVal.data[lastVal.data.length - 1];
      lastEvt.count++;
    }

    return val;
  }, []);
};

class Timeline extends Component {
  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userId: PropTypes.string,
    userRelationshipScore: PropTypes.number,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    loverRelationshipScore: PropTypes.number,
    coinCount: PropTypes.number,
    jalapenoCount: PropTypes.number,
    sentCoinsCount: PropTypes.number,
    sentJalapenosCount: PropTypes.number,
    userEvents: PropTypes.array,
    userEventsCount: PropTypes.number,
    getUserEvents: PropTypes.func.isRequired,
    clearUserEvents: PropTypes.func.isRequired,
    getTimelineData: PropTypes.func.isRequired,
    isGetUserEventsInFlight: PropTypes.bool.isRequired,
    isGetTimelineDataInFlight: PropTypes.bool.isRequired,
    getUserEventsError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      prevMostRecentUserEvent: undefined,
      sections: [],
      isAfterFirstLoad: false,
      isSectionsLoaded: false,
      page: 0,
      isModalVisible: false,
      isAtEndOfList: false,
    };

    props.getTimelineData(userEventsLimit).then(() => {
      this.setState({ isAfterFirstLoad: true });
    });

    addOnActiveListener(APP_STATE_LISTENER_ID, this.handleAppFocusActive);
  }

  closeModal = () => this.setState({ isModalVisible: false });

  getMoreUserEvents = async () => {
    await this.props.getUserEvents(
      userEventsLimit,
      this.state.page * userEventsLimit,
      true
    );
  };

  handleAppFocusActive = () => {
    if (!this.props.isGetTimelineDataInFlight) {
      this.setState({ isAfterFirstLoad: false }, () => {
        this.props.getTimelineData(userEventsLimit).then(() => {
          this.setState({ isAfterFirstLoad: true });
        });
      });
    }
  };

  handleRefresh = () => {
    if (!this.props.isGetTimelineDataInFlight) {
      this.props.getTimelineData(userEventsLimit);
    }
  };

  handleEndReached = _.throttle(() => {
    /**
     * - do not do anything if sections havent loaded yet.
     * - do not do anything if # items loaded is equal to or more then count
     */
    if (
      this.state.isSectionsLoaded &&
      userEventsLimit * (this.state.page + 1) < this.props.userEventsCount
    ) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        this.getMoreUserEvents
      );
    } else {
      this.setState({ isAtEndOfList: true });
    }
  }, 250);

  goBack = () => Actions.popTo('dashboard');

  setSections = userEvents => {
    const events = userEvents || this.props.userEvents;
    const sections = getSections(events);
    /**
     * JW: we have to stagger "isSectionsLoaded" to happen one frame after
     * adding sections so the sections can draw before we fire onEndReached
     */
    this.setState({ sections }, () =>
      setTimeout(() => this.setState({ isSectionsLoaded: true }), 500)
    );
  };

  setInitials = () => {
    const {
      userFirstName,
      userLastName,
      loverFirstName,
      loverLastName,
    } = this.props;

    this.setState({
      userInitials: (
        userFirstName.substr(0, 1) + userLastName.substr(0, 1)
      ).toUpperCase(),
      loverInitials: (
        loverFirstName.substr(0, 1) + loverLastName.substr(0, 1)
      ).toUpperCase(),
    });
  };

  componentDidMount = async () => {
    analytics.screen({
      userId: this.props.userId,
      name: 'Timeline',
    });

    this.setInitials();
    if (this.props.userEvents.length) {
      this.setSections();
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.userEvents.length &&
      nextProps.userEvents[0].createdAt !== this.state.prevMostRecentUserEvent
    ) {
      this.setSections(nextProps.userEvents);
    }
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount() {
    removeOnActiveListener(APP_STATE_LISTENER_ID);
  }
  /* eslint-enable class-methods-use-this */

  render() {
    const {
      props: {
        userRelationshipScore,
        loverRelationshipScore,
        coinCount,
        jalapenoCount,
        sentCoinsCount,
        sentJalapenosCount,
        isGetUserEventsInFlight,
        isGetTimelineDataInFlight,
        getUserEventsError,
      },
      state: {
        sections,
        isSectionsLoaded,
        isAfterFirstLoad,
        userInitials,
        loverInitials,
        isModalVisible,
      },
      goBack,
      handleRefresh,
      handleEndReached,
      closeModal,
    } = this;
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <View
          style={{
            backgroundColor: vars.razzleDazzleRose,
            position: 'absolute',
            height: 50,
            left: 0,
            right: 0,
            bottom: '100%',
          }}
        />
        <View style={styles.wrapper}>
          <View style={[scene.topNav, styles.topNav]}>
            <TouchableOpacity onPress={goBack} style={styles.heartBtn}>
              <HeartArt scale={0.037} fill="rgba(0,0,0,0.5)" />
            </TouchableOpacity>
          </View>
          <View style={styles.sectionListWrapper}>
            <SectionList
              endFillColor="white"
              style={styles.sectionList}
              refreshControl={
                <RefreshControl
                  style={styles.refreshControl}
                  enabled={
                    isAfterFirstLoad &&
                    !isGetUserEventsInFlight &&
                    !isGetTimelineDataInFlight
                  }
                  refreshing={
                    isAfterFirstLoad &&
                    (isGetUserEventsInFlight || isGetTimelineDataInFlight)
                  }
                  onRefresh={handleRefresh}
                  tintColor="white"
                />
              }
              ListEmptyComponent={
                <ListEmptyComponent
                  isInFlight={isGetUserEventsInFlight}
                  error={getUserEventsError}
                />
              }
              ListHeaderComponent={
                <ListHeaderComponent
                  {...{
                    userRelationshipScore,
                    loverRelationshipScore,
                    coinCount,
                    jalapenoCount,
                    userInitials,
                    loverInitials,
                    sentCoinsCount,
                    sentJalapenosCount,
                  }}
                />
              }
              ListFooterComponent={
                <ListFooterComponent
                  isPresent={sections.length > 0}
                  isPreloaderVisible={
                    isGetUserEventsInFlight && isSectionsLoaded
                  }
                />
              }
              renderSectionHeader={renderSectionHeader}
              renderItem={renderItem}
              sections={sections}
              onEndReached={handleEndReached}
            />
          </View>
          <Modal visible={isModalVisible} animationType={'fade'} transparent>
            <View style={modal.outerContainer}>
              <View style={modal.innerContainer}>
                <Text style={modal.title}>Error</Text>
                <Text style={modal.copy}>
                  There was an error loading your timeline. Most likely this is
                  due to network conectivity.
                </Text>
                <View style={modal.buttonContainer}>
                  <Button onPress={closeModal} title="Dismiss" />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userId: state.user.id,
    userRelationshipScore: state.relationshipScore.score,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    loverRelationshipScore: state.lover.relationshipScore,
    coinCount: state.coin.count,
    jalapenoCount: state.jalapeno.count,
    sentCoinsCount: state.coin.sentCoinsCount,
    sentJalapenosCount: state.jalapeno.sentJalapenosCount,
    userEvents: state.userEvents.rows,
    userEventsCount: state.userEvents.count,
    isGetUserEventsInFlight: state.userEvents.isGetUserEventsInFlight,
    isGetTimelineDataInFlight: state.user.isGetTimelineDataInFlight,
    getUserEventsError: state.userEvents.getUserEventsError,
  }),
  {
    getUserEvents: getUserEventsAction,
    clearUserEvents: clearUserEventsAction,
    getTimelineData: getTimelineDataAction,
  }
)(Timeline);
