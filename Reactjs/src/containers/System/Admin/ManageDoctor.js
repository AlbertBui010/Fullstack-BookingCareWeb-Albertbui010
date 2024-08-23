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
			}
			if (type === 'PRICE') {
				inputData.map((item, index) => {
					let obj = {};
					let labelVi = item.valueVi;
					let labelEn = `${item.valueEn} USD`;

					obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
					obj.value = item.keyMap;
					result.push(obj);
				});
			}
			if (type === 'PAYMENT' || type === 'PROVINCE') {
				inputData.map((item, index) => {
					let obj = {};
					let labelVi = item.valueVi;
					let labelEn = item.valueEn;

					obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
					obj.value = item.keyMap;
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
			let { resPrice = {}, resPayment = {}, resProvince = {} } = this.props.allRequiredDoctorInforFromRedux;

			let dataSelectPrice = this.buildDataInputSelect(resPrice.data, 'PRICE');
			let dataSelectPayment = this.buildDataInputSelect(resPayment.data, 'PAYMENT');
			let dataSelectProvince = this.buildDataInputSelect(resProvince.data, 'PROVINCE');

			this.setState({
				doctorsList: dataSelect,
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
			});
		}

		if (prevProps.allRequiredDoctorInforFromRedux !== this.props.allRequiredDoctorInforFromRedux) {
			let { resPrice = {}, resPayment = {}, resProvince = {} } = this.props.allRequiredDoctorInforFromRedux;

			let dataSelectPrice = this.buildDataInputSelect(resPrice.data, 'PRICE');
			let dataSelectPayment = this.buildDataInputSelect(resPayment.data, 'PAYMENT');
			let dataSelectProvince = this.buildDataInputSelect(resProvince.data, 'PROVINCE');
			this.setState({
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
			});
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

			selectedPrice: this.state.selectedPrice.value,
			selectedPayment: this.state.selectedPayment.value,
			selectedProvince: this.state.selectedProvince.value,
			nameClinic: this.state.nameClinic,
			addressClinic: this.state.addressClinic,
			note: this.state.note,
		});
	};

	handleSelectedChange = async (selectedOption) => {
		this.setState({ selectedOption });
		let { listPayment, listPrice, listProvince } = this.state;

		let res = await getDetailInforDoctor(selectedOption.value);
		let resData = res.data;
		if (resData && resData.errCode === 0 && resData.data && resData.data.Markdown) {
			let markdown = resData.data.Markdown;
			let addressClinic = '',
				nameClinic = '',
				note = '',
				paymentId = '',
				priceId = '',
				provinceId = '',
				selectedPayment = '',
				selectedPrice = '',
				selectedProvince = '';

			if (resData.data.Doctor_Infor) {
				let data = resData.data.Doctor_Infor;
				addressClinic = data.addressClinic;
				nameClinic = data.nameClinic;
				note = data.note;

				paymentId = data.paymentId;
				priceId = data.priceId;
				provinceId = data.provinceId;

				selectedPayment = listPayment.find((item) => {
					return item && item.value === paymentId;
				});
				selectedPrice = listPrice.find((item) => {
					return item && item.value === priceId;
				});
				selectedProvince = listProvince.find((item) => {
					return item && item.value === provinceId;
				});
			}
			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true,
				addressClinic: addressClinic,
				nameClinic: nameClinic,
				note: note,
				selectedPayment: selectedPayment,
				selectedPrice: selectedPrice,
				selectedProvince: selectedProvince,
			});
		} else {
			this.setState({
				contentHTML: '',
				contentMarkdown: '',
				description: '',
				hasOldData: false,
				addressClinic: '',
				nameClinic: '',
				note: '',
				selectedPayment: '',
				selectedPrice: '',
				selectedProvince: '',
			});
		}
	};

	handleSelectedChangeDoctorInfor = async (selectedOption, name) => {
		let stateName = name.name;
		let stateCopy = { ...this.state };
		stateCopy[stateName] = selectedOption;
		this.setState({
			...stateCopy,
		});
		console.log('Albert check selected onchange: ', selectedOption, name);
	};

	handleOnChangeText = (event, id) => {
		let stateCopy = { ...this.state };
		stateCopy[id] = event.target.value;

		this.setState({
			...stateCopy,
		});
	};

	render() {
		console.log(this.state);
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
							onChange={(event) => this.handleOnChangeText(event, 'description')}
							value={this.state.description}
						></textarea>
					</div>
				</div>
				<div className="more-infor-extra row">
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.price" />
						</label>
						<Select
							value={this.state.selectedPrice}
							onChange={this.handleSelectedChangeDoctorInfor}
							options={this.state.listPrice}
							placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
							name="selectedPrice"
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.payment-method" />{' '}
						</label>
						<Select
							value={this.state.selectedPayment}
							onChange={this.handleSelectedChangeDoctorInfor}
							options={this.state.listPayment}
							placeholder={<FormattedMessage id="admin.manage-doctor.payment-method" />}
							name="selectedPayment"
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.province" />
						</label>
						<Select
							value={this.state.selectedProvince}
							onChange={this.handleSelectedChangeDoctorInfor}
							options={this.state.listProvince}
							placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
							name="selectedProvince"
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.nameClinic" />
						</label>
						<input
							className="form-control"
							value={this.state.nameClinic}
							onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.addressClinic" />
						</label>
						<input
							className="form-control"
							value={this.state.addressClinic}
							onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
						/>
					</div>
					<div className="col-4 form-group">
						<label>
							<FormattedMessage id="admin.manage-doctor.note" />
						</label>
						<input
							className="form-control"
							value={this.state.note}
							onChange={(event) => this.handleOnChangeText(event, 'note')}
						/>
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
