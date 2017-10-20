import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  static propTypes = {
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  };

  handleLinkClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleIncrementClick(incrementCount, event) {
    this.handleLinkClick(event);
    incrementCount();
  }

  handleDecrementClick(decrementCount, event) {
    this.handleLinkClick(event);
    decrementCount();
  }

  render() {
    const { count, incrementCount, decrementCount } = this.props;

    return (
      <div>
        <div>{count}</div>
        <a onClick={this.handleIncrementClick.bind(this, incrementCount)}>+</a>
        <a onClick={this.handleDecrementClick.bind(this, decrementCount)}>-</a>
      </div>
    );
  }
}

export default Counter;
