import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';

import { getRelationshipScores } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';

class TimelineRelationshipScore extends PureComponent {
  static onEnter() {
    store.dispatch(getRelationshipScores(100));
  }

  static propTypes = {
    relationshipScores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
  };

  render() {
    return (
      <ScrollView horizontal style={{ marginTop: 60 }}>
        <Text>Timeline relationship sore</Text>
        {this.props.relationshipScores.map(score => (
          <Text key={score.id}>
            {score.score} - {score.createdAt}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

export default connect(state => ({
  relationshipScores: state.relationshipScore.relationshipScores,
}))(TimelineRelationshipScore);
