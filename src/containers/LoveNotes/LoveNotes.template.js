import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

const keyExtractor = (item) => item.id;

const RenderItem = ({item}) => (
  <View>
    <Text>{item.note}</Text>
  </View>
);

export default ({
  receivedLoveNotes,
}) => (
  <View>
    <Text>Love Notes</Text>
    <FlatList
      data={receivedLoveNotes}
      keyExtractor={keyExtractor}
      renderItem={RenderItem}
    />
  </View>
);
