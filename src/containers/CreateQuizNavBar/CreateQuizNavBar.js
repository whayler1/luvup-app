import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './CreateQuizNavBar.styles';

class CreateQuizNavBar extends PureComponent {
  handleBackPress = () => (this.props.isDisabled ? null : Actions.pop());

  handleNextPress = () =>
    this.props.isDisabled ? null : this.props.onNextPress();

  render() {
    return (
      <View style={styles.navBarWrapper}>
        <TouchableOpacity
          style={styles.navBarBack}
          onPress={this.handleBackPress}>
          <Text style={styles.navBarPressableText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarBack}
          onPress={this.handleNextPress}>
          <Text style={styles.navBarPressableText}>{this.props.nextText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CreateQuizNavBar.propTypes = {
  onNextPress: PropTypes.func,
  nextText: PropTypes.string,
  isDisabled: PropTypes.bool,
};

CreateQuizNavBar.defaultProps = {
  nextText: 'Next',
  isDisabled: false,
};

export default CreateQuizNavBar;
