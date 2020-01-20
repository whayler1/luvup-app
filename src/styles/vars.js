import getValuesForWidths from '../helpers/getValuesForWidths';
import Color from 'color';

// colors

const blueGrey50 = '#ECEFF1';
const blueGrey100 = '#CFD8DC';
const blueGrey300 = '#90A4AE';
const blueGrey500 = '#607D8B';
const blueGrey700 = '#455A64';
const blueGrey800 = '#37474F';
const blueGrey900 = '#263238';
const blue500 = '#03A9F4';
const cyan300 = '#4DD0E1';
const cyan500 = '#00BCD4';
const purple500 = '#9C27B0';
const red500 = '#F44336';
const pink500 = '#E91E63';
const green500 = '#4CAF50';
const malibu = '#72e7f9';
const anakiwa = '#75eaff';
const heliotrope = '#da60ff';
const cottonCandy = '#FFB8F2';
const razzleDazzleRose = '#f94dda';

// fonts

const fontBlack = 'quicksandbold';
const fontRegular = 'quicksandregular';
const fontVanity = 'yesteryear';

const fontL = getValuesForWidths({ xs: 26, s: 32 });
const fontM = getValuesForWidths({ xs: 18, s: 24 });
const fontS = getValuesForWidths({ xs: 13, s: 16 });

// spacing

const gutterHalf = 8;
const gutter = gutterHalf * 2;
const gutterAndHalf = gutterHalf * 3;
const gutterDouble = gutter * 2;
const gutterDoubleAndHalf = gutter * 2.5;
const gutterTriple = gutter * 3;

export default {
  // colors
  blueGrey50,
  blueGrey100,
  blueGrey300,
  blueGrey500,
  blueGrey700,
  blueGrey800,
  blueGrey900,
  cyan300,
  cyan500,
  // hero
  blue500,
  purple500,
  red500,
  pink500,
  // jalapeno
  green500,

  malibu,
  anakiwa,
  heliotrope,
  cottonCandy,
  razzleDazzleRose,

  radius: 2,
  topUiMargin: 25,

  // named vars

  // colors
  p: blueGrey500,
  jalapeno: green500,
  happiest: pink500,
  info: blue500,
  danger: red500,
  dangerPress: Color(red500).saturate(0.05),
  dangerDisabled: Color(red500).desaturate(0.05),
  success: green500,
  link: cyan500,
  linkPress: Color(cyan500).saturate(0.05),
  linkDisabled: Color(cyan500).desaturate(0.05),
  placeholder: blueGrey100,
  // fonts
  fontBlack,
  fontRegular,
  fontVanity,
  fontL,
  fontM,
  fontS,
  //buttons
  infoButtonBg: cyan300,
  dangerButtonBg: red500,
  // spacing
  gutterHalf,
  gutter,
  gutterAndHalf,
  gutterDouble,
  gutterDoubleAndHalf,
  gutterTriple,

  blurViewTint: 'light',
  blurViewIntensity: 50,
};
