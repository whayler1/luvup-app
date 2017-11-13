import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = () => {
    const { username, password } = this.state;
    console.log('-- on submit click', username, '\npassowrd', password);
    fetch('https://luvup.io/login', {
      method: 'POST'
    }).then(res => console.log('got a res!', res))
    .catch(err => console.log('caught the err', err));
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
