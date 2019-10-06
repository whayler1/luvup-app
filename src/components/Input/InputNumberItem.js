import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import styles from './InputNumberItem.styles';

class InputNumberItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    setRef: PropTypes.func,
    editable: PropTypes.bool,
    isError: PropTypes.bool,
  };

  static defdaultProps = {
    editable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  handleFocus = () => {
    this.setState({ isFocus: true });
  };
  handleBlur = () => {
    this.setState({ isFocus: false });
  };
  handleChangeText = value => {
    this.props.onChangeText(value, this.props.index);
  };
  setRef = el => {
    this.props.setRef(el, this.props.index);
  };
  getValue = () => {
    const { value: originalValue } = this.props;
    return originalValue === ' ' ? '' : originalValue;
  };

  render() {
    return (
      <TextInput
        testID={`input-number-${this.props.index}`}
        style={[
          styles.input,
          this.state.isFocus && styles.inputFocus,
          this.props.isError && styles.inputError,
        ]}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        value={this.getValue()}
        onChangeText={this.handleChangeText}
        maxLength={1}
        keyboardType="numeric"
        autoCapitalize="none"
        spellCheck={false}
        editable={this.props.editable}
        ref={this.setRef}
      />
    );
  }
}

export default InputNumberItem;
