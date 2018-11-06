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
      choices: [''],
      senderChoiceIndex: null,
    };
  }

  handleQuestionChange = question => {
    this.setState({ question });
  };

  handleRewardPress = reward => {
    this.setState({ reward });
  };

  handleChoiceChange = (text, index) => {
    const choices = [
      ...this.state.choices.slice(0, index),
      text,
      ...this.state.choices.slice(index + 1, this.state.choices.length - 1),
    ];
    this.setState({ choices });
  };

  handleAddChoice = () => {
    this.setState({
      choices: [...this.state.choices, ''],
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
            onChoiceChange={this.handleChoiceChange}
            onAddChoice={this.handleAddChoice}
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
