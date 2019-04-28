import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';

import { vars, forms } from '../../styles';
import InputWrapper from './InputWrapper';

class Input extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    inputProps: PropTypes.object,
    onChangeText: PropTypes.func,
    error: PropTypes.string,
    formGroupStyles: PropTypes.array,
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    maxLength: 50,
    inputProps: {},
    error: '',
    formGroupStyles: [],
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

  render() {
    const {
      props: {
        placeholder,
        label,
        value,
        maxLength,
        onChangeText,
        error,
        inputProps,
        formGroupStyles,
      },
      state: { isFocus },
      handleFocus,
      handleBlur,
    } = this;
    return (
      <InputWrapper {...{ label, error, formGroupStyles, isFocus, value }}>
        <TextInput
          style={forms.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          placeholder={isFocus ? placeholder : ''}
          placeholderTextColor={vars.blueGrey100}
          {...inputProps}
        />
      </InputWrapper>
    );
  }
}

export default Input;
