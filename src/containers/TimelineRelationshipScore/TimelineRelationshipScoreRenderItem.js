import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import Color from 'color';

import Circle from '../../components/Circle';
import { vars } from '../../styles';

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

const RenderItem = ({ item }) => (
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

RenderItem.propTypes = {
  item: PropTypes.shape({
    day: PropTypes.string.isRequired,
    relationshipScore: PropTypes.shape({
      id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }),
  }),
};

export default RenderItem;
