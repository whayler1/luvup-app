import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './CreateLoverRequest.styles';
import { vars } from '../../styles';

class CreateLoverRequestRenderItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handleItemPress() {
    this.props.onPress(this.props.item.id);
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.handleItemPress}>
        <View style={styles.renderItem}>
          <Text style={styles.renderItemName}>{`${item.firstName} ${
            item.lastName
          }`}</Text>
          <Text style={styles.renderItemUsername}>{item.username}</Text>
          <View style={styles.renderItemIcon}>
            <Ionicons name="ios-arrow-forward" size={30} color={vars.link} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CreateLoverRequestRenderItem;
