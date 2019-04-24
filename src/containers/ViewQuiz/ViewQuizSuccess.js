import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

import { quiz as styles, buttons } from '../../styles';
import CoinRow from '../../components/CoinRow';
import { getCorrectAnswerReaction } from './ViewQuiz.helpers';

const handleDone = () => Actions.dashboard();

const ViewQuizSuccess = ({ reward }) => (
  <View style={styles.successContainer}>
    <View style={styles.successWrapper}>
      <CoinRow reward={reward} />
      <View style={styles.successTextWrapper}>
        <Text style={styles.successText}>{getCorrectAnswerReaction()}</Text>
        <Text style={styles.successText}>You win {reward} Luvups</Text>
      </View>
      <Button
        testID="view-quiz-success-done"
        onPress={handleDone}
        containerViewStyle={buttons.container}
        buttonStyle={buttons.infoSkeletonButton}
        textStyle={buttons.infoSkeletonText}
        title="Done"
      />
    </View>
  </View>
);

ViewQuizSuccess.propTypes = {
  reward: PropTypes.number.isRequired,
};

export default ViewQuizSuccess;
