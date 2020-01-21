import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { getInititals } from '../../redux/user/user.selector';
import { vars } from '../../styles';
import getValuesForWidths from '../../helpers/getValuesForWidths';

const PORTRAIT_SIZE = getValuesForWidths({ xs: 60, s: 80 });

const getImageFromLibrary = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);
};

const handlePortraitPress = async () => {
  console.log('PRESS**<><--->');
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  console.log('\n\n permmmmm', status);
  if (status !== 'granted') {
    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log('newPermission', newPermission);
    if (newPermission.status === 'granted') {
      getImageFromLibrary();
    }
  } else {
    getImageFromLibrary();
  }
};

const MenuPortrait = () => {
  const { initials } = useSelector(
    (state) => ({
      initials: getInititals(state),
    }),
    shallowEqual,
  );
  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: vars.gutterDouble,
      }}
    >
      <TouchableWithoutFeedback
        onPress={handlePortraitPress}
        style={{ alignItems: 'center' }}
      >
        <LinearGradient
          colors={[vars.razzleDazzleRose, vars.cottonCandy]}
          style={{
            width: PORTRAIT_SIZE,
            height: PORTRAIT_SIZE,
            borderRadius: PORTRAIT_SIZE / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: getValuesForWidths({
                xs: 30,
                s: 40,
              }),
              color: 'white',
              fontFamily: vars.fontRegular,
            }}
          >
            {initials}
          </Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
      <Text
        style={{
          marginTop: vars.gutterHalf,
          fontSize: vars.fontXS,
          fontFamily: vars.fontBlack,
          color: vars.blueGrey300,
        }}
      >
        Tap to upload photo
      </Text>
    </View>
  );
};

export default MenuPortrait;
