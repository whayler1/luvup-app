import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { quiz as styles } from '../../styles';
import CreateQuizAddChoiceButton from './CreateQuizAddChoiceButton';
import CreateQuizRemoveChoiceButton from './CreateQuizRemoveChoiceButton';

const CreateQuizLengthUI = ({
  choices,
  onAddChoice,
  onRemoveChoice,
  isMaxChoicesLengthError,
  maxChoicesLength,
}) => (
  <Fragment>
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
  </Fragment>
);

CreateQuizLengthUI.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onAddChoice: PropTypes.func,
  onRemoveChoice: PropTypes.func,
  isMaxChoicesLengthError: PropTypes.bool,
  maxChoicesLength: PropTypes.number.isRequired,
};

export default CreateQuizLengthUI;
