import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './CreateQuiz.styles';
import CreateQuizChoice from './CreateQuizChoice';
import CreateQuizLengthUI from './CreateQuizLengthUI';

const CreateQuizChoices = ({
  choices,
  senderChoiceIndex,
  onChoiceChange,
  onSelectChoice,
  onAddChoice,
  onRemoveChoice,
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
        enabled
      />
    ))}
    <CreateQuizLengthUI
      choices={choices}
      onAddChoice={onAddChoice}
      onRemoveChoice={onRemoveChoice}
    />
  </View>
);

CreateQuizChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  senderChoiceIndex: PropTypes.number.isRequired,
  onChoiceChange: PropTypes.func.isRequired,
  onSelectChoice: PropTypes.func.isRequired,
  onAddChoice: PropTypes.func.isRequired,
  onRemoveChoice: PropTypes.func.isRequired,
};

export default CreateQuizChoices;
