import React from 'react';
import { Text, TextInput, FlatList, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { forms, buttons, scene } from '../../styles';

const keyExtractor = item => item.id;

export default ({
  onSearchChange,
  onListItemClick,
  search,
  users,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={scene.container}
    scrollEnabled={true}
  >
    <Text style={forms.label}>Search for your lover</Text>
    <TextInput
      style={forms.input}
      onChangeText={onSearchChange}
      value={search}
      maxLength={100}
      autoCapitalize={'none'}
      spellCheck={false}
      placeholder={'username, email, or full name'}
    />
    <FlatList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onListItemClick(item.id)}>
          <View>
            <Text>{item.username}</Text>
            <Text>{`${item.firstName} ${item.lastName}`}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </KeyboardAwareScrollView>
);
