import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import { vars, forms } from '../../styles';

class Input extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    inputProps: PropTypes.object,
    onChangeText: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    maxLength: 50,
    inputProps: {},
    error: '',
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
      },
      state: { isFocus },
      handleFocus,
      handleBlur,
    } = this;
    return (
      <View style={forms.formGroup}>
        <Text style={forms.label}>{label}</Text>
        <TextInput
          style={[forms.input, isFocus && forms.inputFocus]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={vars.blueGrey100}
          {...inputProps}
        />
        {error.length > 0 && <Text style={forms.error}>{error}</Text>}
      </View>
    );
  }
}

export default Input;
