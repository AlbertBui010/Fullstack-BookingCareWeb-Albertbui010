import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Save to markdown table
			contentMarkdown: '',
			contentHTML: '',
			selectedOption: '',
			description: '',
			doctorsList: [],
			hasOldData: false,

			// Save to doctor_infor table
			listPrice: [],
			listPayment: [],
			listProvince: [],
			selectedPrice: '',
			selectedPayment: '',
			selectedProvince: '',
			nameClinic: '',
			addressClinic: '',
			note: '',
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
		this.props.getAllRequiredDoctorInfor();
	}

	buildDataInputSelect = (inputData, type) => {
		let result = [];
		let { language } = this.props;

		if (inputData && inputData.length > 0) {
			if (type === 'USERS') {
				inputData.map((item, index) => {
					let obj = {};
					let labelVi = `${item.lastName} ${item.firstName}`;
					let labelEn = `${item.firstName} ${item.lastName}`;

					obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
					obj.value = item.id;
					result.push(obj);
				});
			} else {
				inputData.map((item, index) => {
					let obj = {};
					let labelVi = item.valueVi;
					let labelEn = item.valueEn;

					obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
					obj.value = item.id;
					result.push(obj);
				});
			}
		}
		return result;
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctorsFromRedux !== this.props.allDoctorsFromRedux) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux, 'USERS');
			this.setState({
				doctorsList: dataSelect,
			});
		}

		if (prevProps.language !== this.props.language) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux, 'USERS');
			this.setState({
				doctorsList: dataSelect,
			});
		}

		if (prevProps.allRequiredDoctorInforFromRedux !== this.props.allRequiredDoctorInforFromRedux) {
			let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInforFromRedux;

			let dataSelectPrice = this.buildDataInputSelect(resPrice.data);
			let dataSelectPayment = this.buildDataInputSelect(resPayment.data);
			let dataSelectProvince = this.buildDataInputSelect(resProvince.data);
			console.log('Check 3 after: ', dataSelectPrice, dataSelectPayment, dataSelectProvince);

			this.setState({
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
			});
			console.log('Albert check state: ', this.state);
		}
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html,
		});
	};

	handleSaveContentMarkdown = () => {
		let { hasOldData } = this.state;

		this.props.saveDetailInforDoctor({
			contentMarkdown: this.state.contentMarkdown,
			contentHTML: this.state.contentHTML,
			description: this.state.description,
			doctorId: this.state.selectedOption.value,
			action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
		});
	};

	handleSelectedChange = async (selectedOption) => {
		this.setState({ selectedOption });
		let res = await getDetailInforDoctor(selectedOption.value);
		let resData = res.data;
		if (resData && resData.errCode === 0 && resData.data && resData.data.Markdown) {
			let markdown = resData.data.Markdown;
			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true,
			});
		} else {
			this.setState({
				contentHTML: '',
				contentMarkdown: '',
				description: '',
				hasOldData: false,
			});
		}
	};

	handleOnChangeDes = (event) => {
		this.setState({
			description: event.target.value,
		});
	};

	render() {
		let { hasOldData } = this.state;
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">
					<FormattedMessage id="admin.manage-doctor.title" />
				</div>
				<div className="more-infor">
					<div className="content-left form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.select-doctor" />
						</label>
						<Select
							value={this.state.selectedOption}
							onChange={this.handleSelectedChange}
							options={this.state.doctorsList}
							placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
						/>
					</div>
					<div className="content-right">
						<label>
							<FormattedMessage id="admin.manage-doctor.introduction" />
						</label>
						<textarea
							class="form-control"
							onChange={(event) => this.handleOnChangeDes(event)}
							value={this.state.description}
						></textarea>
					</div>
				</div>
				<div className="more-infor-extra row">
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.select-price" />
						</label>
						<Select
							// value={this.state.selectedOption}
							// onChange={this.handleSelectedChange}
							options={this.state.listPrice}
							placeholder={<FormattedMessage id="admin.manage-doctor.select-price" />}
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.select-payment-method" />{' '}
						</label>
						<Select
							// value={this.state.selectedOption}
							// onChange={this.handleSelectedChange}
							options={this.state.listPayment}
							placeholder={<FormattedMessage id="admin.manage-doctor.select-payment-method" />}
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.select-province" />
						</label>
						<Select
							// value={this.state.selectedOption}
							// onChange={this.handleSelectedChange}
							options={this.state.listProvince}
							placeholder={<FormattedMessage id="admin.manage-doctor.select-province" />}
						/>
					</div>
					<div className="col-4 form-group">
						<label>Tên phòng khám</label>
						<input className="form-control" />
					</div>
					<div className="col-4 form-group">
						<label>Địa chỉ phòng khám</label>
						<input className="form-control" />
					</div>
					<div className="col-4 form-group">
						<label>Ghi chú</label>
						<input className="form-control" />
					</div>
				</div>
				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: '500px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.contentMarkdown}
					/>
				</div>

				<button
					className={hasOldData === true ? 'btn-content btn btn-warning' : 'btn-content btn btn-primary'}
					onClick={() => this.handleSaveContentMarkdown()}
				>
					{hasOldData === true ? (
						<span>
							<FormattedMessage id="admin.manage-doctor.update-information" />
						</span>
					) : (
						<span>
							<FormattedMessage id="admin.manage-doctor.save-information" />{' '}
						</span>
					)}
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		allDoctorsFromRedux: state.admin.allDoctors,
		allRequiredDoctorInforFromRedux: state.admin.allRequiredDoctorInfor,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
		saveDetailInforDoctor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
