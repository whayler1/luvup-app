import React from 'react';
import superagent from 'superagent';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isIdTokenLoaded: false,
      isUserAuthed: false
    };
  }

  onSubmit = async () => {
    const headers = new Headers();
    headers.set('Accepts', 'application/json');
    headers.set('Content-Type', 'application/json');
    const { username, password } = this.state;

    let id_token;

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

      // headers.set('Authorization': body.id_token);

      id_token = body.id_token;
    }).catch(err => console.log('caught the err', err));

    await AsyncStorage.setItem('id_token', id_token);

    await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: '{ me { id email } }'
      })
    }).then(res => {
      console.log('another res!!!', res);
    }).catch(err => console.log('inner err', err));

    const val = await AsyncStorage.getItem('id_token');
    console.log('val:', val);
  }

  getIdToken = async () => {
    const id_token = await AsyncStorage.getItem('id_token');
    return id_token;
  }

  reauth = async (id_token) => {
    try {
      const res = await superagent.post('http://localhost:3000/reauth')
        .send({ id_token });
        
      const { body } = res;
      this.setState({
        isIdTokenLoaded: true,
        isUserAuthed: true,
        username: body.user.username,
      });
      console.log('\n\n --- body', body);
    } catch (err) {
      console.log('err', err);
    }


    // await fetch('http://localhost:3000/reauth', {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify({
    //     id_token
    //   })
    // }).then(async res => {
    //   const body = await res.json();
    //   console.log('body', body);
    //   // console.log('----- res:', res);
    //   // AsyncStorage.setItem('id_token', res.id_token);
    //   this.setState({
    //     isIdTokenLoaded: true,
    //     isUserAuthed: true,
    //     username: body.user.username,
    //   });
    // }).catch(err => console.log('err', err));
  }

  componentWillMount = async () => {
    const id_token = await this.getIdToken();
    if (id_token) {
      this.reauth(id_token);
    } else {
      this.setState({ isIdTokenLoaded: true });
    }
  }

  render() {
    if (!this.state.isIdTokenLoaded) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 30}}>Loading ID Token</Text>
        </View>
      )
    }
    if (this.state.isIdTokenLoaded && this.state.isUserAuthed) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 30}}>Logged in: { this.state.username }</Text>
        </View>
      );
    }
    if (this.state.isIdTokenLoaded && !this.state.isUserAuthed) {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
