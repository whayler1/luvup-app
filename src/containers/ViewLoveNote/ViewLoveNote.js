import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ViewLoveNote extends PureComponent {
  static propTypes = {
    loveNoteId: PropTypes.string.isRequired,
  };

  handleMeowPress() {
    console.log('meow press ', this.props.loveNoteId);
  }

  render() {
    return (
      <View>
        <Text>Love Note Id: {this.props.loveNoteId}</Text>
        <TouchableOpacity onPress={this.handleMeowPress}>
          Meowowow
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({}))(ViewLoveNote);
