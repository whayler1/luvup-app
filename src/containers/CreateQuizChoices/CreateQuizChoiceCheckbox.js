import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import _ from 'lodash';

import { vars } from '../../styles';

const Wrapper = ({ testID, onPress, children }) =>
  _.isFunction(onPress) ? (
    <TouchableOpacity testID={testID} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View testID={testID}>{children}</View>
  );

const CreateQuizChoiceCheckbox = ({
  testID,
  isChecked = true,
  isWrong = false,
  scale = 1,
  boxFill = vars.blueGrey100,
  checkFill = vars.cyan300,
  boxFillChecked = vars.cyan300,
  onPress,
}) => (
  <Wrapper testID={testID} onPress={onPress}>
    <Svg width={68 * scale} height={68 * scale}>
      <Path
        fill={isChecked ? boxFillChecked : isWrong ? vars.red500 : boxFill}
        scale={scale}
        d="M58.3,67.8 L9.7,67.8 C4.4,67.8 0.1,63.5 0.1,58.2 L0.1,9.7 C0.1,4.4 4.4,0.1 9.7,0.1 L58.2,0.1 C63.5,0.1 67.8,4.4 67.8,9.7 L67.8,58.2 C67.8,63.5 63.5,67.8 58.3,67.8 Z M9.7,8.6 C9.1,8.6 8.6,9.1 8.6,9.7 L8.6,58.2 C8.6,58.8 9.1,59.3 9.7,59.3 L58.2,59.3 C58.8,59.3 59.3,58.8 59.3,58.2 L59.3,9.7 C59.3,9.1 58.8,8.6 58.2,8.6 L9.7,8.6 Z"
      />
      {isChecked && (
        <Path
          fill={checkFill}
          scale={scale}
          d="M30.3,49.3 C29.3,49.3 28.3,48.9 27.5,48.3 L16.4,38.8 C14.6,37.3 14.4,34.6 15.9,32.8 C17.4,31 20.1,30.8 21.9,32.3 L29.7,39 L45.5,20.1 C47,18.3 49.7,18.1 51.5,19.6 C53.3,21.1 53.5,23.8 52,25.6 L33.5,47.8 C32.8,48.7 31.7,49.2 30.6,49.3 C30.5,49.3 30.4,49.3 30.3,49.3 Z"
        />
      )}
    </Svg>
  </Wrapper>
);

CreateQuizChoiceCheckbox.propTypes = {
  testID: PropTypes.string,
  isChecked: PropTypes.bool,
  isWrong: PropTypes.bool,
  scale: PropTypes.number,
  boxFill: PropTypes.string,
  checkFill: PropTypes.string,
  boxFillChecked: PropTypes.string,
  onPress: PropTypes.func,
};

export default CreateQuizChoiceCheckbox;
