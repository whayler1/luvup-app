import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getRelationshipScoresByDay } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';
import { vars } from '../../styles';
import ListEmptyComponent from '../Timeline/Timeline.ListEmptyComponent.template';
import TimelineRelationshipScoreRenderItem from './TimelineRelationshipScoreRenderItem';

const ItemSeparatorComponent = () => (
  <View
    style={{
      borderRightColor: vars.blueGrey50,
      borderRightWidth: 1,
    }}
  />
);

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

  handleEndReached = () => {
    const { currentDate } = this.state;
    const { firstDate } = this.props;
    const startDate = currentDate;
    const endDate = dateStepper(currentDate);
    // wrap this in an if
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
    const style = { marginTop: 90 };
    if (isGettingRelationshipScoresByDay) {
      style.alignSelf = 'stretch';
    }
    return (
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
    );
  }
}

export default connect(
  state => ({
    relationshipScoresByDay: state.relationshipScore.relationshipScoresByDay,
    isGettingRelationshipScores:
      state.relationshipScore.isGettingRelationshipScores,
    getRelationshipScoresByDayError:
      state.relationshipScore.getRelationshipScoresByDayError,
    firstDate: state.relationshipScore.firstDate,
  }),
  {
    getRelationshipScoresByDay,
  }
)(TimelineRelationshipScore);
