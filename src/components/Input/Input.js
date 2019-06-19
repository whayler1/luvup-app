import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

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

  handleChangeText = (...args) => {
    this.setState({ isFocus: true });
    this.props.onChangeText(...args);
  };

  render() {
    const {
      props: {
        placeholder,
        label,
        value,
        maxLength,
        error,
        inputProps,
        formGroupStyles,
      },
      state: { isFocus },
      handleFocus,
      handleBlur,
      handleChangeText,
    } = this;
    return (
      <InputWrapper {...{ label, error, formGroupStyles, isFocus, value }}>
        <TextInput
          selectionColor={vars.blueGrey300}
          style={forms.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
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
