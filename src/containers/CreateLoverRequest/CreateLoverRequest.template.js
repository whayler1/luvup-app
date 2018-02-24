import React from 'react';
import {
  Text,
  TextInput,
  FlatList,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CreateLoverRequest.styles';
import { forms, buttons, scene, modal, vars, } from '../../styles';

const keyExtractor = item => item.id;

export default ({
  onSearchChange,
  onListItemClick,
  search,
  users,
  isInFlight,
}) => (
  <KeyboardAvoidingView
    contentContainerStyle={scene.keyboardAvoidingView}
    style={styles.container}
    keyboardVerticalOffset={32}
    behavior="padding"
  >
    <ScrollView style={scene.content}>
      <View style={scene.formGroup}>
        <Text style={forms.label}>Search for your lover</Text>
        <TextInput
          style={forms.input}
          onChangeText={onSearchChange}
          value={search}
          maxLength={100}
          autoCapitalize={'none'}
          spellCheck={false}
          placeholder={'email, name or username'}
          placeholderTextColor={vars.placeholder}
        />
      </View>
      {users.length > 0 && <FlatList
        style={{
          paddingTop: 16,
        }}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onListItemClick(item.id)}>
            <View style={styles.renderItem}>
              <Text style={styles.renderItemName}>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={styles.renderItemUsername}>{item.username}</Text>
              <View style={{
                position: 'absolute',
                top: 18,
                right: 0,
              }}>
                <Icon
                  name="ios-arrow-forward-outline"
                  size={30}
                  color={vars.link}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />}
      {isInFlight && !users.length && <Text style={[modal.copy, { color: vars.blue500 }]}>Searching…</Text>}
      {!isInFlight && !users.length && (() => {
        if (search.length < 2) {
          return <Text style={modal.copy}>Use the search box above to find your lover. Once you and your lover are linked you can begin to use Luvup!</Text>;
        }
        return <Text style={[modal.copy, { color: vars.red500 }]}>There are no users who match that username, email or full name. Please double check your spelling.</Text>;
      })()}
    </ScrollView>
  </KeyboardAvoidingView>
);
