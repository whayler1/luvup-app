import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Template from './ChangePasswordModalContent.template';

class ChangePasswordModalContent extends Component {
  static propTypes = {};
  
  render() {
    return <Template/>;
  }
};

export default connect(
  undefined,
  {

  }
)(ChangePasswordModalContent);
