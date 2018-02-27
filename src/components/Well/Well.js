import React, { PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { vars, wells, } from '../../styles';

const getViewStyle = type => {
  switch (type) {
    case 'success':
      return wells.success;
      break;
    default:
      return wells.error;
  };
};

const getTextStyle = type => {
  switch (type) {
    case 'success':
      return wells.successText;
      break;
    default:
      return wells.errorText;
  }
};

export default class Well extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf([
      'danger',
      'warning',
      'info',
      'success',
    ]),
    text: PropTypes.string,
  }

  render() {
    return (
      <View style={getViewStyle(this.props.type)}>
        {this.props.text && <Text style={getTextStyle(this.props.type)}>{this.props.text}</Text>}
      </View>
    );
  }
}
