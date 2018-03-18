import React, { Component } from 'react';
import { PanResponder, Animated, Easing, } from 'react-native';
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
    sentJalapenos: PropTypes.array,
    unviewedCoinCount: PropTypes.number,
    unviewedJalapenoCount: PropTypes.number,
  };

  state = {
    isPushdownVisible: false,
    isModalOpen: false,
    modalContent: undefined,
    coinsAvailableTime: undefined,
    jalapenosAvailableTime: undefined,
  };

  openModal = modalContent => {
    const isCoin = modalContent === 'coin';
    const collection = isCoin ? this.props.sentCoins : this.props.sentJalapenos;
    const stateKey = isCoin ? 'coinsAvailableTime': 'jalapenosAvailableTime';
    this.setAvailableTime(collection, stateKey);
    this.setState({
      isModalOpen: true,
      modalContent,
    });
  };
  closeModal = () => this.setState({
    isModalOpen: false,
  });
  closePushdown = () => this.setState({ isPushdownVisible: false });

  setAvailableTime(collection, stateKey) {
    const now = moment();
    const anHrAgo = moment().subtract(1, 'hour');
    const leastRecentWithinAnHr = moment(new Date([...collection].filter(item => moment(new Date(item.createdAt)).isAfter(anHrAgo)).pop().createdAt));
    const availableTime = moment(new Date(leastRecentWithinAnHr)).add(1, 'hour').fromNow();
    this.setState({ [stateKey]: availableTime });
  };

  componentWillMount() {
    this.props.getCoinCount();
    this.props.getJalapenoCount();
  };

  componentDidMount() {
    console.log('dashboard mounted');
    const {
      unviewedCoinCount,
      unviewedJalapenoCount,
    } = this.props;

    if (unviewedCoinCount > 0 || unviewedJalapenoCount > 0) {
      this.setState({ isPushdownVisible: true });
    }
  }

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
      closePushdown={this.closePushdown}
      unviewedCoinCount={this.props.unviewedCoinCount}
      unviewedJalapenoCount={this.props.unviewedJalapenoCount}
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
    sentJalapenos: state.jalapeno.sentJalapenos,
    unviewedCoinCount: state.coin.unviewedCoinCount,
    unviewedJalapenoCount: state.jalapeno.unviewedJalapenoCount,
  }),
  {
    getCoinCount: getCoinCountAction,
    getJalapenoCount: getJalapenoCountAction,
  }
)(Dashboard);
