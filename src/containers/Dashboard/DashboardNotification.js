import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './DashboardNotification.styles';
import DashboardNotificationButton from './DashboardNotificationButton';

export const BUTTON_STYLES = {
  PRIMARY: 'primary',
};

const DashboardNotification = ({ children, buttons }) => (
  <View style={styles.wrapper}>
    <View style={styles.content}>{children}</View>
    <View style={styles.buttonWrapper}>
      {buttons.map((button, i, ary) => (
        <DashboardNotificationButton
          key={button.key}
          {...button}
          index={i}
          aryLength={ary.length}
        />
      ))}
    </View>
  </View>
);

DashboardNotification.propTypes = {
  children: PropTypes.node,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      onPress: PropTypes.func,
    })
  ),
};

DashboardNotification.defaultProps = {
  buttons: [
    {
      key: 'cancel',
      text: 'Cancel',
    },
    {
      key: 'resend',
      type: BUTTON_STYLES.PRIMARY,
      text: 'Resend',
    },
  ],
};

export default DashboardNotification;
