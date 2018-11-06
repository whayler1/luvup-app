import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView } from 'react-native';

import { forms, vars } from '../../styles';

const placeholders = ['Ask something flirty…', 'Time to turn up the heat!'];

const getRandomQuestion = () =>
  placeholders[Math.floor(Math.random() * placeholders.length)];

class CreateQuiz extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.placeholder = getRandomQuestion();
    this.state = {
      question: '',
      answers: [],
      selectedAnswer: null,
    };
  }

  handleQuestionChange = question => {
    this.setState({ question });
  };

  render() {
    return (
      <ScrollView>
        <Text>Create Quiz</Text>
        <View style={[forms.formGroup, { marginTop: 8 }]}>
          <TextInput
            style={[
              forms.multilineInput,
              // focusInput === 'currentPassword' && forms.inputFocus,
            ]}
            onChangeText={this.handleQuestionChange}
            value={this.state.question}
            maxLength={1000}
            editable
            placeholder={this.placeholder}
            placeholderTextColor={vars.blueGrey100}
            multiline
          />
          {false && <Text style={forms.error}>Some error</Text>}
        </View>
      </ScrollView>
    );
  }
}

export default connect()(CreateQuiz);
