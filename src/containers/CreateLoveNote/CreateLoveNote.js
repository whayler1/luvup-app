import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Template from './CreateLoveNote.template';

class CreateLoveNote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      numLuvups: 0,
      numJalapenos: 0,
    };
  }

  render() {
    return (
      <Template {...this.state} />
    );
  }
}

export default connect()(CreateLoveNote);
