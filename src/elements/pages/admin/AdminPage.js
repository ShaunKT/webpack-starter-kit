import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../../../actions/index';

// Auth
import requireAuth from '../../../authorization/RequireAuth';

class AdminsPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h2>Logged in list of Admins:</h2>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsPage))
};
