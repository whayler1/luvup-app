import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { View, Text } from 'react-native';

import { scene } from '../../styles';
import styles from './Menu.styles';

// "createdAt": "1570533268022",
//   "id": "cafd1d60-e9bc-11e9-a802-55713c749886",
//   "sender": Object {
//     "email": "justin.worsdale@gmail.com",
//     "firstName": "Justin",
//     "id": "0a55aad0-d505-11e9-9495-715e7c49f4e8",
//     "lastName": "Baby",
//   },

const LoverRequestItem = ({ createdAt, sender }) => (
  <View>
    <Text>{createdAt}</Text>
    <Text>
      {sender.firstName} {sender.lastName}
    </Text>
    <Text>{sender.email}</Text>
  </View>
);

const MenuReceivedLoverRequests = () => {
  const { rows } = useSelector(
    state => ({
      rows: state.receivedLoverRequests.rows,
    }),
    shallowEqual
  );
  return (
    <View style={styles.group}>
      <Text testID="menu-received-lover-request-title" style={scene.titleCopy}>
        Lover Requests
      </Text>
      {rows.map(row => (
        <LoverRequestItem key={row.id} {...row} />
      ))}
    </View>
  );
};

export default MenuReceivedLoverRequests;
