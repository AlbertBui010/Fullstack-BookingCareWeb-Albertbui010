import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allDays: [],
			allAvailableTime: [],
			isOpenBookingModal: false,
			dataScheduleTimeModal: {},
		};
	}

	async componentDidMount() {
		let { language } = this.props;
		let allDays = await this.getArrDays(language);

		if (allDays && allDays.length > 0) {
			let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
			console.log('Check res when did mount: ', res);
			this.setState({
				allDays: allDays,
				allAvailableTime: res.data.data ? res.data.data : [],
			});
		}
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	getArrDays = async (language) => {
		let allDays = [];
		for (let i = 0; i < 7; i++) {
			let obj = {};
			if (language === LANGUAGES.VI) {
				if (i === 0) {
					let ddMM = moment(new Date()).format('DD/MM');
					let today = `Hôm nay - ${ddMM}`;
					obj.label = today;
				} else {
					let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
					obj.label = this.capitalizeFirstLetter(labelVi);
				}
			} else {
				if (i === 0) {
					let ddMM = moment(new Date()).format('DD/MM');
					let today = `Today - ${ddMM}`;
					obj.label = today;
				} else {
					obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd- DD/MM');
				}
			}
			obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
			allDays.push(obj);
		}

		return allDays;
	};

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
			let allDays = await this.getArrDays(this.props.language);
			this.setState({
				allDays: allDays,
			});
		}
	}

	handleOnChangeSelect = async (event) => {
		if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
			let doctorId = this.props.doctorIdFromParent;
			let date = event.target.value;
			let res = await getScheduleDoctorByDate(doctorId, date);

			if (res && res.data.errCode === 0 && res.data.data && res.data.data.length > 0) {
				this.setState({
					allAvailableTime: res.data.data,
				});
			} else {
				this.setState({
					allAvailableTime: [],
				});
			}
		}
	};

	handleBtnAvailableTime = (time) => {
		this.setState({
			isOpenBookingModal: true,
			dataScheduleTimeModal: time,
		});
	};
	closeBookingModal = () => {
		this.setState({
			isOpenBookingModal: false,
		});
	};

	render() {
		let { allDays, allAvailableTime, isOpenBookingModal, dataScheduleTimeModal } = this.state;
		let { language } = this.props;
		return (
			<>
				<div className="doctor-schedule-container">
					<div className="all-schedule">
						<select onChange={(event) => this.handleOnChangeSelect(event)}>
							{allDays &&
								allDays.length > 0 &&
								allDays.map((item, index) => {
									return (
										<option key={index} value={item.value}>
											{item.label}
										</option>
									);
								})}
						</select>
					</div>
					<div className="all-available-time">
						<div className="text-calendar">
							<i className="fas fa-calendar-alt"></i>
							<span>
								<FormattedMessage id="patient.detail-doctor.schedule" />
							</span>
						</div>
						<div className="time-content">
							{allAvailableTime && allAvailableTime.length > 0 ? (
								<>
									<div className="time-content-btns">
										{allAvailableTime.map((item, index) => {
											let timeDisplay =
												language === LANGUAGES.VI
													? item.timeTypeData.valueVi
													: item.timeTypeData.valueEn;
											return (
												<button
													key={index}
													onClick={() => this.handleBtnAvailableTime(item)}
													className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
												>
													{timeDisplay}
												</button>
											);
										})}
									</div>
									<div className="book-free">
										<span>
											<FormattedMessage id="patient.detail-doctor.choose" />{' '}
											<i className="far fa-hand-point-up"></i>{' '}
											<FormattedMessage id="patient.detail-doctor.book-free" />
										</span>
									</div>
								</>
							) : (
								<div className="no-schedule">
									<FormattedMessage id="patient.detail-doctor.no-schedule" />
								</div>
							)}
						</div>
					</div>
				</div>
				<BookingModal
					isOpenModal={isOpenBookingModal}
					closeBookingModal={this.closeBookingModal}
					dataTime={dataScheduleTimeModal}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
