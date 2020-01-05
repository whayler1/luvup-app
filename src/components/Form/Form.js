import camelCase from 'lodash/camelCase';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import last from 'lodash/last';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';

const getErrorKey = (key) => `${key}Error`;
const getRefKey = (key) => `${key}El`;

const getFirstError = (value, tests) =>
  tests.map((test) => test(value))[0] || '';

class Form extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    isInFlight: PropTypes.bool,
    children: PropTypes.func,
    defaultState: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.validators = {};
    this.inputKeys = [];
    this.state = props.defaultState || {};
  }

  _onChangeText = (key) => (value) => {
    this.setState({ [key]: value, [getErrorKey(key)]: '' });
  };

  _ref = (key) => (el) => (this[getRefKey(key)] = el);

  _onSubmitEditing = (key) => () => {
    const { inputKeys } = this;
    if (key === last(inputKeys)) {
      this.handleSubmit();
      return;
    }
    const index = inputKeys.findIndex((inputKey) => inputKey === key);
    const refKey = getRefKey(inputKeys[index + 1]);
    this[refKey].focus();
  };

  _getInputProps = (key, originalInputProps) => ({
    ref: this._ref(key),
    returnKeyType: 'go',
    onSubmitEditing: this._onSubmitEditing(key),
    editable: !this.props.isInFlight,
    ...originalInputProps,
  });

  validate = () => {
    const stateObj = Object.entries(this.validators).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [getErrorKey(key)]: getFirstError(this.state[key] || '', value),
      }),
      {},
    );
    this.setState(stateObj);
    return Object.values(stateObj).every((value) => {
      if (!isString) {
        return true;
      }
      return value.length < 1;
    });
  };

  handleSubmit = () => {
    const {
      props: { onSubmit },
    } = this;
    if (this.validate() && isFunction(onSubmit)) {
      onSubmit(this.state);
    }
  };

  renderInput = ({
    label,
    key: originalKey,
    validators = [],
    inputProps: originalInputProps = {},
    ...props
  }) => {
    const key = originalKey || camelCase(label);
    this.validators[key] = validators;
    if (!this.inputKeys.includes(key)) {
      this.inputKeys.push(key);
    }
    return (
      <Input
        {...{
          label,
          value: this.state[key],
          error: this.state[getErrorKey(key)] || '',
          onChangeText: this._onChangeText(key),
          ...props,
          inputProps: this._getInputProps(key, originalInputProps),
        }}
      />
    );
  };

  renderSubmit = (props) => {
    const { isInFlight } = this.props;
    return (
      <Button
        {...{
          isInFlight,
          onPress: this.handleSubmit,
          ...props,
        }}
      />
    );
  };

  render() {
    const {
      props: { children },
      state: formState,
      renderInput,
      renderSubmit,
    } = this;
    if (!children) {
      return false;
    }
    return children({ renderInput, renderSubmit, formState });
  }
}

export default Form;
