import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Group } from 'ReactNativeART';
import { TouchableOpacity, Text, View } from 'react-native';

import Circle from '../../components/Circle';
import { vars } from '../../styles';
import styles from './CreateQuiz.styles';

const CreateQuizAddChoiceButton = ({ onPress }) => (
  <View style={styles.addChoiceButtonWrapper}>
    <TouchableOpacity style={styles.addChoiceButton} onPress={onPress}>
      <Surface width={32} height={32}>
        <Group x={2} y={2}>
          <Circle radius={14} strokeWidth={3} stroke={vars.cyan300} />
        </Group>
      </Surface>
      <Text style={styles.addChoiceGlyph}>+</Text>
    </TouchableOpacity>
  </View>
);

CreateQuizAddChoiceButton.propTypes = {
  onPress: PropTypes.func,
};

export default CreateQuizAddChoiceButton;