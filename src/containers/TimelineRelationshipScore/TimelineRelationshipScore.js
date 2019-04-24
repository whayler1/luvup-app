import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, FlatList, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { getRelationshipScoresByDay } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';
import { vars, scene } from '../../styles';
import styles from './TimelineRelationshipScore.styles';
import timelineStyles from '../Timeline/Timeline.styles';
import ListEmptyComponent from '../Timeline/Timeline.ListEmptyComponent.template';
import TimelineRelationshipScoreRenderItem from './TimelineRelationshipScoreRenderItem';
import HeartArt from '../../components/Art/HeartArt';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const keyExtractor = item => item.relationshipScore.id;

const DAY_STEPPER_AMOUNT = 10;
const formatStr = 'YYYY-MM-DD';
const dateStepper = (dateStr, amount = DAY_STEPPER_AMOUNT) =>
  moment(dateStr)
    .subtract(amount, 'days')
    .format(formatStr);

class TimelineRelationshipScore extends PureComponent {
  static onEnter() {
    const endDate = moment()
      .subtract(DAY_STEPPER_AMOUNT, 'days')
      .format(formatStr);
    store.dispatch(getRelationshipScoresByDay({ endDate }));
  }

  static propTypes = {
    relationshipScoresByDay: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        relationshipScore: PropTypes.shape({
          id: PropTypes.string.isRequired,
          score: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      })
    ),
    isGettingRelationshipScoresByDay: PropTypes.bool,
    getRelationshipScoresByDayError: PropTypes.string,
    getRelationshipScoresByDay: PropTypes.func.isRequired,
    firstDate: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentDate: dateStepper(moment().format('YYYY-MM-DD')),
    };
  }

  handleBack = () => {
    Actions.dashboard();
  };

  handleEndReached = () => {
    const { currentDate } = this.state;
    const { firstDate } = this.props;
    const startDate = currentDate;
    const endDate = dateStepper(currentDate);

    if (firstDate <= startDate) {
      this.setState(
        {
          currentDate: endDate,
        },
        () => {
          this.props.getRelationshipScoresByDay({
            endDate,
            startDate,
            isAppend: true,
          });
        }
      );
    }
  };

  render() {
    const {
      isGettingRelationshipScoresByDay,
      relationshipScoresByDay,
    } = this.props;
    const style = { paddingTop: vars.gutterHalf };
    if (isGettingRelationshipScoresByDay) {
      style.alignSelf = 'stretch';
    }
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={this.handleBack}
            style={timelineStyles.heartBtn}>
            <HeartArt scale={0.037} fill={vars.blueGrey500} />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={
            !isGettingRelationshipScoresByDay ||
            relationshipScoresByDay.length > 0
          }
          style={style}
          renderItem={TimelineRelationshipScoreRenderItem}
          data={relationshipScoresByDay}
          keyExtractor={keyExtractor}
          onEndReached={this.handleEndReached}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            <ListEmptyComponent
              isInFlight={isGettingRelationshipScoresByDay}
              error={this.props.getRelationshipScoresByDayError}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    relationshipScoresByDay: state.relationshipScore.relationshipScoresByDay,
    isGettingRelationshipScoresByDay:
      state.relationshipScore.isGettingRelationshipScoresByDay,
    getRelationshipScoresByDayError:
      state.relationshipScore.getRelationshipScoresByDayError,
    firstDate: state.relationshipScore.firstDate,
  }),
  {
    getRelationshipScoresByDay,
  }
)(TimelineRelationshipScore);
