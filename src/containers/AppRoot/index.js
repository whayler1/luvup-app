import React, { Component } from 'react';
import superagent from 'superagent';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import { Router, routerReducer, Route, Container, Animations, Schema } from 'react-native-redux-router';
import { createStore, combineReducers } from 'redux';

import Login from '../components/Login';

export default class AppRoot extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
          <Router>
              <Route name="Login" component={Login} initial={true} title="Launch"/>
          </Router>
      </View>
    );
  }
}
