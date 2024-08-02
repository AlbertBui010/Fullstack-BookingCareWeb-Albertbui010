import React, { Component, useReducer } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
	constructor(props) {
		super(props);

		this.state = {
			genderArr: [],
			positionArr: [],
			roleArr: [],
			previewImgURL: '',
			isOpen: false,

			email: '',
			password: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			address: '',
			gender: '',
			position: '',
			role: '',
			avatar: '',
			arrCheck: {
				email: 'Email',
				password: 'Mật khẩu',
				firstName: 'Tên',
				lastName: 'Họ',
				phoneNumber: 'Số điện thoại',
				address: 'Địa chỉ',
			},

			action: '',
			userEditId: '',
		};
	}
	async componentDidMount() {
		this.props.getGenderStart();
		this.props.getPositionStart();
		this.props.getRoleStart();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {
			let arrGenders = this.props.genderRedux.data;
			this.setState({
				genderArr: arrGenders,
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
			});
		}

		if (prevProps.roleRedux !== this.props.roleRedux) {
			let arrRoles = this.props.roleRedux.data;
			this.setState({
				roleArr: arrRoles,
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
			});
		}

		if (prevProps.positionRedux !== this.props.positionRedux) {
			let arrPositions = this.props.positionRedux.data;
			this.setState({
				positionArr: arrPositions,
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
			});
		}

		if (prevProps.listUsers !== this.props.listUsers) {
			let arrGenders = this.props.genderRedux.data;
			let arrRoles = this.props.roleRedux.data;
			let arrPositions = this.props.positionRedux.data;

			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				phoneNumber: '',
				address: '',
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
				avatar: '',
				action: CRUD_ACTIONS.CREATE,
				previewImgURL: '',
			});
		}
	}

	handleOnChangeImage = async (event) => {
		let files = event.target.files;
		let file = files[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			let objectUrl = URL.createObjectURL(file);
			this.setState({
				previewImgURL: objectUrl,
				avatar: base64,
			});
		}
	};

	openPreviewImage = () => {
		if (!this.state.previewImgURL) return;

		this.setState({
			isOpen: true,
		});
	};

	handleSaveUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;

		let { action } = this.state;

		if (action === CRUD_ACTIONS.CREATE) {
			// fire redux create new user
			this.props.createNewUser({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phonenumber: this.state.phoneNumber,
				gender: this.state.gender,
				roleId: this.state.role,
				positionId: this.state.position,
				avatar: this.state.avatar,
			});
			// this.props.fetchUserRedux();
		}

		if (action === CRUD_ACTIONS.EDIT) {
			// fire redux edit user
			this.props.editAUserRedux({
				id: this.state.userEditId,
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phonenumber: this.state.phoneNumber,
				gender: this.state.gender,
				roleId: this.state.role,
				positionId: this.state.position,
				avatar: this.state.avatar,
			});
		}
	};

	checkValidateInput = () => {
		let isValid = true;
		if (this.props.language === 'en') {
			this.setState({
				arrCheck: {
					email: 'Email',
					password: 'Password',
					firstName: 'First name',
					lastName: 'Last name',
					phoneNumber: 'Phone number',
					address: 'Address',
				},
			});
		} else {
			this.setState({
				arrCheck: {
					email: 'Email',
					password: 'Mật khẩu',
					firstName: 'Tên',
					lastName: 'Họ',
					phoneNumber: 'Số điện thoại',
					address: 'Địa chỉ',
				},
			});
		}

		for (let i = 0; i < Object.keys(this.state.arrCheck).length; i++) {
			let key = Object.keys(this.state.arrCheck)[i];
			// console.log('key: ', key);
			if (!this.state[key]) {
				isValid = false;
				if (this.props.language === 'en') {
					alert('This input is required: ' + this.state.arrCheck[key]);
				} else {
					alert('Cần nhập trường: ' + this.state.arrCheck[key]);
				}
				break;
			}
		}
		return isValid;
	};

	onChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleEditUserFromParent = (user) => {
		let imageBase64 = '';
		if (user.image) {
			imageBase64 = new Buffer(user.image, 'base64').toString('binary');
		}

		this.setState({
			email: user.email,
			password: 'HARDCODE',
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phonenumber,
			address: user.address,
			gender: user.gender,
			role: user.roleId,
			position: user.positionId,
			avatar: '',
			previewImgURL: imageBase64,
			action: CRUD_ACTIONS.EDIT,
			userEditId: user.id,
		});
	};

	render() {
		let genders = this.state.genderArr;
		let roles = this.state.roleArr;
		let positions = this.state.positionArr;
		let language = this.props.language;
		let isGetGenders = this.props.isLoadingGender;

		let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

		return (
			<div className="user-redux-container">
				<div className="title">User Redux</div>
				<div className="user-redux-body">
					<div className="container">
						<div className="row">
							<div className="col-12 mb-3">
								<FormattedMessage id="manage-user.add" />
							</div>
							<div>{isGetGenders === true ? 'Loading genders' : ''}</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.email" />
								</label>
								<input
									className="form-control"
									type="email"
									value={email}
									onChange={(event) => {
										this.onChangeInput(event, 'email');
									}}
									disabled={this.state.action === CRUD_ACTIONS.EDIT}
								/>
							</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.password" />
								</label>
								<input
									className="form-control"
									type="password"
									value={password}
									onChange={(event) => {
										this.onChangeInput(event, 'password');
									}}
									disabled={this.state.action === CRUD_ACTIONS.EDIT}
								/>
							</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.firstname" />
								</label>
								<input
									className="form-control"
									type="text"
									value={firstName}
									onChange={(event) => {
										this.onChangeInput(event, 'firstName');
									}}
								/>
							</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.lastname" />
								</label>
								<input
									className="form-control"
									type="text"
									value={lastName}
									onChange={(event) => {
										this.onChangeInput(event, 'lastName');
									}}
								/>
							</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.phonenumber" />
								</label>
								<input
									className="form-control"
									type="text"
									value={phoneNumber}
									onChange={(event) => {
										this.onChangeInput(event, 'phoneNumber');
									}}
								/>
							</div>
							<div className="col-6">
								<label>
									<FormattedMessage id="manage-user.address" />
								</label>
								<input
									className="form-control"
									type="text"
									value={address}
									onChange={(event) => {
										this.onChangeInput(event, 'address');
									}}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.gender" />
								</label>
								<select
									className="form-control form-select"
									onChange={(event) => {
										this.onChangeInput(event, 'gender');
									}}
									value={gender}
								>
									{genders &&
										genders.length > 0 &&
										genders.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.position" />
								</label>
								<select
									className="form-control form-select"
									onChange={(event) => {
										this.onChangeInput(event, 'position');
									}}
									value={position}
								>
									{positions &&
										positions.length > 0 &&
										positions.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.role" />
								</label>
								<select
									className="form-control form-select"
									onChange={(event) => this.onChangeInput(event, 'role')}
									value={role}
								>
									{roles &&
										roles.length > 0 &&
										roles.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.image" />
								</label>
								<div className="preview-img-container">
									<input
										id="previewImg"
										type="file"
										hidden
										onChange={(event) => this.handleOnChangeImage(event)}
									/>
									<label className="label-upload" htmlFor="previewImg">
										Tai anh <i className="fa-solid fa-upload"></i>
									</label>
									<div
										className="preview-image"
										style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
										onClick={() => this.openPreviewImage()}
									></div>
								</div>
							</div>
							<div className="col-12 my-4 btn-container">
								<button
									className={
										this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'
									}
									onClick={() => this.handleSaveUser()}
								>
									{this.state.action === CRUD_ACTIONS.EDIT ? (
										<FormattedMessage id="manage-user.edit" />
									) : (
										<FormattedMessage id="manage-user.save" />
									)}
								</button>
							</div>
							<div className="col-12 mb-5">
								<TableManageUser
									handleEditUserFromParentKey={this.handleEditUserFromParent}
									action={this.state.action}
								/>
							</div>
						</div>
					</div>
				</div>
				{this.state.isOpen === true && (
					<Lightbox
						mainSrc={this.state.previewImgURL}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genderRedux: state.admin.genders,
		roleRedux: state.admin.roles,
		positionRedux: state.admin.positions,
		isLoadingGender: state.admin.isLoadingGender,
		listUsers: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getPositionStart: () => dispatch(actions.fetchPositionStart()),
		getRoleStart: () => dispatch(actions.fetchRoleStart()),
		createNewUser: (data) => dispatch(actions.createNewUser(data)),
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
		editAUserRedux: (data) => dispatch(actions.editAUser(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
