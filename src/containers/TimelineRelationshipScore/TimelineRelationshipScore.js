import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Surface } from 'ReactNativeART';
import Color from 'color';

import { getRelationshipScores } from '../../redux/relationshipScore/relationshipScore.actions';
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
    key={item.id}
    style={{
      borderRightColor: vars.blueGrey50,
      borderRightWidth: 1,
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
          bottom: `${item.score}%`,
          left: 0,
          right: 0,
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Surface width={70} height={70} style={{ position: 'absolute' }}>
          <Circle radius={35} fill={getFill(item.score)} />
        </Surface>
        <Text
          style={{
            fontFamily: vars.fontBlack,
            color: 'white',
            fontSize: 18,
          }}>
          {item.score}
        </Text>
      </View>
    </View>
  </View>
);

const keyExtractor = item => item.id;

class TimelineRelationshipScore extends PureComponent {
  static onEnter() {
    store.dispatch(getRelationshipScores(100));
  }

  static propTypes = {
    relationshipScoresByDate: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
      })
    ),
    isGettingRelationshipScores: PropTypes.bool.isRequired,
    getRelationshipScoresError: PropTypes.string,
  };

  render() {
    const { isGettingRelationshipScores } = this.props;
    const style = { marginTop: 90 };
    if (isGettingRelationshipScores) {
      style.alignSelf = 'stretch';
    }
    return (
      <FlatList
        horizontal={!isGettingRelationshipScores}
        style={style}
        renderItem={renderItem}
        data={this.props.relationshipScoresByDate}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <ListEmptyComponent
            isInFlight={isGettingRelationshipScores}
            error={this.props.getRelationshipScoresError}
          />
        }
      />
    );
  }
}

export default connect(state => ({
  relationshipScoresByDate: state.relationshipScore.relationshipScoresByDate,
  isGettingRelationshipScores:
    state.relationshipScore.isGettingRelationshipScores,
  getRelationshipScoresError:
    state.relationshipScore.getRelationshipScoresError,
}))(TimelineRelationshipScore);
