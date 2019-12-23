import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Group } from 'ReactNativeART';
import { TouchableOpacity, Text, View } from 'react-native';

import Circle from '../../components/Circle';
import { vars, quiz as styles } from '../../styles';

const CreateQuizAddChoiceButton = ({ onPress, isDisabled = false }) => (
  <View style={styles.addChoiceButtonWrapper}>
    <TouchableOpacity style={styles.addChoiceButton} onPress={onPress}>
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <Surface width={46} height={46}>
          <Group x={2} y={2}>
            <Circle
              radius={21}
              strokeWidth={3}
              stroke={isDisabled ? vars.blueGrey100 : vars.cyan300}
            />
          </Group>
        </Surface>
      </View>
      <Text
        style={
          isDisabled ? styles.addChoiceGlyphDisabled : styles.addChoiceGlyph
        }
      >
        +
      </Text>
    </TouchableOpacity>
  </View>
);

CreateQuizAddChoiceButton.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default CreateQuizAddChoiceButton;
