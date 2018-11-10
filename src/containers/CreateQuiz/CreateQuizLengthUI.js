import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './CreateQuiz.styles';
import CreateQuizAddChoiceButton from './CreateQuizAddChoiceButton';
import CreateQuizRemoveChoiceButton from './CreateQuizRemoveChoiceButton';

const CreateQuizLengthUI = ({ choices, onAddChoice, onRemoveChoice }) => (
  <View style={styles.creatQuizLengthUiWrapper}>
    <CreateQuizAddChoiceButton
      onPress={onAddChoice}
      isDisabled={choices.length === 6}
    />
    {choices.length > 3 && (
      <CreateQuizRemoveChoiceButton onPress={onRemoveChoice} />
    )}
  </View>
);

CreateQuizLengthUI.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onAddChoice: PropTypes.func,
  onRemoveChoice: PropTypes.func,
};

export default CreateQuizLengthUI;
