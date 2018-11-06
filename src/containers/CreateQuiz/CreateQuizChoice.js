import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

// import styles from './CreateQuiz.styles';
import { forms } from '../../styles';

class CreateQuizChoice extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  handleChangeText = text => {
    this.props.onChange(text, this.props.index);
  };

  render() {
    return (
      <TextInput
        style={forms.input}
        onChangeText={this.handleChangeText}
        value={this.props.value}
        enabled={this.props.enabled}
      />
    );
  }
}

export default CreateQuizChoice;
