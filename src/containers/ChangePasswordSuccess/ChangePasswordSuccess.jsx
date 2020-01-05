import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SimpleLineIcons } from '@expo/vector-icons';

import { scene, vars } from '../../styles';
import FormScene from '../../components/FormScene';
import Button, { BUTTON_STYLES } from '../../components/Button';

function handleDonePress() {
  Actions.popTo('dashboard');
}

const ChangePasswordSuccess = () => (
  <FormScene>
    <View style={{ marginBottom: vars.gutterAndHalf, alignItems: 'center' }}>
      <SimpleLineIcons name="check" size={60} color={vars.success} />
    </View>
    <Text style={[scene.titleCopy, scene.textCenter]}>Success!</Text>
    <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
      Your password has been changed
    </Text>
    <View style={{ marginTop: vars.gutterTriple }}>
      <Button
        buttonStyles={BUTTON_STYLES.INFO_SKELETON}
        title="Done"
        onPress={handleDonePress}
      />
    </View>
  </FormScene>
);

export default ChangePasswordSuccess;
