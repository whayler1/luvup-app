This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

### building standalone app
https://docs.expo.io/versions/latest/distribution/building-standalone-apps

- make sure config is pointing to correct server
- make sure to bump the version in package.json
- bump the version in app.json and update the "buildNumber" if necessary.
- `expo build:ios`
- this will generate a link when it's done. Download the .ipa file it from it.
- sign in to apple id https://appleid.apple.com/#!&page=signin
- click "generate password" under "APP-SPECIFIC PASSWORDS"
  + password label "Luvup"
- copy app specific password
- open application loader on mac
- apple id is your apple id, user password you generated
- upload file generated by expo to application loader
- log in to app store connect https://appstoreconnect.apple.com/
- go to test flight

### run with RNDebugger

- `yarn debug`
- first time you have to run `yarn postinstall`
- you might have to run `yarn devtools`, not totally sure 🤷‍♂️
- enable debug:
  + once app is open `⌘-d`
  + click "start remote debugging"

### running on iphone
- open in expo App
- in console `ifconfig | grep inet`
- use the ip after the line beginning `inet`
- on ios safari `exp://<ip>:19000`
