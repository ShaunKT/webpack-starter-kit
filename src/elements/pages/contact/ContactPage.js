// React
import React, { Component } from 'react';

import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/index';

class ContactPage extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}

	renderUsers() {
		return this.props.users.map(user => <li key={user.id}>{user.name}</li>);
	}

	renderHeadContent() {
		return (
			<Helmet key="Helmet_">
				<title>{`${this.props.users.length} Users loaded`}</title>
				<meta property="og:title" content="Users List" />
			</Helmet>
		);
	}

	render() {
		return (
			<div key="UsersListContent_">
				{this.renderHeadContent()}

				<h2>Here is the list of Users:</h2>
				<ul>{this.renderUsers()}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { users: state.users };
}

function loadData(store) {
	return store.dispatch(fetchUsers());
}

export default {
	loadData,
	component: connect(mapStateToProps, { fetchUsers })(ContactPage)
};
