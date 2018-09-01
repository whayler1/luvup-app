import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import Color from 'color';

import Circle from '../../components/Circle';
import { vars } from '../../styles';
import styles from './TimelineRelationshipScore.styles';

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
  <View style={styles.renderItemContainer}>
    <Text style={styles.renderItemText}>
      {moment(item.day).format("MMM D, 'YY")}
    </Text>
    <View style={styles.renderItemScoreContainer}>
      <View
        style={[
          styles.renderItemScore,
          {
            bottom: `${item.relationshipScore.score}%`,
          },
        ]}>
        <Surface width={70} height={70} style={styles.renderItemBubble}>
          <Circle radius={35} fill={getFill(item.relationshipScore.score)} />
        </Surface>
        <Text style={styles.renderItemScoreText}>
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
