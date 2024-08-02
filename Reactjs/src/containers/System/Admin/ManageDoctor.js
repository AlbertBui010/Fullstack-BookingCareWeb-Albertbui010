import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentMarkdown: '',
			contentHTML: '',
			selectedOption: '',
			description: '',
			doctorsList: [],
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
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
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html,
		});
	};

	handleSaveContentMarkdown = () => {
		this.props.saveDetailInforDoctor({
			contentMarkdown: this.state.contentMarkdown,
			contentHTML: this.state.contentHTML,
			description: this.state.description,
			doctorId: this.state.selectedOption.value,
		});
	};

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	};

	handleOnChangeDes = (event) => {
		this.setState({
			description: event.target.value,
		});
	};
	render() {
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">Update doctor information</div>
				<div className="more-infor">
					<div className="content-left form-group">
						<label>Chọn bác sĩ</label>
						<Select
							value={this.state.selectedOption}
							onChange={this.handleChange}
							options={this.state.doctorsList}
						/>
					</div>
					<div className="content-right">
						<label>Thông tin giới thiệu:</label>
						<textarea
							class="form-control"
							rows="4"
							onChange={(event) => this.handleOnChangeDes(event)}
							value={this.state.description}
						>
							hello world
						</textarea>
					</div>
				</div>
				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: '500px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
					/>
				</div>

				<button className="btn-save-content btn btn-primary" onClick={() => this.handleSaveContentMarkdown()}>
					Lưu thông tin
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		allDoctorsFromRedux: state.admin.allDoctors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		saveDetailInforDoctor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
