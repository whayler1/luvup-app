import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
// import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
} from 'react-native';

import { forms, vars, quiz as quizStyles } from '../../styles';
import CreateQuizNavBar from '../CreateQuizNavBar';
import { QuizItemType } from '../../types';

const placeholders = [
  'Ask something flirty…',
  'Time to turn up the heat!',
  'What would you want to be asked?…',
];

const getRandomQuestion = () =>
  placeholders[Math.floor(Math.random() * placeholders.length)];

class CreateQuizQuestion extends PureComponent {
  static propTypes = {
    quizItem: QuizItemType,
  };

  static defaultProps = {
    quizItem: {
      question: '',
    },
  };

  constructor(props) {
    super(props);

    this.placeholder = getRandomQuestion();
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
              style={[
                forms.multilineInput,
                // focusInput === 'currentPassword' && forms.inputFocus,
              ]}
              onChangeText={this.handleQuestionChange}
              value={this.state.question}
              maxLength={1000}
              placeholder={this.placeholder}
              placeholderTextColor={vars.blueGrey100}
              multiline
              returnKeyType="next"
              onSubmitEditing={this.handleNextPress}
            />
            {this.state.questionError && (
              <Text style={forms.error}>Create a question</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizQuestion;
