import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
		};
	}

	async componentDidMount() {
		let res = await getAllUsers('ALL');
		console.log(res);
		if (res && res.data.errCode === 0) {
			this.setState({
				arrUsers: res.data.users,
			});
		}
	}
	// Life cycle
	// 1. Run constructor -> init state
	// 2. Did mount (set state)
	// 3. Render
	//
	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="users-container">
				<div className="title text-center">Manage users with Albert Bui</div>
				<div className="users-table">
					<table id="customers">
						<tr>
							<th>Email</th>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Address</th>
							<th>Action</th>
						</tr>
						{arrUsers &&
							arrUsers.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.email}</td>
										<td>{item.firstName}</td>
										<td>{item.lastName}</td>
										<td>{item.address}</td>
										<td>
											<button className="btn-edit">
												<i className="fas fa-pencil-alt"></i>
											</button>
											<button className="btn-delete">
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
