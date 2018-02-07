import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import superagent from 'superagent';
import moment from 'moment';

import { setUserEvents as setUserEventsAction } from '../../redux/userEvents/userEvents.actions';
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
    console.log('loop', i);
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
    sentCoinsCount: PropTypes.number,
    sentJalapenosCount: PropTypes.number,
    userEvents: PropTypes.array,
    setUserEvents: PropTypes.func.isRequired,
    setSentCoinsCount: PropTypes.func.isRequired,
    setSentJalapenosCount: PropTypes.func.isRequired,
  };

  state = {
    prevMostRecentUserEvent: undefined,
    sections: [],
  }

  goToDashboard = () => Actions.dashboard();

  setSections = () => {
    const sections = getSections(this.props.userEvents);
    this.setState({ sections })
    console.log({ sections });
  };

  componentWillMount = async () => {
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
    />;
  }
}

export default connect(
  state => ({
    sentCoinsCount: state.coin.sentCoinsCount,
    sentJalapenosCount: state.jalapeno.sentJalapenosCount,
    userEvents: state.userEvents.rows,
  }),
  {
    setUserEvents: setUserEventsAction,
    setSentCoinsCount: setSentCoinsCountAction,
    setSentJalapenosCount: setSentJalapenosCountAction,
  }
)(Timeline);
