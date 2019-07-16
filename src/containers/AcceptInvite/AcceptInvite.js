import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import FormScene from '../../components/FormScene';

class AcceptInvite extends PureComponent {
  static propTypes = {
    userInviteId: PropTypes.string.isRequired,
  };

  constructor(props) {
    // call user invite endpoint
  }

  render() {
    return (
      <FormScene>
        <Text>Accept invite form!</Text>
      </FormScene>
    );
  }
}

export default AcceptInvite;
