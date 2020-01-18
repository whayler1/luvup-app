import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './Dashboard.styles';
import getValuesForWidths from '../../helpers/getValuesForWidths';
import LoveNoteArt from '../../components/LoveNoteArt';
import QuizArt from '../../components/Art/QuizArt';

const handleLoveNoteWritePress = () => {
  Actions.createLoveNote();
};

const handleCreateQuizPress = () => {
  Actions.createQuizQuestion();
};

const DashboardFooter = () => (
  <View style={styles.tabsContainer}>
    <TouchableOpacity
      testID="dashboard-write-love-note-button"
      style={styles.tabsItem}
      onPress={handleLoveNoteWritePress}
    >
      <LoveNoteArt scale={getValuesForWidths({ xs: 0.78, s: 1 })} />
      <Text style={styles.tabsText}>Write Love Note</Text>
    </TouchableOpacity>
    <TouchableOpacity
      testID="dashboard-create-a-quiz-button"
      style={styles.tabsItem}
      onPress={handleCreateQuizPress}
    >
      <QuizArt scale={getValuesForWidths({ xs: 0.65, s: 0.85 })} />
      <Text style={styles.tabsText}>Create a Quiz</Text>
    </TouchableOpacity>
  </View>
);

export default DashboardFooter;
