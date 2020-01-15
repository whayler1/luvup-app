import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import styles from './Dashboard.styles';
import { scene } from '../../styles';
import { LoverRequestType } from '../../types';
import DashboardTopNav from '../../components/DashboardTopNav';
import QuizArt from '../../components/Art/QuizArt';
import LoveNoteArt from '../../components/LoveNoteArt';
import DashboardPermissionsWell from './DashboardPermissionsWell';
import LimitExceededModal, {
  MODAL_CONTENT_TYPES,
} from '../../components/LimitExceededModal';
import DashboardNoRelationship from './DashboardNoRelationship';
import Hero from '../Hero';
import analytics from '../../services/analytics';
import dateFromDateStringOrIsoString from '../../helpers/dateFromDateStringOrIsoString';
import {
  getCoinCount as getCoinCountAction,
  setUnviewedCoinCount as setUnviewedCoinCountAction,
} from '../../redux/coin/coin.actions';
import {
  getJalapenoCount as getJalapenoCountAction,
  setUnviewedJalapenoCount as setUnviewedJalapenoCountAction,
} from '../../redux/jalapeno/jalapeno.actions';

class Dashboard extends PureComponent {
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
    relationshipId: PropTypes.string,
    loverRequestCreatedAt: PropTypes.string,
    receivedLoverRequests: PropTypes.arrayOf(LoverRequestType),
    isNewRelationshipRequest: PropTypes.bool,
    isAcceptLoverRequestInFlight: PropTypes.bool.isRequired,
    acceptLoverRequestError: PropTypes.string.isRequired,
  };

  static defaultProps = {
    isNewRelationshipRequest: false,
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
    this.isNewRelationship =
      props.isNewRelationshipRequest || !this.isInRelationship();

    if (props.isNewRelationshipRequest) {
      Object.assign(this.state, {
        isModalOpen: true,
        modalContent: MODAL_CONTENT_TYPES.NEW_RELATIONSHIP_REQUEST,
      });
    }
  }

  isInRelationship = () =>
    _.isString(this.props.relationshipId) &&
    this.props.relationshipId.length > 0;

  openModal = (modalContent) => {
    const isCoin = modalContent === MODAL_CONTENT_TYPES.COIN;
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
      dateFromDateStringOrIsoString(
        [...collection]
          .filter((item) => {
            const thing = moment(dateFromDateStringOrIsoString(item.createdAt));
            return thing.isAfter(anHrAgo);
          })
          .pop().createdAt,
      ),
    );
    const availableTime = moment(
      dateFromDateStringOrIsoString(leastRecentWithinAnHr),
    )
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

  componentDidUpdate(prevProps) {
    const {
      props: { isAcceptLoverRequestInFlight, acceptLoverRequestError },
      handleLoverRequestAccepted,
    } = this;
    if (
      prevProps.isAcceptLoverRequestInFlight &&
      !isAcceptLoverRequestInFlight &&
      acceptLoverRequestError.length < 1
    ) {
      handleLoverRequestAccepted();
    }
  }

  handleLoveNoteWritePress = () => {
    Actions.createLoveNote();
  };

  handleCreateQuizPress = () => {
    Actions.createQuizQuestion();
  };

  handleLoverRequestAccepted = () => {
    this.setState({
      isModalOpen: true,
      modalContent: MODAL_CONTENT_TYPES.RELATIONSHIP_REQUEST_ACCEPTED,
    });
  };

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
        loverRequestCreatedAt,
        receivedLoverRequests,
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
      isInRelationship,
      isNewRelationship,
    } = this;

    return (
      <SafeAreaView style={scene.safeAreaView}>
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
          receivedLoverRequests={receivedLoverRequests}
        />
        <DashboardPermissionsWell />
        {isInRelationship() ? (
          <Hero openModal={openModal} isNewRelationship={isNewRelationship} />
        ) : (
          <DashboardNoRelationship
            {...{
              loverRequestCreatedAt,
              receivedLoverRequests,
            }}
          />
        )}
        {_.isString(loverFirstName) && loverFirstName.length > 0 && (
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              testID="dashboard-write-love-note-button"
              style={styles.tabsItem}
              onPress={handleLoveNoteWritePress}
            >
              <LoveNoteArt scale={0.8} />
              <Text style={styles.tabsText}>Write Love Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="dashboard-create-a-quiz-button"
              style={styles.tabsItem}
              onPress={handleCreateQuizPress}
            >
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
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
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
    relationshipId: state.relationship.id,
    loverRequestCreatedAt: state.loverRequest.createdAt,
    receivedLoverRequests: state.receivedLoverRequests.rows,
    isAcceptLoverRequestInFlight:
      state.receivedLoverRequests.isAcceptLoverRequestInFlight,
    acceptLoverRequestError:
      state.receivedLoverRequests.acceptLoverRequestError,
  }),
  {
    getCoinCount: getCoinCountAction,
    getJalapenoCount: getJalapenoCountAction,
    setUnviewedCoinCount: setUnviewedCoinCountAction,
    setUnviewedJalapenoCount: setUnviewedJalapenoCountAction,
  },
)(Dashboard);
