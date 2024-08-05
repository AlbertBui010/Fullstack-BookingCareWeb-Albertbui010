import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment, { lang } from 'moment';

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

		if (prevProps.allScheduleTimeFromRedux !== this.props.allScheduleTimeFromRedux) {
			this.setState({
				timeRange: this.props.allScheduleTimeFromRedux,
			});
		}
	}

	handleSelectedChange = async (selectedOption) => {
		this.setState({ selectedDoctor: selectedOption });
	};

	handleOnChangeDatePicker = (date) => {
		this.setState({ currentDate: date[0] });
	};

	render() {
		console.log('Albert check time range:', this.state);
		let { timeRange } = this.state;
		let { language } = this.props;
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
										<button className="btn btn-schedule" key={index}>
											{language && language === LANGUAGES.VI ? item.valueVi : item.valueEn}
										</button>
									);
								})}
						</div>
						<button className="btn-manage-sch btn btn-primary">
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
		allScheduleTimeFromRedux: state.admin.allScheduleTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
