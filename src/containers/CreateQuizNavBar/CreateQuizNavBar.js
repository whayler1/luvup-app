import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './CreateQuizNavBar.styles';

class CreateQuizNavBar extends PureComponent {
  handleBackPress = () => Actions.pop();

  render() {
    return (
      <View style={styles.navBarWrapper}>
        <TouchableOpacity
          style={styles.navBarBack}
          onPress={this.handleBackPress}>
          <Text style={styles.navBarBackText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarBack}
          onPress={this.props.onNextPress}>
          <Text style={styles.navBarBackText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CreateQuizNavBar.propTypes = {
  onNextPress: PropTypes.func,
};

export default CreateQuizNavBar;
