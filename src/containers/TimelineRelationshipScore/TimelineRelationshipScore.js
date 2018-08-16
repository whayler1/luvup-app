/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class TimelineRelationshipScore extends PureComponent {
  render() {
    return (
      <View>
        <Text>Timeline relationship sore</Text>
      </View>
    );
  }
}

export default connect(state => ({
  relationshipScores: state.relationshipScore.relationshipScores,
}))(TimelineRelationshipScore);
