import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import superagent from 'superagent';

import { setUserEvents as setUserEventsAction } from '../../redux/userEvents/userEvents.actions';
import { setSentCoinsCount as setSentCoinsCountAction } from '../../redux/coin/coin.actions';
import { setSentJalapenosCount as setSentJalapenosCountAction } from '../../redux/jalapeno/jalapeno.actions';
import config from '../../config';
import Template from './Timeline.template';

const userEventsLimit = 100;

class Timeline extends Component {
  static propTypes = {
    sentCoinsCount: PropTypes.number,
    sentJalapenosCount: PropTypes.number,
    userEvents: PropTypes.array,
    setUserEvents: PropTypes.func.isRequired,
    setSentCoinsCount: PropTypes.func.isRequired,
    setSentJalapenosCount: PropTypes.func.isRequired,
  };

  goToDashboard = () => Actions.dashboard();

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
      console.log('componentWillMount res', res.body.data);
      const { userEvents, sentCoins, sentJalapenos } = res.body.data;
      const { setUserEvents, setSentCoinsCount, setSentJalapenosCount } = this.props;

      setUserEvents(userEvents.rows, userEvents.count);
      setSentCoinsCount(sentCoins.count);
      setSentJalapenosCount(sentJalapenos.count)
    } catch (err) {
      console.log('componentWillMount err', err);
    }
  }

  render() {
    return <Template
      {...this.props}
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
