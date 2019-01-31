import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

import analytics from '../../services/analytics';
import {
  getUserEvents as getUserEventsAction,
  clearUserEvents as clearUserEventsAction,
} from '../../redux/userEvents/userEvents.actions';
import { getTimelineData as getTimelineDataAction } from '../../redux/user/user.actions';

import Template from './Timeline.template';

const userEventsLimit = 100;
const format = 'ddd, MMM DD, YYYY';

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
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
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
      isSectionsLoaded: false,
      page: 0,
      isModalVisible: false,
      isAtEndOfList: false,
    };

    props.getTimelineData(userEventsLimit);
  }

  closeModal = () => this.setState({ isModalVisible: false });

  getMoreUserEvents = async () => {
    await this.props.getUserEvents(
      userEventsLimit,
      this.state.page * userEventsLimit,
      true
    );
  };

  handleRefresh = () => {
    if (!this.props.isGetTimelineDataInFlight) {
      this.props.getTimelineData(userEventsLimit);
    }
  };

  ohandleEndReached = _.throttle(() => {
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

  goBack = () => Actions.dashboard();

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

  render() {
    return (
      <Template
        {...this.props}
        {...this.state}
        goBack={this.goBack}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleEndReached}
        closeModal={this.closeModal}
      />
    );
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userId: state.user.id,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
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
