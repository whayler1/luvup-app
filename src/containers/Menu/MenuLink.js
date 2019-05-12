import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './Menu.styles';
import { vars } from '../../styles';

export const LINK_TYPE = {
  INFO: 'info',
  DANGER: 'danger',
};

const LINK_COLORS = {
  [LINK_TYPE.INFO]: vars.link,
  [LINK_TYPE.DANGER]: vars.danger,
};

const getTextStyles = linkType => [
  styles.menuLinkText,
  linkType === LINK_TYPE.DANGER && styles.menuLinkTextDanger,
];

const MenuLink = ({ linkType, onPress, iconName, text }) => (
  <TouchableOpacity style={styles.menuLinkContainer} onPress={onPress}>
    <Text style={getTextStyles(linkType)}>{text}</Text>
    {iconName && (
      <Ionicons name={iconName} size={22} color={LINK_COLORS[linkType]} />
    )}
  </TouchableOpacity>
);

MenuLink.propTypes = {
  linkType: PropTypes.string,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  text: PropTypes.string,
};

MenuLink.defaultProps = {
  linkType: LINK_TYPE.INFO,
};

export default MenuLink;
