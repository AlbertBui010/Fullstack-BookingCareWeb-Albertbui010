import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { dateFormat, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorsList: [],
			selectedDoctor: {},
			currentDate: '',
			timeRange: [],
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
		this.props.fetchAllScheduleTime();
	}

	buildDataInputSelect = (inputData) => {
		let result = [];
		let { language } = this.props;

		if (inputData && inputData.length > 0) {
			inputData.map((item, index) => {
				let obj = {};
				let labelVi = `${item.lastName} ${item.firstName}`;
				let labelEn = `${item.firstName} ${item.lastName} `;

				obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
				obj.value = item.id;
				result.push(obj);
			});
		}
		return result;
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctorsFromRedux !== this.props.allDoctorsFromRedux) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux);
			this.setState({
				doctorsList: dataSelect,
			});
		}

		if (prevProps.language !== this.props.language) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux);
			this.setState({
				doctorsList: dataSelect,
			});
		}

		if (prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux) {
			let data = this.props.allScheduleTimeRedux;
			if (data && data.length > 0) {
				data = data.map((item) => ({ ...item, isSelected: false }));
			}
			this.setState({
				timeRange: data,
			});
		}
	}

	handleSelectedChange = async (selectedOption) => {
		this.setState({ selectedDoctor: selectedOption });
	};

	handleOnChangeDatePicker = (date) => {
		// Format date from timestamp into DateTime(dd/mm/yyyy)
		this.setState({ currentDate: date[0] });
	};

	handleClickBtnTime = (time) => {
		let { timeRange } = this.state;
		if (timeRange && timeRange.length > 0) {
			time.isSelected ? (time.isSelected = false) : (time.isSelected = true);
		}
		this.setState({
			timeRange: timeRange,
		});
	};

	handleSaveSchedule = async () => {
		let { timeRange, selectedDoctor, currentDate } = this.state;
		let result = [];
		if (selectedDoctor && _.isEmpty(selectedDoctor)) {
			toast.error('Invalid selected doctor');
			return;
		}
		if (!currentDate) {
			toast.error('Invalid date');
			return;
		}

		// let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
		let formatedDatez = new Date(currentDate).getTime();
		console.log('check: ', formatedDatez);

		if (timeRange && timeRange.length > 0) {
			let selectedTimeSlots = timeRange.filter((item) => item.isSelected === true);
			if (selectedTimeSlots && selectedTimeSlots.length > 0) {
				selectedTimeSlots.map((timeSlot) => {
					result.push(
						new Object({
							doctorId: selectedDoctor.value,
							date: formatedDatez,
							timeType: timeSlot.keyMap,
						}),
					);
				});
			} else {
				toast.error('Invalid selected time slot');
				return;
			}
		}

		let res = await saveBulkScheduleDoctor({
			arrSchedule: result,
			doctorId: selectedDoctor.value,
			dateFormatted: formatedDatez,
		});
	};

	render() {
		let { timeRange } = this.state;
		let { language } = this.props;
		console.log(this.state);
		return (
			<div className="manage-schedule-container">
				<div className="msch-title">
					<FormattedMessage id="manage-schedule.title" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-6 form-group">
							<label>
								<FormattedMessage id="manage-schedule.choose-doctor" />
							</label>
							<Select
								value={this.state.selectedDoctor}
								onChange={this.handleSelectedChange}
								options={this.state.doctorsList}
							/>
						</div>
						<div className="col-6 form-group">
							<label>
								<FormattedMessage id="manage-schedule.select-date" />
							</label>
							<DatePicker
								className="form-control"
								onChange={this.handleOnChangeDatePicker}
								value={this.state.currentDate}
								minDate={new Date()}
							/>
						</div>
						<div className="col-12 pick-hours-container">
							{timeRange &&
								timeRange.length > 0 &&
								timeRange.map((item, index) => {
									return (
										<button
											className={
												item.isSelected === true
													? 'btn btn-schedule active'
													: 'btn btn-schedule'
											}
											key={index}
											onClick={() => this.handleClickBtnTime(item)}
										>
											{language && language === LANGUAGES.VI ? item.valueVi : item.valueEn}
										</button>
									);
								})}
						</div>
						<button className="btn-manage-sch btn btn-primary" onClick={() => this.handleSaveSchedule()}>
							<FormattedMessage id="manage-schedule.btn-save" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
		allDoctorsFromRedux: state.admin.allDoctors,
		allScheduleTimeRedux: state.admin.allScheduleTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
