import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import _ from 'lodash';

import { forms, quiz as styles } from '../../styles';
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
    isReadOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    isChecked: PropTypes.bool.isRequired,
    isWrong: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    isWrong: false,
  };

  constructor(props) {
    super(props);
    this.placeholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];
    this.onPress = this.props.onSelect ? this.handleSelectPress : undefined;
  }

  handleChangeText = text => {
    this.props.onChange(text, this.props.index);
  };

  handleSelectPress = () => {
    if (_.isFunction(this.props.onSelect)) {
      this.props.onSelect(this.props.index);
    }
  };

  render() {
    return (
      <Fragment>
        <View style={styles.choiceItem}>
          <View style={styles.choiceItemCheckboxWrapper}>
            <CreateQuizChoiceCheckbox
              testID={`create-quiz-choice-checkbox-${this.props.index}`}
              isChecked={this.props.isChecked}
              isWrong={this.props.isWrong}
              scale={this.props.isReadOnly ? 0.28 : 0.5}
              onPress={this.onPress}
            />
          </View>
          <View style={styles.choiceItemInputWrapper}>
            {this.props.isReadOnly ? (
              <Text style={styles.answerText}>{this.props.value}</Text>
            ) : (
              <TextInput
                testID={`create-quiz-choice-input-${this.props.index}`}
                style={forms.input}
                placeholder={this.placeholder}
                onChangeText={this.handleChangeText}
                value={this.props.value}
                enabled={this.props.enabled}
                maxLength={200}
              />
            )}
          </View>
        </View>
        {_.isString(this.props.error) && this.props.error.length > 0 && (
          <Text style={[forms.error, styles.choiceError]}>Create a choice</Text>
        )}
      </Fragment>
    );
  }
}

export default CreateQuizChoice;
