import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import isString from 'lodash/isString';

import Button from '../../components/Button';
import Well from '../../components/Well';
import FormScene from '../../components/FormScene';
import Form from '../../components/Form';
import { scene } from '../../styles';
import { emailRegex } from '../../helpers';
import { resendLoverRequestEmail as resendLoverRequestEmailAction } from '../../redux/loverRequest/loverRequest.actions';

const emailValidators = [
  value => (emailRegex.test(value) ? '' : 'Please provide a valid email'),
];

class ResendInvite extends PureComponent {
  static propTypes = {
    loverEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverRequestId: PropTypes.string.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    isResendRequestEmailInFlight: PropTypes.bool.isRequired,
    resendLoverRequestEmailError: PropTypes.string.isRequired,
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
      prevProps.isResendRequestEmailInFlight &&
      !this.props.isResendRequestEmailInFlight &&
      this.props.resendLoverRequestEmailError.length < 1
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState({ isSuccess: true });
    }
  }

  handleSubmit = ({ email }) => {
    const {
      props: { resendLoverRequestEmail, loverRequestId },
    } = this;
    this.setState({ email });
    resendLoverRequestEmail(loverRequestId, email);
  };

  handleDone = () => {
    Actions.pop();
  };

  render() {
    const {
      props: {
        loverFirstName,
        isResendRequestEmailInFlight,
        resendLoverRequestEmailError,
      },
      state: { email, isSuccess },
      handleSubmit,
      handleDone,
    } = this;
    return (
      <FormScene>
        {isSuccess ? (
          <Fragment>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Invite Re-Sent
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Your invite was resent to {loverFirstName} at {email}.
            </Text>
            <View style={scene.gutterAndHalfTop}>
              <Button title="Done" onPress={handleDone} />
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Resend Invite
            </Text>
            <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
              Send {loverFirstName} another invite
            </Text>
            <Form
              onSubmit={handleSubmit}
              isInFlight={isResendRequestEmailInFlight}
              defaultState={{ email: this.props.loverEmail }}>
              {({ renderInput, renderSubmit }) => (
                <Fragment>
                  {renderInput({
                    label: 'Email',
                    key: 'email',
                    placeholder: 'my@lover.com',
                    validators: emailValidators,
                    inputProps: {
                      autoCapitalize: 'none',
                      spellCheck: false,
                      keyboardType: 'email-address',
                      testID: 'resend-lover-request-email-input',
                    },
                  })}
                  {isString(resendLoverRequestEmailError) &&
                    resendLoverRequestEmailError.length > 0 && (
                      <Well
                        text={resendLoverRequestEmailError}
                        styles={scene.gutterAndHalfTop}
                      />
                    )}
                  <View style={scene.gutterAndHalfTop}>
                    {renderSubmit({
                      title: 'Resend',
                    })}
                  </View>
                </Fragment>
              )}
            </Form>
          </Fragment>
        )}
      </FormScene>
    );
  }
}

export default connect(
  state => ({
    loverEmail: state.lover.email,
    loverFirstName: state.lover.firstName,
    loverRequestId: state.loverRequest.id,
    isResendRequestEmailInFlight:
      state.loverRequest.isResendRequestEmailInFlight,
    resendLoverRequestEmailError:
      state.loverRequest.resendLoverRequestEmailError,
  }),
  {
    resendLoverRequestEmail: resendLoverRequestEmailAction,
  }
)(ResendInvite);
