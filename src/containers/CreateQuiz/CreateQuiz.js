import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView } from 'react-native';
import _ from 'lodash';

import { forms, vars } from '../../styles';
import styles from './CreateQuiz.styles';
import { createQuizItem as createQuizItemAction } from '../../redux/quizItem/quizItem.actions';
import CreateQuizLuvupButton from './CreateQuizLuvupButton';
import CreateQuizChoices from './CreateQuizChoices';

const placeholders = [
  'Ask something flirty…',
  'Time to turn up the heat!',
  'What would you want to be asked?…',
];

const getRandomQuestion = () =>
  placeholders[Math.floor(Math.random() * placeholders.length)];

class CreateQuiz extends PureComponent {
  static propTypes = {
    isCreateQuizItemInFlight: PropTypes.bool.isRequired,
    createQuizItemErrorMessage: PropTypes.string.isRequired,
    createQuizItem: PropTypes.func.isRequired,
    loverFirstName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.placeholder = getRandomQuestion();
    this.state = {
      question: '',
      reward: 3,
      choices: ['', '', ''],
      senderChoiceIndex: 0,
      isMaxChoicesLengthError: false,
    };
  }

  maxChoicesLength = 6;

  handleQuestionChange = question => {
    this.setState({ question, isMaxChoicesLengthError: false });
  };

  handleRewardPress = reward => {
    this.setState({ reward, isMaxChoicesLengthError: false });
  };

  handleSelectChoice = senderChoiceIndex => {
    this.setState({ senderChoiceIndex, isMaxChoicesLengthError: false });
  };

  handleChoiceChange = (text, index) => {
    const choices = [
      ...this.state.choices.slice(0, index),
      text,
      ...this.state.choices.slice(index + 1, this.state.choices.length - 1),
    ];
    this.setState({ choices, isMaxChoicesLengthError: false });
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

  handleSubmitPress = () => {
    const { question, reward, choices, senderChoiceIndex } = this.state;
    this.props.createQuizItem(question, reward, choices, senderChoiceIndex);
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }}>
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
            editable={!this.props.isCreateQuizItemInFlight}
            placeholder={this.placeholder}
            placeholderTextColor={vars.blueGrey100}
            multiline
          />
          {this.props.createQuizItemErrorMessage && (
            <Text style={forms.error}>
              {this.props.createQuizItemErrorMessage}
            </Text>
          )}
        </View>
        <View style={styles.rewardContainer}>
          <Text style={forms.label}>Reward</Text>
          <Text style={forms.description}>
            How many Luvups does {this.props.loverFirstName} win if they answer
            this right?
          </Text>
          <View style={styles.luvupUiContainer}>
            {_.times(5, i => (
              <CreateQuizLuvupButton
                key={i}
                currentReward={this.state.reward}
                reward={i + 1}
                onPress={this.handleRewardPress}
              />
            ))}
          </View>
        </View>
        <View style={styles.choicesCointainer}>
          <Text style={forms.label}>Choices</Text>
          <CreateQuizChoices
            choices={this.state.choices}
            senderChoiceIndex={this.state.senderChoiceIndex}
            onChoiceChange={this.handleChoiceChange}
            onSelectChoice={this.handleSelectChoice}
            onAddChoice={this.handleAddChoice}
            onRemoveChoice={this.handleRemoveChoice}
            isMaxChoicesLengthError={this.state.isMaxChoicesLengthError}
            maxChoicesLength={this.maxChoicesLength}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    loverFirstName: state.lover.firstName,
    isCreateQuizItemInFlight: state.quizItem.isCreateQuizItemInFlight,
    createQuizItemErrorMessage: state.quizItem.createQuizItemErrorMessage,
  }),
  {
    createQuizItem: createQuizItemAction,
  }
)(CreateQuiz);
