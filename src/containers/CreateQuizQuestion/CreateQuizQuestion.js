import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
} from 'react-native';

import { forms, vars, quiz as quizStyles } from '../../styles';
import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemAttemptType } from '../../types';
import { getRandomQuestion } from './CreateQuizQuestion.helpers';
import Button, { BUTTON_STYLES } from '../../components/Button';

const placeholders = [
  'Ask something flirty…',
  'Time to turn up the heat!',
  'What would you want to be asked?…',
];

const getRandomPlaceholder = () =>
  placeholders[Math.floor(Math.random() * placeholders.length)];

class CreateQuizQuestion extends PureComponent {
  static propTypes = {
    quizItem: QuizItemAttemptType,
  };

  static defaultProps = {
    quizItem: {
      question: '',
    },
  };

  constructor(props) {
    super(props);

    this.placeholder = getRandomPlaceholder();
    this.state = {
      question: props.quizItem.question,
      questionError: '',
    };
  }

  handleQuestionChange = question => {
    this.setState({ question, questionError: '' });
  };

  handleBackPress = () => Actions.pop();

  handleNextPress = () => {
    const { question } = this.state;

    if (question.length < 1) {
      this.setState({ questionError: 'no-question' });
    } else {
      const quizItem = {
        ...this.props.quizItem,
        question: this.state.question,
      };
      Actions.createQuizChoices({ quizItem });
    }
  };

  handleRandomQuestionPress = () => {
    this.setState({ question: getRandomQuestion() });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quizStyles.container}
        contentContainerStyle={quizStyles.container}>
        <CreateQuizNavBar onNextPress={this.handleNextPress} />
        <ScrollView
          style={quizStyles.scrollContainer}
          contentContainerStyle={quizStyles.scrollContent}>
          <Text style={forms.label}>Question</Text>
          <View style={[forms.formGroup, { marginTop: 8 }]}>
            <TextInput
              testID="create-quiz-question-input"
              style={forms.multilineInput}
              onChangeText={this.handleQuestionChange}
              value={this.state.question}
              maxLength={600}
              placeholder={this.placeholder}
              placeholderTextColor={vars.blueGrey100}
              multiline
              returnKeyType="next"
              onSubmitEditing={this.handleNextPress}
            />
            {this.state.questionError.length > 0 && (
              <Text style={forms.error}>Create a question</Text>
            )}
          </View>
          <View style={quizStyles.questionButtons}>
            <View style={quizStyles.questionButtonContainer}>
              <Button
                onPress={this.handleRandomQuestionPress}
                buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                title="Random"
              />
            </View>
            <View style={quizStyles.questionButtonContainer}>
              <Button onPress={this.handleNextPress} title="Next" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizQuestion;
