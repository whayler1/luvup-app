import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Template from './Menu.template';

class Menu extends PureComponent {
  static propTypes = {};

  render() {
    return <Template/>;
  }
}

export default connect()(Menu);
