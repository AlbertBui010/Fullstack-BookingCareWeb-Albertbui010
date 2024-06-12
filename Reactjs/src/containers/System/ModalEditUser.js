import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
		};
	}

	listenToEmitter() {
		emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
			});
		});
	}
	componentDidMount() {
		let user = this.props.currentUser;
		if (user && !_.isEmpty(user)) {
			this.setState({
				id: user.id,
				email: user.email,
				password: 'hardcode',
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address,
			});
		}
	}

	toggle = () => {
		this.props.toggleFromParent();
	};

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	checkValidateInput = () => {
		let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				alert('Missing parameter: ' + arrInput[i]);
				return false;
			}
		}
		return true;
	};

	handleSaveUser = () => {
		let isvalid = this.checkValidateInput();
		if (isvalid) {
			this.props.editUser(this.state);
		}
	};

	render() {
		// console.log('Check props from parent', this.props);
		return (
			<Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className="modal-user-container" size="lg">
				<ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
				<ModalBody>
					<div className="container">
						<div className="row">
							<div className="col-6 form-group mt-3">
								<label>Email</label>
								<input
									type="text"
									onChange={(e) => {
										this.handleOnChangeInput(e, 'email');
									}}
									className="form-control"
									placeholder="Enter your email"
									value={this.state.email}
									disabled
								/>
							</div>
							<div className="col-6 form-group mt-3">
								<label>Password</label>
								<input
									type="password"
									onChange={(e) => {
										this.handleOnChangeInput(e, 'password');
									}}
									className="form-control"
									placeholder="Enter your password"
									value={this.state.password}
									disabled
								/>
							</div>
							<div className="col-6 form-group mt-3">
								<label>Firstname</label>
								<input
									type="text"
									onChange={(e) => {
										this.handleOnChangeInput(e, 'firstName');
									}}
									className="form-control"
									placeholder="Enter your firstName"
									value={this.state.firstName}
								/>
							</div>
							<div className="col-6 form-group mt-3">
								<label>Lastname</label>
								<input
									type="text"
									onChange={(e) => {
										this.handleOnChangeInput(e, 'lastName');
									}}
									className="form-control"
									placeholder="Enter your lastname"
									value={this.state.lastName}
								/>
							</div>
							<div className="col-6 form-group mt-3">
								<label>Address</label>
								<input
									type="text"
									onChange={(e) => {
										this.handleOnChangeInput(e, 'address');
									}}
									className="form-control"
									placeholder="Enter your address"
									value={this.state.address}
								/>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" className="btn-save" onClick={() => this.handleSaveUser()}>
						Save changes
					</Button>{' '}
					<Button color="secondary" className="btn-cancel" onClick={() => this.toggle()}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
