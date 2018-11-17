import React, { PureComponent } from 'react';
import { Text, KeyboardAvoidingView, ScrollView } from 'react-native';

import { forms /*, vars*/ } from '../../styles';
import styles from './CreateQuizChoices.styles';
import { QuizItemType } from '../../types';
import CreateQuizNavBar from '../CreateQuizNavBar';

const choicesDefault = ['', '', ''];

class CreateQuizChoices extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
  };

  constructor(props) {
    super(props);

    this.state = {
      choices: props.quizItem.choices || choicesDefault,
      choicesErrors: choicesDefault,
    };
  }

  handleNextPress = async () => {
    const { choices } = this.state;
    let isValid = true;

    const choicesErrors = choices.map(choice => {
      if (choice.length < 1) {
        isValid = false;
        return 'no-choice';
      }
      return '';
    });

    await this.setState({ choicesErrors });

    if (isValid) {
      // go to next thing
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={styles.container}
        contentContainerStyle={styles.container}>
        <CreateQuizNavBar onNextPress={this.handleNextPress} />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          <Text style={forms.label}>Choices</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizChoices;
