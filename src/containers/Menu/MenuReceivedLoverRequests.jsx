import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import distanceInWords from 'date-fns/distance_in_words';
import { Ionicons } from '@expo/vector-icons';

import { scene, vars } from '../../styles';
import styles from './Menu.styles';

// "createdAt": "1570533268022",
//   "id": "cafd1d60-e9bc-11e9-a802-55713c749886",
//   "sender": Object {
//     "email": "justin.worsdale@gmail.com",
//     "firstName": "Justin",
//     "id": "0a55aad0-d505-11e9-9495-715e7c49f4e8",
//     "lastName": "Baby",
//   },

const LoverRequestItem = loverRequest => {
  function handlePress() {
    Actions.viewLoverRequest({ loverRequest });
  }
  const { createdAt, sender } = loverRequest;
  return (
    <TouchableOpacity style={styles.loverRequestItem} onPress={handlePress}>
      <View style={styles.loverRequestItemContent}>
        <Text style={[styles.label, styles.loverRequestItemSub]}>
          {distanceInWords(new Date(), new Date(+createdAt), {
            addSuffix: true,
          })}
        </Text>
        <Text style={styles.loverRequestItemTitle}>
          {sender.firstName} {sender.lastName}
        </Text>
        <Text style={styles.loverRequestItemInfo}>{sender.email}</Text>
      </View>
      <View style={styles.loverRequestItemIcon}>
        <Ionicons name="ios-arrow-forward" size={30} color={vars.link} />
      </View>
    </TouchableOpacity>
  );
};

const isArrayWithLength = val => Array.isArray(val) && val.length > 0;

const MenuReceivedLoverRequests = () => {
  const { rows } = useSelector(
    state => ({
      rows: state.receivedLoverRequests.rows,
    }),
    shallowEqual
  );
  if (!isArrayWithLength(rows)) {
    return false;
  }
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
