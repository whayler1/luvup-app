import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import _ from 'lodash';

// import { vars, forms } from '../../styles';
import InputWrapper from './InputWrapper';
import InputNumberItem from './InputNumberItem';
import styles from './InputNumber.styles';

const CODE_LENGTH = 6;

class InputNumber extends PureComponent {
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
    value: '',
    inputProps: {},
    error: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  handleChangeText = (value, index) => {
    this.props.onChangeText(value, index);
  };

  render() {
    const {
      handleChangeText,
      props: { label, value, error },
    } = this;
    return (
      <InputWrapper {...{ label, error }}>
        <View style={styles.wrapper}>
          {_.times(CODE_LENGTH, n => (
            <InputNumberItem
              key={n}
              index={n}
              onChangeText={handleChangeText}
              value={value[n] || ''}
            />
          ))}
        </View>
      </InputWrapper>
    );
  }
}

export default InputNumber;
