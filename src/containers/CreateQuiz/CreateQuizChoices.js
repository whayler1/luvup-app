import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './CreateQuiz.styles';
import CreateQuizChoice from './CreateQuizChoice';
import CreateQuizLengthUI from './CreateQuizLengthUI';

const CreateQuizChoices = ({
  choices,
  choicesErrors,
  senderChoiceIndex,
  onChoiceChange,
  onSelectChoice,
  onAddChoice,
  onRemoveChoice,
  isMaxChoicesLengthError,
  maxChoicesLength,
}) => (
  <View style={styles.choicesList}>
    {choices.map((choice, index) => (
      <CreateQuizChoice
        key={index}
        index={index}
        value={choice}
        onChange={onChoiceChange}
        onSelect={onSelectChoice}
        isChecked={index === senderChoiceIndex}
        error={choicesErrors[index]}
        enabled
      />
    ))}
    <CreateQuizLengthUI
      {...{
        choices,
        onAddChoice,
        onRemoveChoice,
        isMaxChoicesLengthError,
        maxChoicesLength,
      }}
    />
  </View>
);

CreateQuizChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  choicesErrors: PropTypes.arrayOf(PropTypes.string),
  senderChoiceIndex: PropTypes.number.isRequired,
  onChoiceChange: PropTypes.func.isRequired,
  onSelectChoice: PropTypes.func.isRequired,
  onAddChoice: PropTypes.func.isRequired,
  onRemoveChoice: PropTypes.func.isRequired,
  isMaxChoicesLengthError: PropTypes.bool,
  maxChoicesLength: PropTypes.number.isRequired,
};

export default CreateQuizChoices;
