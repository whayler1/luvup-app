import React, { Component } from 'react';
import { PanResponder, Animated, Easing, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getCoinCount as getCoinCountAction
} from '../../redux/coin/coin.actions';
import {
  getJalapenoCount as getJalapenoCountAction,
} from '../../redux/jalapeno/jalapeno.actions';

import config from '../../config.js';
import Template from './Dashboard.template';

class Dashboard extends Component {
  static propTypes = {
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
    loverUsername: PropTypes.string,
    loverRequestUsername: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    coinCount: PropTypes.number,
    getCoinCount: PropTypes.func.isRequired,
    getJalapenoCount: PropTypes.func.isRequired,
    jalapenoCount: PropTypes.number,
    sentCoins: PropTypes.array,
  };

  state = {
    isModalOpen: false,
    modalContent: undefined,
    coinsAvailableTime: undefined,
  };

  openModal = modalContent => this.setState({
    isModalOpen: true,
    modalContent,
  });
  closeModal = () => this.setState({
    isModalOpen: false,
  });

  setCoinsAvailableTime() {
    const { sentCoins } = this.props;
    const now = moment();
    const anHrAgo = moment().subtract(1, 'hour');
    const leastRecentWithinAnHr = moment(new Date([...sentCoins].filter(coin => moment(new Date(coin.createdAt)).isAfter(anHrAgo)).pop().createdAt));
    const coinsAvailableTime = moment(new Date(leastRecentWithinAnHr)).add(1, 'hour').fromNow();
    this.setState({ coinsAvailableTime });
  };

  componentWillMount() {
    this.props.getCoinCount();
    this.props.getJalapenoCount();
    this.setCoinsAvailableTime();
  };

  render() {
    return <Template
      userFirstName={this.props.userFirstName}
      userLastName={this.props.userLastName}
      username={this.props.username}
      loverFirstName={this.props.loverFirstName}
      loverLastName={this.props.loverLastName}
      loverUsername={this.props.loverUsername}
      loverRequestUsername={this.props.loverRequestUsername}
      loverRequestCreatedAt={this.props.loverRequestCreatedAt}
      coinCount={this.props.coinCount}
      jalapenoCount={this.props.jalapenoCount}
      openModal={this.openModal}
      closeModal={this.closeModal}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    username: state.user.username,
    loverFirstName: state.lover.firstName,
    loverLastName: state.lover.lastName,
    loverUsername: state.lover.username,
    loverRequestUsername: state.loverRequest.username,
    loverRequestCreatedAt: state.loverRequest.createdAt,
    coinCount: state.coin.count,
    jalapenoCount: state.jalapeno.count,
    sentCoins: state.coin.sentCoins,
  }),
  {
    getCoinCount: getCoinCountAction,
    getJalapenoCount: getJalapenoCountAction,
  }
)(Dashboard);
