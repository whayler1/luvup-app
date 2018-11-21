import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, KeyboardAvoidingView, ScrollView } from 'react-native';

import { forms, quiz /*, vars*/ } from '../../styles';
import { QuizItemType } from '../../types';
import CreateQuizNavBar from '../CreateQuizNavBar';
import CreateQuizChoice from './CreateQuizChoice';
import CreateQuizLengthUI from './CreateQuizLengthUI';

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
      senderChoiceIndex: 0,
      isMaxChoicesLengthError: false,
    };
  }

  maxChoicesLength = 6;

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
      Actions.createQuizReward({
        quizItem: {
          ...this.props.quizItem,
          choices: this.state.choices,
          senderChoiceIndex: this.state.senderChoiceIndex,
        },
      });
    }
  };

  handleSelectChoice = senderChoiceIndex => {
    this.setState({ senderChoiceIndex, isMaxChoicesLengthError: false });
  };

  handleChoiceChange = (text, index) => {
    this.setState(state => {
      const choices = [
        ...state.choices.slice(0, index),
        text,
        ...state.choices.slice(index + 1, state.choices.length),
      ];

      const choicesErrors = [
        ...state.choicesErrors.slice(0, index),
        '',
        ...state.choicesErrors.slice(index + 1, state.choicesErrors.length),
      ];

      return { choices, choicesErrors, isMaxChoicesLengthError: false };
    });
  };

  handleAddChoice = () => {
    this.setState(state => {
      const newState = {};
      if (state.choices.length < this.maxChoicesLength) {
        newState.choices = [...state.choices, ''];
      } else {
        newState.isMaxChoicesLengthError = true;
      }
      return newState;
    });
  };

  handleRemoveChoice = () => {
    this.setState(state => {
      const choices = state.choices.splice(0, state.choices.length - 1);
      const newState = { choices, isMaxChoicesLengthError: false };
      const lastIndex = choices.length - 1;
      if (state.senderChoiceIndex > lastIndex) {
        newState.senderChoiceIndex = lastIndex;
      }
      return newState;
    });
  };

  render() {
    const { choices, isMaxChoicesLengthError } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={quiz.container}
        contentContainerStyle={quiz.container}>
        <CreateQuizNavBar onNextPress={this.handleNextPress} />
        <ScrollView
          style={quiz.scrollContainer}
          contentContainerStyle={quiz.scrollContent}>
          <Text>{this.props.quizItem.question}</Text>
          <Text style={forms.label}>Choices</Text>
          {choices.map((choice, index) => (
            <CreateQuizChoice
              key={index}
              index={index}
              value={choice}
              onChange={this.handleChoiceChange}
              onSelect={this.handleSelectChoice}
              isChecked={index === this.state.senderChoiceIndex}
              error={this.state.choicesErrors[index]}
              enabled
            />
          ))}
          <CreateQuizLengthUI
            {...{
              choices,
              onAddChoice: this.handleAddChoice,
              onRemoveChoice: this.handleRemoveChoice,
              isMaxChoicesLengthError,
              maxChoicesLength: this.maxChoicesLength,
              onSubmit: this.handleNextPress,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateQuizChoices;
