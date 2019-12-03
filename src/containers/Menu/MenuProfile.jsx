import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Text, View } from 'react-native';

import MenuLink from './MenuLink';
import { scene } from '../../styles';
import styles from './Menu.styles';

const MenuProfile = ({ handleChangePasswordPress }) => {
  const { userFirstName, userLastName, userEmail, username } = useSelector(
    (state) => ({
      userFirstName: state.user.firstName,
      userLastName: state.user.lastName,
      userEmail: state.user.email,
      username: state.user.username,
    }),
    shallowEqual,
  );
  return (
    <View>
      <Text style={scene.titleCopy}>Profile</Text>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>
        {userFirstName} {userLastName}
      </Text>
      <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>{username}</Text>
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{userEmail}</Text>
      <Text style={styles.label}>Options</Text>
      <MenuLink
        onPress={handleChangePasswordPress}
        iconName="md-unlock"
        text="Change Password"
      />
    </View>
  );
};

export default MenuProfile;
