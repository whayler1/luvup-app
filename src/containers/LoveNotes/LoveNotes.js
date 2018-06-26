import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Template from './LoveNotes.template';

class LoveNotes extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <Template />
    );
  }
};

export default LoveNotes;
