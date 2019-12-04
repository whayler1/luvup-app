import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../../components/Button';
import Well from '../../components/Well';
import FormScene from '../../components/FormScene';
import Form, { FORM_VALIDATORS } from '../../components/Form';
import { scene } from '../../styles';
import { isStringWithLength } from '../../helpers';
import { resendUserInvite as resendUserInviteAction } from '../../redux/userInvite/userInvite.actions';

class ResendInvite extends PureComponent {
  static propTypes = {
    loverEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    resendUserInvite: PropTypes.func.isRequired,
    isResendUserInviteInFlight: PropTypes.bool.isRequired,
    resendUserInviteError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isResendUserInviteInFlight &&
      !this.props.isResendUserInviteInFlight &&
      this.props.resendUserInviteError.length < 1
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState({ isSuccess: true });
    }
  }

  handleSubmit = ({ email }) => {
    const {
      props: { resendUserInvite },
    } = this;
    this.setState({ email });
    resendUserInvite(email);
  };

  handleDone = () => {
    Actions.pop();
  };

  render() {
    const {
      props: {
        loverFirstName,
        isResendUserInviteInFlight,
        resendUserInviteError,
      },
      state: { email, isSuccess },
      handleSubmit,
      handleDone,
    } = this;
    return (
      <FormScene>
        {isSuccess ? (
          <>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Invite Resent
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Your invite was resent to {loverFirstName} at {email}.
            </Text>
            <View style={scene.gutterAndHalfTop}>
              <Button title="Done" onPress={handleDone} />
            </View>
          </>
        ) : (
          <>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Resend Invite
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Send {loverFirstName} another invite
            </Text>
            <Form
              onSubmit={handleSubmit}
              isInFlight={isResendUserInviteInFlight}
              defaultState={{ email: this.props.loverEmail }}
            >
              {({ renderInput, renderSubmit }) => (
                <>
                  {renderInput({
                    label: 'Email',
                    key: 'email',
                    placeholder: 'my@lover.com',
                    validators: FORM_VALIDATORS.EMAIL_VALIDATORS,
                    inputProps: {
                      autoCapitalize: 'none',
                      spellCheck: false,
                      keyboardType: 'email-address',
                      testID: 'resend-user-invite-email-input',
                    },
                  })}
                  {isStringWithLength(resendUserInviteError) && (
                    <Well
                      text={resendUserInviteError}
                      styles={scene.gutterAndHalfTop}
                    />
                  )}
                  <View style={scene.gutterAndHalfTop}>
                    {renderSubmit({
                      title: 'Resend',
                    })}
                  </View>
                </>
              )}
            </Form>
          </>
        )}
      </FormScene>
    );
  }
}

export default connect(
  (state) => ({
    loverEmail: state.lover.email,
    loverFirstName: state.lover.firstName,
    isResendUserInviteInFlight: state.userInvite.isResendUserInviteInFlight,
    resendUserInviteError: state.userInvite.resendUserInviteError,
  }),
  {
    resendUserInvite: resendUserInviteAction,
  },
)(ResendInvite);
