import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = async () => {
    const headers = new Headers();
    headers.set('Accepts', 'application/json');
    headers.set('Content-Type', 'application/json');
    const { username, password } = this.state;
    let jwt;

    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      const body = JSON.parse(res._bodyText);
      console.log('-- got a res!', body);

      headers.set('Authorization': body.jwt);

      jwt = body.jwt;
    }).catch(err => console.log('caught the err', err));

    await AsyncStorage.setItem('jwt', jwt);

    await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: '{ me { id email } }'
      })
    }).then(res => {
      console.log('another res!!!', res);
    }).catch(err => console.log('inner err', err));

    const val = await AsyncStorage.getItem('jwt');
    console.log('val:', val);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Login</Text>
        <Text style={{marginTop: 20}}>User Name</Text>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          maxLength={50}
          autoCapitalize={'none'}
        />
        <Text style={{marginTop: 20}}>Password</Text>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
          maxLength={50}
        />
        <Button
          onPress={this.onSubmit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
