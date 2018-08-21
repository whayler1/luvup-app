import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Surface } from 'ReactNativeART';
import Color from 'color';

import { getRelationshipScores } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';
import { vars } from '../../styles';
import Circle from '../../components/Circle';

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
  };

  render() {
    return (
      <ScrollView horizontal style={{ marginTop: 90 }}>
        {this.props.relationshipScoresByDate.map(score => (
          <View
            key={score.id}
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
              {moment(score.day).format("MMM D, 'YY")}
            </Text>
            <View
              style={{
                flex: 1,
                width: 70,
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: `${score.score}%`,
                  left: 0,
                  right: 0,
                  width: 70,
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Surface
                  width={70}
                  height={70}
                  style={{ position: 'absolute' }}>
                  <Circle radius={35} fill={getFill(score.score)} />
                </Surface>
                <Text
                  style={{
                    fontFamily: vars.fontBlack,
                    color: 'white',
                    fontSize: 18,
                  }}>
                  {score.score}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default connect(state => ({
  relationshipScoresByDate: state.relationshipScore.relationshipScoresByDate,
}))(TimelineRelationshipScore);
