// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Helmet
import Helmet from 'react-helmet';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Export this for unit testing more easily
export class Home extends Component {
  render() {
    return (
      <article>
        <Helmet title="Lunar Dashboard" />
        <h2>Dashboard Title</h2>
      </article>
    );
  }
}

export default Home;
