import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import styles from './Pushdown.styles';
import { vars } from '../../styles';

export default class extends PureComponent {
  static propTypes = {
    closeFunc: PropTypes.func.isRequired,
    timeout: PropTypes.number,
  };

  componentDidMount() {
    const timeout = this.props.timeout ? this.props.timeout : 5000;
    this.to = setTimeout(this.props.closeFunc, timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.to);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.copyContainer}>{this.props.children}</View>
        <TouchableOpacity
          onPress={this.props.closeFunc}
          style={styles.closeBtn}>
          <Ionicons name="md-close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
