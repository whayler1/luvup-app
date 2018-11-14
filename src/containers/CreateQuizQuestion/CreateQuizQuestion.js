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

import { forms, vars } from '../../styles';
import styles from './CreateQuizQuestion.styles';
import CreateQuizNavBar from '../CreateQuizNavBar';

const placeholders = [
  'Ask something flirty…',
  'Time to turn up the heat!',
  'What would you want to be asked?…',
];

const getRandomQuestion = () =>
  placeholders[Math.floor(Math.random() * placeholders.length)];

class CreateQuizQuestion extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.placeholder = getRandomQuestion();
    this.state = {
      question: '',
      questionError: '',
    };
  }

  handleQuestionChange = question => {
    this.setState({ question, questionError: '' });
  };

  handleBackPress = () => Actions.pop();

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={styles.container}
        contentContainerStyle={styles.container}>
        <CreateQuizNavBar />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
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
