import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { quiz as styles } from '../../styles';
import CoinRow from '../../components/CoinRow';
import Button, { BUTTON_STYLES } from '../../components/Button';
import { getCorrectAnswerReaction } from './ViewQuiz.helpers';

const handleDone = () => Actions.popTo('dashboard');

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
        buttonStyles={BUTTON_STYLES.INFO_SKELETON}
        title="Done"
      />
    </View>
  </View>
);

ViewQuizSuccess.propTypes = {
  reward: PropTypes.number.isRequired,
};

export default ViewQuizSuccess;
