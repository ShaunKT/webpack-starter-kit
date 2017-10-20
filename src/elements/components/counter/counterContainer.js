// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Counter from './counter';

// Actions
import { incrementCount, decrementCount } from '../../../actions/counter';

class CounterContainer extends Component {
  static propTypes = {
    // State
    count: PropTypes.number.isRequired,

    // Dispatchers
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired
  };

  render() {
    return <Counter {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  const count = state.counter.get('count');
  return {
    count
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    incrementCount: () => {
      dispatch(incrementCount());
    },
    decrementCount: () => {
      dispatch(decrementCount());
    }
  };
}

const CounterContainerList = connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

export default CounterContainerList;
