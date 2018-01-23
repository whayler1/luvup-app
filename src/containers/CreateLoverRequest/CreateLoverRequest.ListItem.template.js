import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class ListItem extends Component {
  // onPress = () => this.props.item.onListItemClick(this.props.id);

  render() {
    console.log('this.props', this.props);
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={() => {}}>
        <View>
          <Text>{item.username}</Text>
          <Text>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};
