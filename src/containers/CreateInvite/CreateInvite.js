import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { scene } from '../../styles';
import { emailRegex } from '../../helpers';
import { createRelationshipWithInvite as createRelationshipWithInviteAction } from '../../redux/relationship/relationship.actions';
import { getMe as getMeAction } from '../../redux/user/user.actions';
import { getCoinCount as getCoinCountAction } from '../../redux/coin/coin.actions';
import CreateInviteForm from './CreateInviteForm';
import FormScene from '../../components/FormScene';
import Button, { BUTTON_STYLES } from '../../components/Button';

const handleFindLoverPress = () => {
  Actions.createloverrequest();
};

class CreateInvite extends PureComponent {
  static propTypes = {
    isCreateRelationshipWithInviteInFlight: PropTypes.bool.isRequired,
    createRelationshipWithInviteError: PropTypes.string.isRequired,
    createRelationshipWithInvite: PropTypes.func.isRequired,
    recipientEmail: PropTypes.string,
    recipientFirstName: PropTypes.string,
    recipientLastName: PropTypes.string,
    isGetMeInFlight: PropTypes.bool.isRequired,
    getMeErrorMessage: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired,
    getCoinCount: PropTypes.func.isRequired,
    isGetCoinCountInFlight: PropTypes.bool.isRequired,
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

  handleSubmit = async () => {
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
        isGetMeInFlight,
        getMeErrorMessage,
        isGetCoinCountInFlight,
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
      <FormScene>
        <Text style={[scene.titleCopy, scene.textCenter]}>Invite Lover</Text>
        <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
          Is your lover not on Luvup already? Send your lover an invite.
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
            isInFlight:
              isCreateRelationshipWithInviteInFlight ||
              isGetMeInFlight ||
              isGetCoinCountInFlight,
            onSubmit: handleSubmit,
            ioError: createRelationshipWithInviteError || getMeErrorMessage,
          }}
        />
        <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterDoubleTop]}>
          …or, if your lover is on Luvup
        </Text>
        <View style={scene.gutterTop}>
          <Button
            buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
            title="Search for Your lover"
            onPress={handleFindLoverPress}
          />
        </View>
      </FormScene>
    );
  }
}

export default connect(
  state => ({
    createRelationshipWithInviteError:
      state.relationship.createRelationshipWithInviteError,
    isCreateRelationshipWithInviteInFlight:
      state.relationship.isCreateRelationshipWithInviteInFlight,
    isGetMeInFlight: state.user.isGetMeInFlight,
    getMeErrorMessage: state.user.getMeErrorMessage,
    isGetCoinCountInFlight: state.coin.isGetCoinCountInFlight,
  }),
  {
    createRelationshipWithInvite: createRelationshipWithInviteAction,
    getMe: getMeAction,
    getCoinCount: getCoinCountAction,
  }
)(CreateInvite);
