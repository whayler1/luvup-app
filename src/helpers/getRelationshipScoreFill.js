import Color from 'color';
import { vars } from '../styles';

const colors = ['#72e7f9', '#75eaff', '#da60ff', '#f94dda'];

export const getAnimatedRelationshipScoreFill = animatedScore =>
  animatedScore.interpolate({
    inputRange: [0, 33, 66, 100],
    outputRange: colors,
  });

const getRelationshipScoreFill = score => {
  let lowerColor;
  let higherColor;
  let threshold;
  if (score < 33) {
    lowerColor = colors[0];
    higherColor = colors[1];
    threshold = 0;
  } else if (score < 66) {
    lowerColor = colors[1];
    higherColor = colors[2];
    threshold = 33;
  } else {
    lowerColor = colors[2];
    higherColor = colors[3];
    threshold = 66;
  }

  const pct = (score - threshold) / 33;
  return Color(lowerColor).mix(Color(higherColor), pct);
};

export default getRelationshipScoreFill;
