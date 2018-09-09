import Color from 'color';
import { vars } from '../styles';

export const getAnimatedRelationshipScoreFill = animatedScore =>
  animatedScore.interpolate({
    inputRange: [0, 33, 66, 100],
    outputRange: [vars.blue500, vars.purple500, vars.red500, vars.pink500],
  });

const getRelationshipScoreFill = score => {
  let lowerColor;
  let higherColor;
  let threshold;
  if (score < 33) {
    lowerColor = vars.blue500;
    higherColor = vars.purple500;
    threshold = 0;
  } else if (score < 66) {
    lowerColor = vars.purple500;
    higherColor = vars.red500;
    threshold = 33;
  } else {
    lowerColor = vars.red500;
    higherColor = vars.pink500;
    threshold = 66;
  }

  const pct = (score - threshold) / 33;
  return Color(lowerColor).mix(Color(higherColor), pct);
};

export default getRelationshipScoreFill;
