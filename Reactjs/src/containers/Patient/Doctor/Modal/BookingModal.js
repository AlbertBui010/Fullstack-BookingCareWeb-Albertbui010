import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
			doctorId: '',
			email: '',
			birthday: '',
			timeType: '',
			fullName: '',
			phoneNumber: '',
			address: '',
			reason: '',
			selectedGender: '',
			genders: '',
		};
	}
	async componentDidMount() {
		this.props.getGenders();
	}
	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
			this.setState({
				genders: this.buildDataGender(this.props.genders),
			});
		}
		if (this.props.genders !== prevProps.genders) {
			console.log('Albert check props genders:', this.props.genders);
			this.setState({
				genders: this.buildDataGender(this.props.genders),
			});
		}
		if (this.props.dataTime !== prevProps.dataTime) {
			if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
				let { doctorId, timeType } = this.props.dataTime;
				this.setState({
					doctorId: doctorId,
					timeType: timeType,
				});
			}
		}
	}
	buildDataGender = (data) => {
		let result = [];
		let language = this.props.language;

		if (data && data.length > 0) {
			data.map((item) => {
				let obj = {};
				obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
				obj.value = item.keyMap;
				result.push(obj);
			});
		}
		return result;
	};
	handleCloseModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};
	handleOnChangeInput = (event, id) => {
		let valueInput = event.target.value;
		let stateCopy = { ...this.state };
		stateCopy[id] = valueInput;
		this.setState({
			...stateCopy,
		});
	};
	handleSelectedChange = (selectedOption) => {
		this.setState({ selectedGender: selectedOption });
	};
	handleOnChangeDatePicker = (date) => {
		this.setState({
			birthday: date[0],
		});
	};
	handleConfirmBooking = async () => {
		//validate input
		let date = new Date(this.state.birthday).getTime();
		let timeString = this.buildTimeBooking(this.props.dataTime);
		let { dataTime } = this.props;
		let res = await postPatientBookAppointment({
			doctorId: this.state.doctorId,
			email: this.state.email,
			timeType: this.state.timeType,
			date: date,
			fullName: this.state.fullName,
			phoneNumber: this.state.phoneNumber,
			address: this.state.address,
			reason: this.state.reason,
			selectedGender: this.state.selectedGender.value,
			language: this.props.language,
			timeString: timeString,
			doctorName: this.buildDoctorName(dataTime.doctorData),
		});
		if (res && res.data && res.data.errCode === 0) {
			toast.success('Booking a new appointment success!');
			this.props.closeBookingModal();
		} else {
			toast.error('Booking a new appointment failed!');
		}
		console.log('Albert check confirm button res: ', res);
	};
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	buildTimeBooking = (dataTime) => {
		let { language } = this.props;
		if (dataTime && !_.isEmpty(dataTime)) {
			let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
			let date =
				language === LANGUAGES.VI
					? this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
					: moment
							.unix(+dataTime.date / 1000)
							.locale('en')
							.format('ddd - MM/DD/YYYY');
			return `${time} - ${date}`;
		}
		return ``;
	};
	buildDoctorName = (doctorData) => {
		let { language } = this.props;
		if (doctorData && !_.isEmpty(doctorData)) {
			let name =
				language === LANGUAGES.VI
					? `${doctorData.lastName} ${doctorData.firstName}`
					: `${doctorData.firstName} ${doctorData.lastName}`;
			return name;
		}
		return ``;
	};
	render() {
		let { isOpenModal, closeBookingModal, dataTime } = this.props;
		let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
		let doctorName = this.buildDoctorName(dataTime.doctorData);
		console.log('Albert check dataTime:', dataTime);
		return (
			<div>
				<Modal isOpen={isOpenModal} size="lg" centered className={'booking-modal-container'}>
					<div className="booking-modal-content">
						<div className="booking-modal-header">
							<span className="left">
								<FormattedMessage id="patient.booking-modal.title" />
							</span>
							<i class="fa-solid fa-xmark right" onClick={closeBookingModal}></i>
						</div>
						<div className="booking-modal-body">
							<div className="doctor-infor">
								<ProfileDoctor
									dataTime={dataTime}
									isShowDescriptionDoctor={false}
									doctorId={doctorId}
								/>
							</div>
							<div className="row">
								<div className="col-6 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.fullName" />
									</label>
									<input
										className="form-control"
										value={this.state.fullName}
										onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
									/>
								</div>
								<div className="col-6 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.phonenumber" />
									</label>
									<input
										className="form-control"
										value={this.state.phoneNumber}
										onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
									/>
								</div>
								<div className="col-6 form-group">
									<label>Email</label>
									<input
										className="form-control"
										value={this.state.email}
										onChange={(event) => this.handleOnChangeInput(event, 'email')}
									/>
								</div>
								<div className="col-6 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.address" />
									</label>
									<input
										className="form-control"
										value={this.state.address}
										onChange={(event) => this.handleOnChangeInput(event, 'address')}
									/>
								</div>
								<div className="col-12 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.reason" />
									</label>
									<input
										className="form-control"
										value={this.state.reason}
										onChange={(event) => this.handleOnChangeInput(event, 'reason')}
									/>
								</div>
								<div className="col-6 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.birthday" />
									</label>
									<DatePicker
										onChange={this.handleOnChangeDatePicker}
										value={this.state.birthday}
										className="form-control"
									/>
								</div>
								<div className="col-6 form-group">
									<label>
										<FormattedMessage id="patient.booking-modal.gender" />
									</label>
									<Select
										value={this.state.selectedGender}
										onChange={this.handleSelectedChange}
										options={this.state.genders}
										placeholder={<FormattedMessage id="patient.booking-modal.select-gender" />}
									/>
								</div>
							</div>
						</div>
						<div className="booking-modal-footer">
							<button className="btn-confirm" onClick={() => this.handleConfirmBooking()}>
								<FormattedMessage id="patient.booking-modal.confirm" />
							</button>
							<button className="btn-cancel" onClick={closeBookingModal}>
								<FormattedMessage id="patient.booking-modal.cancel" />
							</button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genders: state.admin.genders.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenders: () => dispatch(actions.fetchGenderStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
