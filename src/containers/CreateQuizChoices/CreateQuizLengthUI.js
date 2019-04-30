import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { quiz as styles } from '../../styles';
import CreateQuizAddChoiceButton from './CreateQuizAddChoiceButton';
import CreateQuizRemoveChoiceButton from './CreateQuizRemoveChoiceButton';
import Button from '../../components/Button';

const CreateQuizLengthUI = ({
  choices,
  onAddChoice,
  onRemoveChoice,
  onSubmit,
  isMaxChoicesLengthError,
  maxChoicesLength,
}) => (
  <View style={styles.choicesUiWrapper}>
    <View style={styles.choicesUiItem}>
      <View style={styles.creatQuizLengthUiWrapper}>
        <CreateQuizAddChoiceButton
          onPress={onAddChoice}
          isDisabled={choices.length === maxChoicesLength}
        />
        {choices.length > 3 && (
          <CreateQuizRemoveChoiceButton onPress={onRemoveChoice} />
        )}
      </View>
      {isMaxChoicesLengthError && (
        <Text style={styles.maxChoiceLengthError}>
          Max {maxChoicesLength} choices
        </Text>
      )}
    </View>
    <View style={styles.choicesUiItem}>
      <Button
        testID="create-quiz-choice-next"
        onPress={onSubmit}
        title="Next"
      />
    </View>
  </View>
);

CreateQuizLengthUI.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onAddChoice: PropTypes.func,
  onRemoveChoice: PropTypes.func,
  onSubmit: PropTypes.func,
  isMaxChoicesLengthError: PropTypes.bool,
  maxChoicesLength: PropTypes.number.isRequired,
};

export default CreateQuizLengthUI;
