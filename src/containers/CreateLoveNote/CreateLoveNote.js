import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { createLoveNote as createLoveNoteAction } from '../../redux/loveNote/loveNote.actions';
import Template from './CreateLoveNote.template';

class CreateLoveNote extends PureComponent {
  static propTypes = {
    createLoveNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      note: '',
      numLuvups: 0,
      numJalapenos: 0,
    };
  }

  onNoteChange = note => this.setState({ note });
  addLuvup = () => this.setState({ numLuvups: this.state.numLuvups + 1 });
  removeLuvup = () => this.setState({ numLuvups: this.state.numLuvups - 1 });
  addJalapeno = () => this.setState({ numLuvups: this.state.numJalapenos + 1 });
  removeJalapeno = () => this.setState({ numLuvups: this.state.numJalapenos - 1 });

  render() {
    const props = {
      ...this.state,
      ..._.pick(this, [
        'onNoteChange',
        'addLuvup',
        'removeLuvup',
        'addJalapeno',
        'removeJalapeno',
      ]),
    }
    return (
      <Template {...props} />
    );
  }
}

export default connect(
  null,
  {
    createLoveNote: createLoveNoteAction,
  },
)(CreateLoveNote);
