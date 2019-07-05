import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { scene } from '../../styles';
import { emailRegex } from '../../helpers';
import { createRelationshipWithInvite as createRelationshipWithInviteAction } from '../../redux/relationship/relationship.actions';
import CreateInviteForm from './CreateInviteForm';
import SimpleHeader from '../../components/SimpleHeader';

class CreateInvite extends PureComponent {
  static propTypes = {
    isCreateRelationshipWithInviteInFlight: PropTypes.bool.isRequired,
    createRelationshipWithInviteError: PropTypes.string.isRequired,
    createRelationshipWithInvite: PropTypes.func.isRequired,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    recipientEmail: PropTypes.string,
    recipientFirstName: PropTypes.string,
    recipientLastName: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      recipientEmail: props.recipientEmail || '',
      recipientFirstName: props.recipientFirstName || '',
      recipientLastName: props.recipientLastName || '',
      recipientEmailError: '',
      recipientFirstNameError: '',
      recipientLastNameError: '',
    };
  }

  handleEmailChange = recipientEmail => {
    this.setState({ recipientEmail, recipientEmailError: '' });
  };

  handleFirstNameChange = recipientFirstName => {
    this.setState({ recipientFirstName, recipientFirstNameError: '' });
  };
  handleLastNameChange = recipientLastName => {
    this.setState({ recipientLastName, recipientLastNameError: '' });
  };

  validate() {
    let isValid = true;
    const {
      recipientEmail,
      recipientFirstName,
      recipientLastName,
    } = this.state;
    const errorStates = {
      recipientEmailError: '',
      recipientFirstNameError: '',
      recipientLastNameError: '',
    };

    if (!emailRegex.test(recipientEmail)) {
      errorStates.recipientEmailError = 'Please provide a valid email';
      isValid = false;
    }
    if (recipientFirstName.length < 2) {
      errorStates.recipientFirstNameError = 'Please provide a first name';
      isValid = false;
    }
    if (recipientLastName.length < 2) {
      errorStates.recipientLastNameError = 'Please provide a last name';
      isValid = false;
    }
    this.setState(errorStates);
    return isValid;
  }

  handleSubmit = () => {
    if (!this.validate()) {
      return;
    }
    const {
      state: { recipientEmail, recipientFirstName, recipientLastName },
      props: { createRelationshipWithInvite },
    } = this;
    createRelationshipWithInvite(
      recipientEmail,
      recipientFirstName,
      recipientLastName
    );
  };

  render() {
    const {
      props: {
        isCreateRelationshipWithInviteInFlight,
        createRelationshipWithInviteError,
        userFirstName,
        userLastName,
      },
      state: {
        recipientEmail,
        recipientFirstName,
        recipientLastName,
        recipientEmailError,
        recipientFirstNameError,
        recipientLastNameError,
      },
      handleEmailChange,
      handleFirstNameChange,
      handleLastNameChange,
      handleSubmit,
    } = this;
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <KeyboardAvoidingView style={scene.container} behavior="height">
          <SimpleHeader {...{ userFirstName, userLastName }} />
          <View style={scene.contentNoTop}>
            <View style={scene.contentTop}>
              <Text style={[scene.titleCopy, scene.textCenter]}>
                Invite Lover
              </Text>
              <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
                Send your lover an invite to a relationship on Luvup.
              </Text>
              <CreateInviteForm
                {...{
                  recipientEmail,
                  recipientFirstName,
                  recipientLastName,
                  recipientEmailError,
                  recipientFirstNameError,
                  recipientLastNameError,
                  onEmailChange: handleEmailChange,
                  onFirstNameChange: handleFirstNameChange,
                  onLastNameChange: handleLastNameChange,
                  isInFlight: isCreateRelationshipWithInviteInFlight,
                  onSubmit: handleSubmit,
                  ioError: createRelationshipWithInviteError,
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    createRelationshipWithInviteError:
      state.relationship.createRelationshipWithInviteError,
    isCreateRelationshipWithInviteInFlight:
      state.relationship.isCreateRelationshipWithInviteInFlight,
  }),
  {
    createRelationshipWithInvite: createRelationshipWithInviteAction,
  }
)(CreateInvite);
