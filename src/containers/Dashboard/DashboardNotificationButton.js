import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';

import styles from './DashboardNotification.styles';
import { scene } from '../../styles';
import { BUTTON_STYLES } from './DashboardNotification.BUTTON_STYLES';

class DashboardNotificationButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    aryLength: PropTypes.number,
    testID: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  handleFocus = () => {
    this.setState({ isFocus: true });
  };
  handleBlur = () => {
    this.setState({ isFocus: false });
  };

  render() {
    const {
      props: { type, text, index, aryLength, onPress, disabled, testID },
      state: { isFocus },
      handleFocus,
      handleBlur,
    } = this;
    return (
      <TouchableHighlight
        testID={testID}
        underlayColor="white"
        onPress={onPress}
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        disabled={disabled}
        style={[
          styles.button,
          index === aryLength - 1 && styles.buttonLast,
          index === 0 && styles.buttonFirst,
          index > 0 && styles.buttonAdditional,
          isFocus && styles.buttonFocus,
        ]}
      >
        <Text
          style={[
            scene.bodyCopy,
            styles.buttonText,
            type === BUTTON_STYLES.PRIMARY && styles.buttonTextPrimary,
          ]}
        >
          {text}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default DashboardNotificationButton;
