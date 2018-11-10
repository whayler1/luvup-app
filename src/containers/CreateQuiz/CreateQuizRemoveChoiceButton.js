import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import styles from './CreateQuiz.styles';

const CreateQuizRemoveChoiceButton = ({ onPress }) => (
  <TouchableOpacity style={styles.removeChoiceButton} onPress={onPress}>
    <Text style={styles.removeChoiceGlyph}>+</Text>
  </TouchableOpacity>
);

CreateQuizRemoveChoiceButton.propTypes = {
  onPress: PropTypes.func,
};

export default CreateQuizRemoveChoiceButton;
