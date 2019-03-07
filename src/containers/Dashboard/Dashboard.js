import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './Dashboard.styles';
import DashboardTopNav from '../../components/DashboardTopNav';
import QuizArt from '../../components/Art/QuizArt';
import LoveNoteArt from '../../components/LoveNoteArt';
import LimitExceededModal from '../../components/LimitExceededModal';
import Hero from '../Hero';
import analytics from '../../services/analytics';
import {
  getCoinCount as getCoinCountAction,
  setUnviewedCoinCount as setUnviewedCoinCountAction,
} from '../../redux/coin/coin.actions';
import {
  getJalapenoCount as getJalapenoCountAction,
  setUnviewedJalapenoCount as setUnviewedJalapenoCountAction,
} from '../../redux/jalapeno/jalapeno.actions';

class Dashboard extends Component {
  static propTypes = {
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userId: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverLastName: PropTypes.string,
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
    relationshipScore: PropTypes.number,
  };

  constructor(props) {
    super(props);

    const { unviewedCoinCount, unviewedJalapenoCount } = props;

    this.state = {
      isPushdownVisible: unviewedCoinCount > 0 || unviewedJalapenoCount > 0,
      isModalOpen: false,
      modalContent: undefined,
      coinsAvailableTime: undefined,
      jalapenosAvailableTime: undefined,
    };
  }

  openModal = modalContent => {
    const isCoin = modalContent === 'coin';
    const collection = isCoin ? this.props.sentCoins : this.props.sentJalapenos;
    const stateKey = isCoin ? 'coinsAvailableTime' : 'jalapenosAvailableTime';
    this.setAvailableTime(collection, stateKey);
    this.setState({
      isModalOpen: true,
      modalContent,
    });
  };

  closeModal = () =>
    this.setState({
      isModalOpen: false,
    });

  closePushdown = () => {
    this.props.setUnviewedCoinCount(0);
    this.props.setUnviewedJalapenoCount(0);
    this.setState({ isPushdownVisible: false });
  };

  setAvailableTime(collection, stateKey) {
    const anHrAgo = moment().subtract(1, 'hour');
    const leastRecentWithinAnHr = moment(
      new Date(
        [...collection]
          .filter(item => moment(new Date(item.createdAt)).isAfter(anHrAgo))
          .pop().createdAt
      )
    );
    const availableTime = moment(new Date(leastRecentWithinAnHr))
      .add(1, 'hour')
      .fromNow();
    this.setState({ [stateKey]: availableTime });
  }

  componentDidMount() {
    this.props.getCoinCount();
    this.props.getJalapenoCount();

    if (this.props.userId && this.props.userId.length) {
      analytics.screen({
        userId: this.props.userId,
        name: 'Dashboard',
      });
    }
  }

  handleLoveNoteWritePress = () => Actions.createLoveNote();
  handleCreateQuizPress = () => Actions.createQuizQuestion();

  render() {
    const {
      props: {
        userFirstName,
        userLastName,
        loverFirstName,
        loverLastName,
        coinCount,
        jalapenoCount,
        relationshipScore,
        unviewedCoinCount,
        unviewedJalapenoCount,
        unreadReceivedLoveNoteCount,
      },
      state: {
        isPushdownVisible,
        isModalOpen,
        modalContent,
        coinsAvailableTime,
        jalapenosAvailableTime,
      },
      openModal,
      closeModal,
      closePushdown,
      handleLoveNoteWritePress,
      handleCreateQuizPress,
    } = this;
    return (
      <View style={styles.wrapper}>
        <DashboardTopNav
          coinCount={coinCount}
          jalapenoCount={jalapenoCount}
          userFirstName={userFirstName}
          userLastName={userLastName}
          loverFirstName={loverFirstName}
          loverLastName={loverLastName}
          closePushdown={closePushdown}
          isPushdownVisible={isPushdownVisible}
          unviewedCoinCount={unviewedCoinCount}
          unviewedJalapenoCount={unviewedJalapenoCount}
          relationshipScore={relationshipScore}
          unreadReceivedLoveNoteCount={unreadReceivedLoveNoteCount}
        />
        <Hero openModal={openModal} />
        {_.isString(loverFirstName) && loverFirstName.length > 0 && (
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              testID="dashboard-write-love-note-button"
              style={styles.tabsItem}
              onPress={handleLoveNoteWritePress}>
              <LoveNoteArt scale={0.8} />
              <Text style={styles.tabsText}>Write Love Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="dashboard-create-a-quiz-button"
              style={styles.tabsItem}
              onPress={handleCreateQuizPress}>
              <QuizArt scale={0.85} />
              <Text style={styles.tabsText}>Create a Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
        <LimitExceededModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalContent={modalContent}
          loverFirstName={loverFirstName}
          coinsAvailableTime={coinsAvailableTime}
          jalapenosAvailableTime={jalapenosAvailableTime}
        />
      </View>
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
    sentCoins: state.coin.sentCoins,
    sentJalapenos: state.jalapeno.sentJalapenos,
    unviewedCoinCount: state.coin.unviewedCoinCount,
    unviewedJalapenoCount: state.jalapeno.unviewedJalapenoCount,
    unreadReceivedLoveNoteCount: state.loveNote.unreadReceivedLoveNoteCount,
    relationshipScore: state.relationshipScore.score,
  }),
  {
    getCoinCount: getCoinCountAction,
    getJalapenoCount: getJalapenoCountAction,
    setUnviewedCoinCount: setUnviewedCoinCountAction,
    setUnviewedJalapenoCount: setUnviewedJalapenoCountAction,
  }
)(Dashboard);
