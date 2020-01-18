import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';

import { forms, quiz, vars } from '../../styles';
import { QuizItemAttemptType } from '../../types';
import CreateQuizNavBar from '../CreateQuizNavBar';
import CreateQuizChoice from './CreateQuizChoice';
import CreateQuizLengthUI from './CreateQuizLengthUI';
import CustomHeaderScene from '../../components/CustomHeaderScene';

const choicesDefault = ['', '', ''];

class CreateQuizChoices extends PureComponent {
  static propTypes = {
    quizItem: QuizItemAttemptType,
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

    const choicesErrors = choices.map((choice) => {
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

  handleSelectChoice = (senderChoiceIndex) => {
    this.setState({ senderChoiceIndex, isMaxChoicesLengthError: false });
  };

  handleChoiceChange = (text, index) => {
    this.setState((state) => {
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
    this.setState((state) => {
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
    this.setState((state) => {
      const choices = state.choices.splice(0, state.choices.length - 1);
      const newState = { choices, isMaxChoicesLengthError: false };
      const lastIndex = choices.length - 1;
      if (state.senderChoiceIndex > lastIndex) {
        newState.senderChoiceIndex = lastIndex;
      }
      return newState;
    });
  };

  renderHeader = () => <CreateQuizNavBar onNextPress={this.handleNextPress} />;

  render() {
    const { choices, isMaxChoicesLengthError } = this.state;

    return (
      <CustomHeaderScene renderHeader={this.renderHeader}>
        <View style={{ paddingBottom: vars.gutterDouble }}>
          <Text style={quiz.questionSmallText}>
            {this.props.quizItem.question}
          </Text>
          <Text style={forms.label}>Choices</Text>
          <View style={quiz.createQuizChoiceContainer}>
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
          </View>
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
        </View>
      </CustomHeaderScene>
    );
  }
}

export default CreateQuizChoices;
