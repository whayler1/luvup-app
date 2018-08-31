import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Surface } from 'ReactNativeART';
import Color from 'color';
import _ from 'lodash';

import { getRelationshipScoresByDay } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';
import { vars } from '../../styles';
import Circle from '../../components/Circle';
import ListEmptyComponent from '../Timeline/Timeline.ListEmptyComponent.template';

const getFill = score => {
  let lowerColor;
  let higherColor;
  let threshold;
  if (score < 33) {
    lowerColor = vars.blue500;
    higherColor = vars.purple500;
    threshold = 0;
  } else if (score < 66) {
    lowerColor = vars.purple500;
    higherColor = vars.red500;
    threshold = 33;
  } else {
    lowerColor = vars.red500;
    higherColor = vars.pink500;
    threshold = 66;
  }

  const pct = (score - threshold) / 33;
  return Color(lowerColor).mix(Color(higherColor), pct);
};

const renderItem = ({ item }) => (
  <View
    key={item.relationshipScore.id}
    style={{
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: 'center',
    }}>
    <Text
      style={{
        fontFamily: vars.fontBlack,
        color: vars.blueGrey500,
        fontSize: 12,
      }}>
      {moment(item.day).format("MMM D, 'YY")}
    </Text>
    <View
      style={{
        flex: 1,
        width: 70,
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: `${item.relationshipScore.score}%`,
          left: 0,
          right: 0,
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Surface width={70} height={70} style={{ position: 'absolute' }}>
          <Circle radius={35} fill={getFill(item.relationshipScore.score)} />
        </Surface>
        <Text
          style={{
            fontFamily: vars.fontBlack,
            color: 'white',
            fontSize: 18,
          }}>
          {item.relationshipScore.score}
        </Text>
      </View>
    </View>
  </View>
);

const ItemSeparatorComponent = () => (
  <View
    style={{
      borderRightColor: vars.blueGrey50,
      borderRightWidth: 1,
    }}
  />
);

const keyExtractor = item => item.relationshipScore.id;

const DAY_STEPPER_AMOUNT = 20;
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
      currentDate: dateStepper(
        moment().format('YYYY-MM-DD'),
        DAY_STEPPER_AMOUNT + 1
      ),
    };
  }

  handleEndReached = () => {
    const { currentDate } = this.state;
    const { firstDate } = this.props;
    console.log('\n\n--- handleEndReached currentDate:', currentDate);
    const startDate = currentDate;
    const endDate = dateStepper(currentDate);
    console.log({ startDate, endDate });
    // wrap this in an if
    if (firstDate <= startDate) {
      this.setState(
        {
          currentDate: dateStepper(endDate, 1),
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
        renderItem={renderItem}
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
