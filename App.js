import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import { store } from './src/redux';

import Root from './src/containers/Root';
import Login from './src/containers/Login';
import SignUp from './src/containers/SignUp';
import SignUpConfirm from './src/containers/SignUpConfirm';
import Dashboard from './src/containers/Dashboard';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const App = () => (
  <Provider store={store}>
    <Router
      createReducer={reducerCreate}
      getSceneStyle={getSceneStyle}
    >
      <Stack key="root">
        <Scene key="init" component={Root} title = "Root"/>
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="signup" component={SignUp} title="Sign Up"/>
        <Scene key="signupconfirm" component={SignUpConfirm} title="Confirm Sign Up"/>
        <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
      </Stack>
    </Router>
  </Provider>
);

export default App;

// import React, { Component } from 'react';
// import superagent from 'superagent';
// import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
// import { Router, routerReducer, Route, Container, Animations, Schema } from 'react-native-redux-router';
// import { createStore, combineReducers } from 'redux';
//
// import Login from './src/components/Login';
//
// export default class AppRoot extends Component {
//   render() {
//     return (
//       <View style={{flex:1}}>
//           <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
//           <Router>
//               <Route name="Login" component={Login} initial={true} title="Launch"/>
//           </Router>
//       </View>
//     );
//   }
// }

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       isIdTokenLoaded: false,
//       isUserAuthed: false
//     };
//   }
//
//   onSubmit = async () => {
//     const headers = new Headers();
//     headers.set('Accepts', 'application/json');
//     headers.set('Content-Type', 'application/json');
//     const { username, password } = this.state;
//
//     let id_token;
//
//     try {
//       const loginRes = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });
//       console.log('\n\nloginRes', loginRes);
//
//       const body = JSON.parse(loginRes._bodyText);
//       console.log('-- got a res!', body);
//
//       id_token = body.id_token;
//     } catch(err) {
//       console.error('caught the err', err);
//
//     }
//
//     await AsyncStorage.setItem('id_token', id_token);
//
//     await fetch('http://localhost:3000/graphql', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({
//         query: '{ me { id email } }'
//       })
//     }).then(res => {
//       console.log('another res!!!', res);
//     }).catch(err => console.log('inner err', err));
//
//     const val = await AsyncStorage.getItem('id_token');
//     console.log('val:', val);
//     this.setState({
//       isUserAuthed: true
//     });
//   }
//
//   getIdToken = async () => {
//     const id_token = await AsyncStorage.getItem('id_token');
//     return id_token;
//   }
//
//   reauth = async (id_token) => {
//     try {
//       const res = await superagent.post('http://localhost:3000/reauth')
//         .send({ id_token });
//
//       const { body } = res;
//       this.setState({
//         isIdTokenLoaded: true,
//         isUserAuthed: true,
//         username: body.user.username,
//       });
//       console.log('\n\n --- body', body);
//     } catch (err) {
//       console.log('err', err);
//       this.setState({
//         isIdTokenLoaded: true
//       });
//     }
//   }
//
//   logout = async () => {
//     console.log('logout');
//     await AsyncStorage.removeItem('id_token');
//     this.setState({
//       username: '',
//       isUserAuthed: false
//     });
//   }
//
//   componentWillMount = async () => {
//     const id_token = await this.getIdToken();
//     if (id_token) {
//       this.reauth(id_token);
//     } else {
//       this.setState({ isIdTokenLoaded: true });
//     }
//   }
//
//   render() {
//     if (!this.state.isIdTokenLoaded) {
//       return (
//         <View style={styles.container}>
//           <Text style={{fontSize: 30}}>Loading ID Token</Text>
//         </View>
//       )
//     }
//     if (this.state.isIdTokenLoaded && this.state.isUserAuthed) {
//       return (
//         <View style={styles.container}>
//           <Text style={{fontSize: 30}}>Logged in: { this.state.username }</Text>
//           <Button
//             onPress={this.logout}
//             title="Logout"
//             color="#841584"
//             accessibilityLabel="Log out of Luvup"
//           />
//         </View>
//       );
//     }
//     if (this.state.isIdTokenLoaded && !this.state.isUserAuthed) {
//       return (
//         <View style={styles.container}>
//           <Text style={{fontSize: 30}}>Login</Text>
//           <Text style={{marginTop: 20}}>User Name</Text>
//           <TextInput
//             style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
//             onChangeText={(username) => this.setState({username})}
//             value={this.state.username}
//             maxLength={50}
//             autoCapitalize={'none'}
//           />
//           <Text style={{marginTop: 20}}>Password</Text>
//           <TextInput
//             style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
//             onChangeText={(password) => this.setState({password})}
//             value={this.state.password}
//             secureTextEntry={true}
//             maxLength={50}
//           />
//           <Button
//             onPress={this.onSubmit}
//             title="Submit"
//             color="#841584"
//             accessibilityLabel="Learn more about this purple button"
//           />
//         </View>
//       );
//     }
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
