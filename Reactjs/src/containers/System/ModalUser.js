import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalUser extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	toggle = () => {
		this.props.toggleFromParent();
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
								<input type="text" className="form-control" placeholder="Enter your email" />
							</div>
							<div className="col-6 form-group mt-3">
								<label>Password</label>
								<input type="password" className="form-control" placeholder="Enter your password" />
							</div>
							<div className="col-6 form-group mt-3">
								<label>Firstname</label>
								<input type="text" className="form-control" placeholder="Enter your firstname" />
							</div>
							<div className="col-6 form-group mt-3">
								<label>Lastname</label>
								<input type="text" className="form-control" placeholder="Enter your lastname" />
							</div>
							<div className="col-6 form-group mt-3">
								<label>Address</label>
								<input type="text" className="form-control" placeholder="Enter your address" />
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" className="btn-save" onClick={() => this.toggle()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
