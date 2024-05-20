import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
		};
	}

	componentDidMount() {}

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
	handleAddNewUser = () => {
		let isvalid = this.checkValidateInput();
		if (isvalid) {
			this.props.createNewUser(this.state);
			// Call API create user
			// axis.post('/api/users', this.state).then((res) => {
			// 	if (res.data && res.data.errCode === 0) {
			// 		this.props.toggleFromParent();
			// 		this.setState({
			// 			email: '',
			// 			password: '',
			// 			firstname: '',
			// 			lastname: '',
			// 			address: '',
			// 		});
			// 	}
			// });
		}
		console.log('this.state: ', this.state);
	};

	render() {
		return (
			<Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} className="modal-user-container" size="lg">
				<ModalHeader toggle={() => this.toggle()}>Information user</ModalHeader>
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
					<Button color="primary" className="btn-save" onClick={() => this.handleAddNewUser()}>
						Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
