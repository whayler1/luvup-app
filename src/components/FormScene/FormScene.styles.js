import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  scrollView: { alignSelf: 'stretch', paddingHorizontal: vars.gutter },
  scrollViewContentContainer: { paddingBottom: vars.gutterDouble * 2 },
});
