import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import styles from './CreateQuiz.styles';
import { forms } from '../../styles';
import CreateQuizChoiceCheckbox from './CreateQuizChoiceCheckbox';

const placeholders = [
  'Think of a good answer',
  'Think of an answer',
  'Think of a funny answer',
];

class CreateQuizChoice extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.placeholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  handleChangeText = text => {
    this.props.onChange(text, this.props.index);
  };

  render() {
    return (
      <View style={styles.choiceItem}>
        <View style={styles.choiceItemCheckboxWrapper}>
          <CreateQuizChoiceCheckbox
            isChecked={this.props.isChecked}
            scale={0.5}
          />
        </View>
        <View style={styles.choiceItemInputWrapper}>
          <TextInput
            style={forms.input}
            placeholder={this.placeholder}
            onChangeText={this.handleChangeText}
            value={this.props.value}
            enabled={this.props.enabled}
          />
        </View>
      </View>
    );
  }
}

export default CreateQuizChoice;
