import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './CreateQuiz.styles';
import CreateQuizChoice from './CreateQuizChoice';
import CreateQuizAddChoiceButton from './CreateQuizAddChoiceButton';

const CreateQuizChoices = ({
  choices,
  senderChoiceIndex,
  onChoiceChange,
  onAddChoice,
}) => (
  <View style={styles.choicesList}>
    {choices.map((choice, index) => (
      <CreateQuizChoice
        key={index}
        index={index}
        value={choice}
        onChange={onChoiceChange}
        isChecked={index === senderChoiceIndex}
        enabled
      />
    ))}
    {choices.length < 5 && <CreateQuizAddChoiceButton onPress={onAddChoice} />}
  </View>
);

CreateQuizChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  senderChoiceIndex: PropTypes.number.isRequired,
  onChoiceChange: PropTypes.func.isRequired,
  onAddChoice: PropTypes.func.isRequired,
};

export default CreateQuizChoices;
