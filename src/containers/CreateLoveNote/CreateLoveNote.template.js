import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import styles from './CreateLoveNote.styles.js';
import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  note,
  onNoteChange,
  placeholder,
  focusInput = '',
  isInFlight = false,
}) => (
  <View style={{flex: 1}}>
    <KeyboardAvoidingView
      style={{
        paddingHorizontal: 16,
      }}
      behavior="height"
    >
      <View style={{
          paddingTop: 8,
        }}>
        <View style={[forms.formGroup, { marginTop: 8 }]}>
          <TextInput
            style={[forms.multilineInput, focusInput === 'currentPassword' && forms.inputFocus]}
            onChangeText={onNoteChange}
            value={note}
            maxLength={1000}
            editable={!isInFlight}
            placeholder={placeholder}
            placeholderTextColor={vars.blueGrey100}
            multiline={true}
          />
        </View>
      </View>
      <View style={{
        paddingTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <Text style={{
          fontFamily: vars.fontRegular,
          color: vars.blueGrey900,
        }}>
          Attach Luvups
        </Text>
        <Text style={{
          fontFamily: vars.fontRegular,
          color: vars.blueGrey900,
        }}>
          Attach Jalapeños
        </Text>
      </View>
      <View style={{
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginRight: 8,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../images/coin.png')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginLeft: 8,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginRight: 8,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../images/jalapeno.png')}
              style={{
                width: 30.6,
                height: 40,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: vars.fontBlack,
                fontSize: 40,
                color: vars.blueGrey500,
                marginLeft: 8,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 32 }}>
        <Button
          onPress={() => {}}
          containerViewStyle={buttons.container}
          buttonStyle={buttons.infoButton}
          textStyle={buttons.infoText}
          title={'Send'}
        />
      </View>
    </KeyboardAvoidingView>
  </View>
);
