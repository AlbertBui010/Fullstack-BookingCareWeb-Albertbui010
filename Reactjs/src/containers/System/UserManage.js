import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserByIdService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
		};
	}

	async componentDidMount() {
		let res = await this.getAllUsersFromReact();
		console.log(res);
	}

	getAllUsersFromReact = async () => {
		let res = await getAllUsers('ALL');
		console.log(res);
		if (res && res.data.errCode === 0) {
			this.setState({
				arrUsers: res.data.users,
			});
		}
	};

	handleAddNewuser = () => {
		this.setState({
			isOpenModalUser: true,
		});
	};

	toggleModalUser = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser,
		});
	};

	createNewUser = async (data) => {
		try {
			let res = await createNewUserService(data);
			if (res && res.data.errCode !== 0) {
				alert(res.data.errMessage);
			} else {
				await this.getAllUsersFromReact();
				this.setState({
					isOpenModalUser: false,
				});
				emitter.emit('EVENT_CLEAR_MODAL_DATA');
			}
		} catch (e) {
			console.log(e);
		}
	};

	handleDeleteUser = async (item) => {
		try {
			let res = await deleteUserByIdService(item.id);
			console.log(res);
			if (res && res.data.errCode === 0) {
				await this.getAllUsersFromReact();
			} else {
				alert(res.data.errMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="users-container">
				<ModalUser
					isOpen={this.state.isOpenModalUser}
					test={123}
					toggleFromParent={this.toggleModalUser}
					createNewUser={this.createNewUser}
				/>
				<div className="title text-center">Manage users with Albert Bui</div>
				<div className="mx-1">
					<button className="btn btn-primary btn-new-user" onClick={() => this.handleAddNewuser()}>
						<i className="fas fa-plus"></i>
						Add new user
					</button>
				</div>
				<div className="users-table">
					<table id="customers">
						<tbody>
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
													<i
														className="fas fa-trash"
														onClick={() => this.handleDeleteUser(item)}
													></i>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
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
