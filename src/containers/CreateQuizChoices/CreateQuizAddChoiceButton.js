import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Group } from 'ReactNativeART';
import { TouchableOpacity, Text, View } from 'react-native';

import Circle from '../../components/Circle';
import { vars, quiz as styles } from '../../styles';

const CreateQuizAddChoiceButton = ({ onPress, isDisabled = false }) => (
  <View style={styles.addChoiceButtonWrapper}>
    <TouchableOpacity style={styles.addChoiceButton} onPress={onPress}>
      <Surface width={46} height={46}>
        <Group x={2} y={2}>
          <Circle
            radius={21}
            strokeWidth={3}
            stroke={isDisabled ? vars.blueGrey100 : vars.cyan300}
          />
        </Group>
      </Surface>
      <Text
        style={
          isDisabled ? styles.addChoiceGlyphDisabled : styles.addChoiceGlyph
        }>
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
