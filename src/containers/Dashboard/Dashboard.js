import React, { Component } from 'react';
import { PanResponder, Animated, Easing, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import analytics from '../../services/analytics';
import {
  getCoinCount as getCoinCountAction,
  setUnviewedCoinCount as setUnviewedCoinCountAction,
} from '../../redux/coin/coin.actions';
import {
  getJalapenoCount as getJalapenoCountAction,
  setUnviewedJalapenoCount as setUnviewedJalapenoCountAction,
} from '../../redux/jalapeno/jalapeno.actions';
import { onNotificationReceived } from '../../services/notifications';

import config from '../../config.js';
import Template from './Dashboard.template';

class Dashboard extends Component {
  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    username: PropTypes.string,
    userId: PropTypes.string,
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
    setUnviewedCoinCount: PropTypes.func.isRequired,
    setUnviewedJalapenoCount: PropTypes.func.isRequired,
    unreadReceivedLoveNoteCount: PropTypes.number.isRequired,
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
  closePushdown = () => {
    this.props.setUnviewedCoinCount(0);
    this.props.setUnviewedJalapenoCount(0);
    this.setState({ isPushdownVisible: false });
  };

  setAvailableTime(collection, stateKey) {
    const now = moment();
    const anHrAgo = moment().subtract(1, 'hour');
    const leastRecentWithinAnHr = moment(new Date([...collection].filter(item => moment(new Date(item.createdAt)).isAfter(anHrAgo)).pop().createdAt));
    const availableTime = moment(new Date(leastRecentWithinAnHr)).add(1, 'hour').fromNow();
    this.setState({ [stateKey]: availableTime });
  };

  componentDidMount() {

    this.props.getCoinCount();
    this.props.getJalapenoCount();

    const {
      unviewedCoinCount,
      unviewedJalapenoCount,
    } = this.props;

    if (unviewedCoinCount > 0 || unviewedJalapenoCount > 0) {
      this.setState({ isPushdownVisible: true });
    }
    if (this.props.userId && this.props.userId.length) {
      analytics.screen({
        userId: this.props.userId,
        name: 'Dashboard',
      });
    }
  }

  onLoveNoteWritePress = () => Actions.createLoveNote();
  onLoveNoteReadPress = () => Actions.loveNotes();

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
      unreadReceivedLoveNoteCount={this.props.unreadReceivedLoveNoteCount}
      onLoveNoteWritePress={this.onLoveNoteWritePress}
      onLoveNoteReadPress={this.onLoveNoteReadPress}
      {...this.state}
    />;
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    username: state.user.username,
    userId: state.user.id,
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
    unreadReceivedLoveNoteCount: state.loveNote.unreadReceivedLoveNoteCount,
  }),
  {
    getCoinCount: getCoinCountAction,
    getJalapenoCount: getJalapenoCountAction,
    setUnviewedCoinCount: setUnviewedCoinCountAction,
    setUnviewedJalapenoCount: setUnviewedJalapenoCountAction,
  }
)(Dashboard);
