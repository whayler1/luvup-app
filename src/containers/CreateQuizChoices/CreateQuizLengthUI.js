import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { quiz as styles, buttons } from '../../styles';
import CreateQuizAddChoiceButton from './CreateQuizAddChoiceButton';
import CreateQuizRemoveChoiceButton from './CreateQuizRemoveChoiceButton';

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
        onPress={onSubmit}
        containerViewStyle={buttons.container}
        buttonStyle={buttons.infoButton}
        textStyle={buttons.infoText}
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
