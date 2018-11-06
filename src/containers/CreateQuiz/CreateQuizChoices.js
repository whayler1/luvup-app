import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './CreateQuiz.styles';
import CreateQuizChoice from './CreateQuizChoice';

const CreateQuizChoices = ({ choices, onChoiceChange }) => (
  <View style={styles.choicesList}>
    {choices.map((choice, index) => (
      <CreateQuizChoice
        key={index}
        index={index}
        value={choice}
        onChange={onChoiceChange}
        enabled
      />
    ))}
  </View>
);

CreateQuizChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onChoiceChange: PropTypes.func.isRequired,
};

export default CreateQuizChoices;
