import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getRelationshipScores } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';

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
      <ScrollView horizontal style={{ marginTop: 60 }}>
        {this.props.relationshipScoresByDate.map(score => (
          <View key={score.id}>
            <Text>{moment(score.day).format("MMM D, 'YY")}</Text>
            <Text>{score.score}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default connect(state => ({
  relationshipScoresByDate: state.relationshipScore.relationshipScoresByDate,
}))(TimelineRelationshipScore);
