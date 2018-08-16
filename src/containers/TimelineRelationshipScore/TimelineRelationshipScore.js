import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { getRelationshipScores } from '../../redux/relationshipScore/relationshipScore.actions';
import { store } from '../../redux';

class TimelineRelationshipScore extends PureComponent {
  static onEnter() {
    console.log('onEnter');
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
      <View>
        <Text>Timeline relationship sore</Text>
        {this.props.relationshipScores.map(score => (
          <Text key={score.id}>
            {score.score} - {score.createdAt}
          </Text>
        ))}
      </View>
    );
  }
}

export default connect(state => ({
  relationshipScores: state.relationshipScore.relationshipScores,
}))(TimelineRelationshipScore);
