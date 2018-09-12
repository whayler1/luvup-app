import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';

import Circle from '../../components/Circle';
import styles from './TimelineRelationshipScore.styles';
import getRelationshipScoreFill from '../../helpers/getRelationshipScoreFill';

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
          <Circle
            radius={35}
            fill={getRelationshipScoreFill(item.relationshipScore.score).hex()}
          />
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
