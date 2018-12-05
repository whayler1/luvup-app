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
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import styles from './CreateLoverRequest.styles';
import { forms, scene, modal, vars } from '../../styles';

const keyExtractor = item => item.id;

export default ({
  onSearchChange,
  onListItemClick,
  search,
  users,
  isInFlight,
  userFirstName,
  userLastName,
  goToMenu,
}) => (
  <KeyboardAvoidingView
    contentContainerStyle={scene.keyboardAvoidingView}
    style={styles.container}
    keyboardVerticalOffset={32}
    behavior="padding">
    <View style={scene.topNav}>
      <View style={scene.topNavContent}>
        <TouchableOpacity
          onPress={goToMenu}
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: vars.fontBlack,
              fontSize: 16,
              color: vars.blueGrey500,
            }}>
            {_.isString(userFirstName) && userFirstName.substr(0, 1)}
            {_.isString(userLastName) && userLastName.substr(0, 1)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
      {users.length > 0 && (
        <FlatList
          style={{
            paddingTop: 16,
          }}
          data={users}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onListItemClick(item.id)}>
              <View style={styles.renderItem}>
                <Text style={styles.renderItemName}>{`${item.firstName} ${
                  item.lastName
                }`}</Text>
                <Text style={styles.renderItemUsername}>{item.username}</Text>
                <View
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 0,
                  }}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={30}
                    color={vars.link}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {isInFlight && !users.length && (
        <Text style={[modal.copy, { color: vars.blue500 }]}>Searching…</Text>
      )}
      {!isInFlight &&
        !users.length &&
        (() => {
          if (search.length < 2) {
            return (
              <Text style={modal.copy}>
                Use the search box above to find your lover. Once you and your
                lover are linked you can begin to use Luvup!
              </Text>
            );
          }
          return (
            <Text style={[modal.copy, { color: vars.red500 }]}>
              There are no users who match that username, email or full name.
              Please double check your spelling.
            </Text>
          );
        })()}
    </ScrollView>
  </KeyboardAvoidingView>
);
