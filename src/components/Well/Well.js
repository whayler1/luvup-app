import React, { PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { vars, wells, } from '../../styles';

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
      <View style={wells.error}>
        {this.props.text && <Text style={wells.errorText}>{this.props.text}</Text>}
      </View>
    );
  }
}
