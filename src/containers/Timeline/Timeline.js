import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import superagent from 'superagent';
import moment from 'moment';

import {
  setUserEvents as setUserEventsAction,
  getUserEvents as getUserEventsAction,
} from '../../redux/userEvents/userEvents.actions';
import { setSentCoinsCount as setSentCoinsCountAction } from '../../redux/coin/coin.actions';
import { setSentJalapenosCount as setSentJalapenosCountAction } from '../../redux/jalapeno/jalapeno.actions';
import config from '../../config';
import Template from './Timeline.template';

const userEventsLimit = 100;
const format = 'YYYY-MM-DD';

const getSections = userEvents => {
  let currentCreatedDate;
  let currentEventName;
  return userEvents.reduce((val, event, i) => {
    const eventCreatedDate = moment(new Date(event.createdAt)).format(format);
    if (eventCreatedDate !== currentCreatedDate) {
      currentCreatedDate = eventCreatedDate;
      currentEventName = undefined;
      val.push({
        title: moment(currentCreatedDate).format('ddd, MMM DD, YYYY'),
        data: [],
      });
    }
    if (event.name !== currentEventName) {
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
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    coinCount: PropTypes.number,
    jalapenoCount: PropTypes.number,
    sentCoinsCount: PropTypes.number,
    sentJalapenosCount: PropTypes.number,
    userEvents: PropTypes.array,
    userEventsCount: PropTypes.number,
    setUserEvents: PropTypes.func.isRequired,
    getUserEvents: PropTypes.func.isRequired,
    setSentCoinsCount: PropTypes.func.isRequired,
    setSentJalapenosCount: PropTypes.func.isRequired,
  };

  state = {
    prevMostRecentUserEvent: undefined,
    sections: [],
    isSectionsLoaded: false,
    offset: 0,
  }

  getMoreUserEvents = async () => {
    const res = await this.props.getUserEvents(userEventsLimit, this.state.offset);
  }

  onEndReached = () => {
    console.log('\n\nonEndReached', this.state.isSectionsLoaded);
    if (this.state.isSectionsLoaded &&
        (userEventsLimit * this.state.offset) < this.props.userEventsCount) {
      this.setState({
        offset: this.state.offset + 1,
      }, this.getMoreUserEvents);
    }
    /**
     * - do not do anything if sections havent loaded yet.
     * - do not do anything if # items loaded is equal to or more then count
     */
  };

  goToDashboard = () => Actions.dashboard();

  setSections = () => {
    const sections = getSections(this.props.userEvents);
    /**
     * JW: we have to stagger "isSectionsLoaded" to happen one frame after
     * adding sections so the sections can draw before we fire onEndReached
     */
    this.setState({ sections },
      () => setTimeout(() => this.setState({ isSectionsLoaded: true }), 500));
  };

  setInitials = () => {
    const {
      userFirstName,
      userLastName,
      loverFirstName,
      loverLastName,
    } = this.props;
    console.log({ loverFirstName, loverLastName });
    this.setState({
      userInitials: (userFirstName.substr(0,1) + userLastName.substr(0,1)).toUpperCase(),
      loverInitials: (loverFirstName.substr(0,1) + loverLastName.substr(0,1)).toUpperCase(),
    }, () => console.log(this.state.loverInitials));
  };

  componentWillMount = async () => {
    this.setInitials();

    const query = `{
      userEvents(
        limit: ${userEventsLimit}
        offset: 0
      ) {
        rows {
          id isViewed createdAt name
        }
        count
      }
      sentCoins(limit: 0) {
        count
      }
      sentJalapenos(limit: 0) {
        count
      }
    }`;

    try {
      const res = await superagent.post(config.graphQlUrl, { query });
      // console.log('componentWillMount res', res.body.data);
      const { userEvents, sentCoins, sentJalapenos } = res.body.data;
      const { setUserEvents, setSentCoinsCount, setSentJalapenosCount } = this.props;

      setUserEvents(userEvents.rows, userEvents.count);
      setSentCoinsCount(sentCoins.count);
      setSentJalapenosCount(sentJalapenos.count);
      console.log('userEvents', this.props.userEvents.length);
      this.setSections();
    } catch (err) {
      console.log('componentWillMount err', err);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userEvents.length && nextProps.userEvents[0].createdAt !== this.state.prevMostRecentUserEvent) {
      this.setSections();
    }
  }

  render() {
    return <Template
      {...this.props}
      {...this.state}
      goToDashboard={this.goToDashboard}
      onEndReached={this.onEndReached}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    coinCount: state.coin.count,
    jalapenoCount: state.jalapeno.count,
    sentCoinsCount: state.coin.sentCoinsCount,
    sentJalapenosCount: state.jalapeno.sentJalapenosCount,
    userEvents: state.userEvents.rows,
    userEventsCount: state.userEvents.count,
  }),
  {
    setUserEvents: setUserEventsAction,
    getUserEvents: getUserEventsAction,
    setSentCoinsCount: setSentCoinsCountAction,
    setSentJalapenosCount: setSentJalapenosCountAction,
  }
)(Timeline);
