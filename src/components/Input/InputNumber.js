import React, { PureComponent } from 'react';
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
    editable: PropTypes.bool,
    setFirstRef: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    value: '',
    inputProps: {},
    error: '',
    editable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
    this.refEls = [];
  }

  handleChangeText = (value, index) => {
    this.props.onChangeText(value, index);
    const indexPlusOne = index + 1;
    if (value.length > 0 && indexPlusOne < CODE_LENGTH) {
      this.refEls[indexPlusOne].focus();
    }
  };

  setRef = (el, n) => {
    this.refEls[n] = el;
    if (n === 0) {
      this.props.setFirstRef(el);
    }
  };

  render() {
    const {
      handleChangeText,
      setRef,
      props: { label, value, error, editable },
    } = this;
    return (
      <InputWrapper {...{ label, error, value: ' ' }}>
        <View style={styles.wrapper}>
          {_.times(CODE_LENGTH, n => (
            <InputNumberItem
              key={n}
              index={n}
              onChangeText={handleChangeText}
              value={value[n] || ''}
              setRef={setRef}
              editable={editable}
            />
          ))}
        </View>
      </InputWrapper>
    );
  }
}

export default InputNumber;
